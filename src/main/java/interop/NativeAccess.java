package interop;

public class NativeAccess {

    private static boolean initialized = false;

    public static AsyncHandle createHandle(Runnable onEventHandled) {
        if (!initialized) {
            System.load("/Users/laurynasl/graal-jvm-interop-talk/build/Release/native_access.dylib");
            initNative();
        }
        return new AsyncHandle(createAsyncHandle(onEventHandled));
    }

    private static native int initNative();

    private static native long createAsyncHandle(Runnable onEventHandled);

    private static native void closeAsyncHandle(long asyncHandle);

    private static native void sendAsyncHandle(long asyncHandle);

    public final static class AsyncHandle {
        private final long nativeHandle;

        private AsyncHandle(long nativeHandle) {
            this.nativeHandle = nativeHandle;
        }

        public void send() {
            sendAsyncHandle(nativeHandle);
        }

        public void close() {
            closeAsyncHandle(nativeHandle);
        }
    }
}
