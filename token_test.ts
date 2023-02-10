// Copyright 2023 the libewd authors. All rights reserved. MIT license.

import Token from "./token.ts";
import { assertEquals } from "./deps.ts";

Deno.test("toKeyURI", () => {
  const token = new Token("024816");
  assertEquals(
    token.toKeyURI("ExampleSecretKey", {
      issuer: "Example",
      accountName: "totp@example.com",
    }),
    "otpauth://totp/Example:totp@example.com?secret=ExampleSecretKey&algorithm=SHA1&issuer=Example&digits=6",
  );
});
