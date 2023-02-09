<a name="_dotp_top"></a>

[![License][license-shield]][license-url] ![Version][version-shield]
![Language][language-shield]

<br />
<div align="center">
  <a href="https://github.com/libewd/dotp">
    <img src="images/logo.png" alt="DOTP" height="128">
  </a>
  <h3 align="center">Deno One-Time Password</h3>
  <p align="center">

An implementation of HOTP ([RFC 4226][hotp-rfc4226-url]) and TOTP
([RFC 6238][totp-rfc6238-url]) in Deno. And a little bit extra.

</p>
</div>

## About

The purpose of **dotp** is to provide a stable and well-tested OTP library for
use with Deno. The implementation aims to follow the relevant RFC documents to
the letter, and to provide a developer friendly API for the features listed
below.

- Create cryptographically random and secure OTP secrets
- Create hash and time based OTP tokens.

<p align="right" style="font-size: 0.89em"><a href="#_dotp_top">back to top</a></p>

## Usage

### Generate Hash-based OTP

```ts
import {
  createHashToken,
  createMovingFactorFromNumber,
  createRandomSecretKey,
} from "https://deno.land/x/dotp/mod.ts";

const secretKey = createRandomSecretKey();
const token = createHashToken(secretKey, createMovingFactorFromNumber(1));
```

<p align="right" style="font-size: 0.89em"><a href="#_dotp_top">back to top</a></p>

## Documentation

For a quick idea on how the module works, see the [Usage][usage-url] section
above.

### API

Please visit our [Documentation][documentation-url] for details on the module
API.

### Examples

Go to our [examples][examples-url] directory to learn even more.

<p align="right" style="font-size: 0.89em"><a href="#_dotp_top">back to top</a></p>

## Things to Know

### HMAC-Based One-Time Password

The basis for the HMAC-Based One-Time Password ("HOTP") algorithm is the key `K`
and the moving factor `C`.

We compute a HMAC (hash-based message authentication code, see
[RFC 2104][rfc2104-url]) value from a secret key `K` and and a moving factor `C`
using SHA-1 as the hash function. This gives us 20 bytes of data.

Then, we dynamically truncate the value. That is to say, we extract a number
from the HMAC value, and then we use that value to truncate the HMAC value
itself, which gives us the HOTP value.

And to put it simpler-ish. We use a large randomized number, we take a part of
that number, a smaller number, and use that as the basis for slicing the big
number into another number. Sometimes that final number has fewer digits than
desired, so we pad it with zeros.

### Time-Based One-Time Password

In order to compute a Time-Based One-Time-Password ("TOTP") we need to use HOTP
and an agreed upon time period (technically referred to as the time step), in
seconds, which is used to compute our moving factor `C` based on the number of
times our time step has happened since the beginning of the UNIX epoch.

This is how TOTP based tokens change over time, in many cases with a time step
of 30 seconds.

Want to see for your self? If you have an authenticator application, you can see
the token expire and a new token be generated. See how once a token expires, you
are either halfway through the current minute or just starting the next.

<p align="right" style="font-size: 0.89em"><a href="#_dotp_top">back to top</a></p>

## Contributing

We do not accept contributions. Please see our ideas :bulb: in the
[Discussions][discussions-url] to discuss any potential ideas or improvements
you may have for the project.

<p align="right" style="font-size: 0.89em"><a href="#_dotp_top">back to top</a></p>

## License

Distributed under the MIT License. See [LICENSE.txt][license-url] for more
information.

<p align="right" style="font-size: 0.89em"><a href="#_dotp_top">back to top</a></p>

## Contact

Christoffer Hallas
<br> hallas@libewd.com
<br> [@badgerhallas](https://twitter.com/badgerhallas)

<p align="right" style="font-size: 0.89em"><a href="#_dotp_top">back to top</a></p>

## References

- [RFC 4226][hotp-rfc4226-url]
- [RFC 6238][totp-rfc6238-url]
- [RFC 2104][rfc2104-url]
- [RFC 3548][rfc3548-url]
- [Key URI Format][key-uri-format-url]

<p align="right" style="font-size: 0.89em"><a href="#_dotp_top">back to top</a></p>

[usage-url]: #usage
[examples-url]: examples/
[documentation-url]: https://deno.land/x/dotp@v0.0.1/mod.ts
[discussions-url]: https://github.com/libewd/dotp/discussions/categories/ideas
[rfc2104-url]: https://www.rfc-editor.org/rfc/rfc2104
[rfc3548-url]: https://www.rfc-editor.org/rfc/rfc3548
[hotp-rfc4226-url]: https://www.rfc-editor.org/rfc/rfc4226.txt
[totp-rfc6238-url]: https://www.rfc-editor.org/rfc/rfc6238.txt
[key-uri-format-url]: https://github.com/google/google-authenticator/wiki/Key-Uri-Format
[license-shield]: https://img.shields.io/github/license/libewd/dotp?style=for-the-badge
[license-url]: https://github.com/libewd/dotp/blob/main/LICENSE.txt
[version-shield]: https://img.shields.io/github/v/tag/libewd/dotp?style=for-the-badge
[language-shield]: https://img.shields.io/github/languages/top/libewd/dotp?style=for-the-badge
