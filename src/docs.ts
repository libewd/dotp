// Copyright 2023 the libewd authors. All rights reserved. MIT license.

/**
 * docs.ts
 */

/**
 * The basis for the HOTP algorithm is the key `K` and the moving factor `C`.
 *
 * We compute a HMAC (hash-based message authentication code, RFC2104) value
 * from `K` and `C` using SHA-1 as the hash function. This gives us 20 bytes of data.
 *
 * Then, we dynamically truncate the value. That is to say, we extract a number
 * from the HMAC value, and then we use that value to truncate the HMAC value itself,
 * which gives us the HOTP value.
 */
