package interop.core;

import java.util.concurrent.CompletableFuture;

public class Thunk<T, U> {
    public final Object jsFunction;
    public final T argument;
    public final Throwable error;
    public final CompletableFuture<U> callbackCompleted;

    public Thunk(Object jsFunction,
                 T argument,
                 Throwable error,
                 CompletableFuture<U> callbackCompleted) {
        this.jsFunction = jsFunction;
        this.argument = argument;
        this.error = error;
        this.callbackCompleted = callbackCompleted;
    }
}
