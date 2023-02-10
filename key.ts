// Copyright 2023 the libewd authors. All rights reserved. MIT license.

import { encodeBase32 } from "./deps.ts";
import { createRandomSecretKey, exportSecretKey } from "./secret_key.ts";

export default class Key {
  static fromUint8Array(value: Uint8Array) {
    return new Key(encodeBase32(value));
  }

  static async fromCryptoKey(cryptoKey: CryptoKey) {
    const secretKey = await exportSecretKey(cryptoKey);
    return Key.fromUint8Array(secretKey);
  }

  static async random() {
    const randomSecretKey = await createRandomSecretKey();
    return await Key.fromCryptoKey(randomSecretKey);
  }

  constructor(private key: string) {
  }

  toString(): string {
    return this.key;
  }
}
