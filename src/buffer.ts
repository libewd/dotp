// Copyright 2023 the libewd authors. All rights reserved. MIT license.

export class Buffer {
  static withSize(size: number) {
    return new Buffer(new ArrayBuffer(size));
  }

  static fromBigInt(value: bigint) {
    return this.withSize(8).writeBigUint64(value);
  }

  private dataView: DataView;
  private offset = 0;

  constructor(private buffer: ArrayBuffer) {
    this.dataView = new DataView(buffer);
  }

  get arrayBuffer() {
    return this.buffer;
  }

  writeBigUint64(value: bigint) {
    this.dataView.setBigUint64(0, value);
    this.offset += 64;
    return this;
  }
}
