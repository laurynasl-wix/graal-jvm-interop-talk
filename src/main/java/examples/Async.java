package examples;

import java.util.concurrent.CompletionStage;
import java.util.concurrent.ForkJoinPool;
import java.util.function.Function;

public class Async {
    public static void callMeBack(Function<Object[], CompletionStage<Object>> jsCallback) {
        ForkJoinPool.commonPool().execute(() -> {
            CompletionStage<Object> nodeResult = jsCallback.apply(new Object[]{"Hello from JVM!", null});
            nodeResult.handle((result, error) -> {
                if (error != null) {
                    System.err.println(error.getMessage());
                }
                System.out.println("JVM: " + result);
                return null;
            });
        });
    }
}
