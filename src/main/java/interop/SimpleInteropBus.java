package interop;

import interop.core.BoundJSCallback;
import interop.core.InteropBus;
import interop.core.Thunk;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.LinkedBlockingDeque;

public class SimpleInteropBus implements InteropBus {
    public final LinkedBlockingDeque<Thunk<?, ?>> pendingQueue = new LinkedBlockingDeque<>();

    public final static SimpleInteropBus global = new SimpleInteropBus();

    @Override
    public <T, U> BoundJSCallback<T, U> bindCallback(final Object callback) {
        return (argument, error) -> {
            CompletableFuture<U> callbackCompleted = new CompletableFuture<>();
            try {
                pendingQueue.put(new Thunk<>(callback, argument, error, callbackCompleted));
                return callbackCompleted;
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        };
    }
}

