{
  "targets": [
    {
      "target_name": "native_access",
      "type": "shared_library",
      "sources": [
        "src/native/interop_NativeAccess.cc"
      ],
      "include_dirs": [
        "$(JAVA_HOME)/include",
        "$(JAVA_HOME)/include/darwin"
      ],
      "xcode_settings": {
        "OTHER_LDFLAGS": [
          "-undefined dynamic_lookup"
        ],
      },
      "link_settings": {
        "libraries": [
          "-ljvm"
        ],
        "library_dirs": [
          "$(JAVA_HOME)/jre/lib/server"
        ]
      }
    }
  ]
}
