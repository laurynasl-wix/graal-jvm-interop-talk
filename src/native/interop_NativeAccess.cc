#include "./interop_NativeAccess.h"
#include <iostream>
#include <uv.h>

JavaVM* jvm = nullptr;
uv_loop_s* loop = nullptr;

jint Java_interop_NativeAccess_initNative(JNIEnv* evn, jclass clazz) {
  loop = uv_default_loop();
  jsize nVMs;
  JNI_GetCreatedJavaVMs(&jvm, 1, &nVMs);
  return 0;
}

JNIEnv* getJniEnv() {
    JNIEnv * env;
    int getEnvStat = jvm->GetEnv((void **)&env, JNI_VERSION_1_6);
    if (getEnvStat != JNI_OK) {
        std::cerr << "GetEnv returned " << getEnvStat << std::endl;
    }
    return env;
}

void GraalHandleClosed(uv_handle_t* handle) {
    jobject runnable = (jobject) handle->data;    
    env->DeleteGlobalRef(runnable);
    free(handle);
}

void GraalAsyncHandleTaskRunner(uv_async_t* handle) {
    JNIEnv* env = getJniEnv();
    jobject runnable = (jobject) handle->data;
    jclass runnable_class = env->FindClass("java/lang/Runnable");
    jmethodID runMethodID = env->GetMethodID(runnable_class, "run", "()V");
    env->CallVoidMethod(runnable, runMethodID);
}

void Java_interop_NativeAccess_closeAsyncHandle(JNIEnv* env, jclass nativeAccess, jlong handlePtr) {
    uv_async_t* handle = reinterpret_cast<uv_async_t*> (handlePtr);
    uv_close(reinterpret_cast<uv_handle_t*> (handle), &GraalHandleClosed);
}

void Java_interop_NativeAccess_sendAsyncHandle(JNIEnv* env, jclass nativeAccess, jlong handle) {
    uv_async_send(reinterpret_cast<uv_async_t*> (handle));
}

jlong Java_interop_NativeAccess_createAsyncHandle(JNIEnv* env, jclass nativeAccess, jobject runnable) {
    uv_async_t* handle = (uv_async_t*) malloc(sizeof (uv_async_t));
    handle->data = env->NewGlobalRef(runnable);    
    uv_async_init(loop, handle, &GraalAsyncHandleTaskRunner);
    return (jlong) handle;
}

