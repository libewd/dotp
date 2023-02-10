// Copyright 2023 the libewd authors. All rights reserved. MIT license.

import Key from "./key.ts";
import { assertEquals, assertInstanceOf } from "./deps.ts";
import { createRandomSecretKey } from "./secret_key.ts";

Deno.test("fromUint8Array", () => {
  const arrayBuffer = crypto.getRandomValues(new Uint8Array(20));
  const key = Key.fromUint8Array(arrayBuffer);
  console.log(key.toString());

  assertInstanceOf(key, Key);
});

Deno.test("fromCryptoKey", async () => {
  const randomSecretKey = await createRandomSecretKey();
  const key = await Key.fromCryptoKey(randomSecretKey);
  assertInstanceOf(key, Key);
});

Deno.test("random", async () => {
  const key = await Key.random();
  assertInstanceOf(key, Key);
});

Deno.test("toString", async () => {
  const key = await Key.random();
  assertEquals(key.toString().length, 104);
});
