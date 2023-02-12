// Copyright 2023 the libewd authors. All rights reserved. MIT license.

import { ui8ToBase32 } from "./deps.ts";
import {
  createCryptoKey,
  createRandomCryptoKey,
  exportCryptoKey,
} from "./crypto.ts";
import { encode } from "./encoding.ts";

export default class Key {
  static fromCryptoKey(cryptoKey: CryptoKey): Key {
    return new Key(cryptoKey);
  }

  static fromString(key: string): Promise<Key> {
    return Key.fromUint8Array(encode(key));
  }

  static async fromUint8Array(keyBuffer: Uint8Array): Promise<Key> {
    const cryptoKey = await createCryptoKey(keyBuffer);
    return new Key(cryptoKey, keyBuffer);
  }

  static async usingRandomCryptoKey(): Promise<Key> {
    const randomSecretKey = await createRandomCryptoKey();
    return Key.fromCryptoKey(randomSecretKey);
  }

  constructor(
    public cryptoKey: CryptoKey,
    private keyBuffer?: Uint8Array,
  ) {
  }

  async toString(): Promise<string> {
    let keyBuffer = this.keyBuffer;
    if (!keyBuffer) keyBuffer = await exportCryptoKey(this.cryptoKey);
    this.keyBuffer = keyBuffer;
    return ui8ToBase32(keyBuffer);
  }
}
