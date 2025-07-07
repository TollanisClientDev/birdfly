# tell CMake where to find react‑native‑worklets‑core
set(REACT_NATIVE_WORKLETS_CORE_DIR "${CMAKE_SOURCE_DIR}/../../../../node_modules/react-native-worklets-core/android")

# add it as a subdirectory
add_subdirectory(
  "${REACT_NATIVE_WORKLETS_CORE_DIR}"
  worklets-core-build
)

# now the target RNWorkletsCore will be available
