package interop;

import com.oracle.truffle.api.CompilerDirectives.TruffleBoundary;
import org.graalvm.polyglot.Value;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.function.Function;


class Invocation {
    final CompletableFuture<Object> resultPromise;
    final Object[] args;

    Invocation(CompletableFuture<Object> promise, Object[] args) {
        this.resultPromise = promise;
        this.args = args;
    }
}

public class NodeBoundAsyncCallback implements Runnable, Function<Object[], CompletionStage<Object>> {
    public static NodeBoundAsyncCallback bindCallback(Value cb) {
        NodeBoundAsyncCallback boundAsyncCallback = new NodeBoundAsyncCallback(cb);
        NativeAccess.AsyncHandle handle = NativeAccess.createHandle(boundAsyncCallback);
        boundAsyncCallback.setHandle(handle);
        return boundAsyncCallback;
    }
    
    private final BlockingQueue<Invocation> invocations;
    private final Value function;
    private NativeAccess.AsyncHandle handle;

    NodeBoundAsyncCallback(Value function) {
        this.function = function;
        invocations = new LinkedBlockingDeque<>();
    }

    public void unbind() {
        handle.close();
    }

    @TruffleBoundary
    public void run() {
        Invocation invocation;
        while ((invocation = invocations.poll()) != null) {
            CompletableFuture<Object> resultPromise = invocation.resultPromise;

            try {
                Object[] args = invocation.args;
                function.execute(args);
            } catch (Exception e) {
                resultPromise.completeExceptionally(e);
                e.printStackTrace();
            }
        }
    }

    @Override
    public CompletionStage<Object> apply(Object[] args) {
        CompletableFuture<Object> resultPromise = new CompletableFuture<>();
        try {
            invocations.put(new Invocation(resultPromise, args));
            handle.send();
        } catch (InterruptedException e) {
        }
        return resultPromise;
    }

    public void setHandle(NativeAccess.AsyncHandle handle) {
        this.handle = handle;
    }

    @Override
    public String toString() {
        return "NodeBoundAsyncCallback{" +
                "function=" + function +
                ", handle=" + handle +
                '}';
    }

}
