package examples;

import interop.core.BoundJSCallback;

import java.util.concurrent.CompletionStage;
import java.util.concurrent.ForkJoinPool;

public class Async {
    public static void callMeBack(BoundJSCallback<String, String> jsCallback) {
        ForkJoinPool.commonPool().execute(() -> {
            CompletionStage<String> nodeResult = jsCallback.apply("Hello from JVM!", null);
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
