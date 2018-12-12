package interop.core;

import java.util.concurrent.CompletionStage;
import java.util.function.BiFunction;

public interface BoundJSCallback<T, U>
        extends BiFunction<T, Throwable, CompletionStage<U>> {}
