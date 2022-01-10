#!/usr/bin/env bash

OUT_DIR="."
TS_OUT_DIR="."
PROTO_FILES_DIR="./protofiles"
PROTOC="$(npm bin)/grpc_tools_node_protoc"
PROTOC_GEN_TS_PATH="$(npm bin)/protoc-gen-ts"

$PROTOC \
  -I="./" \
  --plugin=protoc-gen-ts=$PROTOC_GEN_TS_PATH \
  --js_out="import_style=commonjs,binary:${OUT_DIR}" \
  --ts_out="$TS_OUT_DIR" \
  "$PROTO_FILES_DIR"/*.proto
