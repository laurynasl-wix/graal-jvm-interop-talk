package interop.core;

import java.util.concurrent.CompletableFuture;

public class Thunk {
    public final Object jsFunction;
    public final Object[] args;
    public final CompletableFuture<Object> callbackCompleted;

    public Thunk(Object jsFunction,
                 Object[] args,
                 CompletableFuture<Object> callbackCompleted) {
        this.jsFunction = jsFunction;
        this.args = args;
        this.callbackCompleted = callbackCompleted;
    }
}
