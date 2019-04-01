package examples;

import interop.core.BoundJSCallback;

import java.util.concurrent.CompletionStage;
import java.util.concurrent.ForkJoinPool;

public class Async {
    public static void callMeBack(BoundJSCallback jsCallback) {
        ForkJoinPool.commonPool().execute(() -> {
            CompletionStage<Object> nodeResult = jsCallback.apply(new Object[]{"Hello from JVM!"});
            nodeResult.handle((result, error) -> {
                if (error != null) {
                    System.err.println(error.getMessage());
                }
                System.out.println("JVM: " + result);
                System.exit(0);
                return null;
            });
        });
    }
}
