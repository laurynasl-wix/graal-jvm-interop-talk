package interop.core;

public interface InteropBus {
    <T, U> BoundJSCallback<T, U> bindCallback(Object callback);
}
