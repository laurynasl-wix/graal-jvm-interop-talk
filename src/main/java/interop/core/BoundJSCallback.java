package interop.core;

import java.util.concurrent.CompletionStage;
import java.util.function.BiFunction;
import java.util.function.Function;

public interface BoundJSCallback extends Function<Object[], CompletionStage<Object>> {
}
