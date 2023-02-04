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
([RFC 6238][totp-rfc6238-url]) in Deno.

</p>
</div>

_Under construction. Please do not use._

## About The Project

The purpose of **dotp** is to provide a stable and well-tested OTP library for
use with Deno. The implementation aims to follow the relevant RFC documents to
the letter, and to provide a developer friendly API for the features listed
below.

- Create cryptographically random and secure OTP secrets
- Create hash and time based OTP tokens.

<p align="right" style="font-size: 0.89em"><a href="#_dotp_top">back to top</a></p>

## Getting Started

You may use this project much like any other Deno module. Import the part of the
module that you need and you are good to go.

### Prerequisites

- Deno

### Running Tests

Use the command below in the root of the project to run the test suite.

`deno task test`

#### Generate Coverage Report

_`genhtml` is required to generate coverage LCOV coverage report in HTML. This
command is included in the `lcov` package in Ubuntu, install using
`sudo apt install lcov`._

To generate LCOV coverage profile, run the following command.

`deno task coverage`

Finally, to create a HTML coverage report, run this command after you've already
generated an up to date LCOV profile.

`deno task coverage:html`

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

## API

### [`class OTP(secretKey: CryptoKey, options?: Options)`][api-create-secret-key]

#### [`OTP.withSecretKeyString(value: string, options?: Options): OTP`][api-create-secret-key]

#### [`OTP.withRandomSecretKey(options?: Options): OTP`][api-create-secret-key]

#### [`keyAsString(): Promise<string>`][api-create-secret-key]

#### [`async hashToken(movingFactor: ArrayBuffer): Promise<Uint8Array>`][api-create-secret-key]

#### [`async createTimeToken(offset = 0): Promise<Uint8Array>`][api-create-secret-key]

#### [`async validateTimeToken(token: ArrayBuffer, skew = 2): Promise<boolean>`][api-create-secret-key]

#### [`async hashToken(movingFactor: ArrayBuffer): Promise<Uint8Array>`][api-create-secret-key]

### [`createMovingFactorFromNumber(value: number): ArrayBuffer`][api-create-secret-key]

### [`createMovingFactorFromBigInt(): Uint8Array`][api-create-secret-key]

### [`class OTPError(message?: string | undefined, options?: ErrorOptions | undefined): OTPError`][api-create-secret-key]

### [`class OTPSecretKeyError(message?: string | undefined, options?: ErrorOptions | undefined): OTPError`][api-create-secret-key]

### [`createDefaultOptions(timeStep: number): Options`][api-create-secret-key]

### [`createOptions(timeStep = 30): Options`][api-create-secret-key]

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

<p align="right" style="font-size: 0.89em"><a href="#_dotp_top">back to top</a></p>

## References

- [RFC 4226][hotp-rfc4226-url]
- [RFC 6238][totp-rfc6238-url]
- https://www.rfc-editor.org/rfc/rfc2104
- https://www.rfc-editor.org/rfc/rfc3548
- https://github.com/google/google-authenticator/wiki/Key-Uri-Format

<p align="right" style="font-size: 0.89em"><a href="#_dotp_top">back to top</a></p>

[discussions-url]: https://github.com/libewd/dotp/discussions/categories/ideas
[conventionalcommits-url]: https://www.conventionalcommits.org/en/v1.0.0/
[hotp-rfc4226-url]: https://www.rfc-editor.org/rfc/rfc4226.txt
[totp-rfc6238-url]: https://www.rfc-editor.org/rfc/rfc6238.txt
[license-shield]: https://img.shields.io/github/license/libewd/dotp?style=for-the-badge
[license-url]: https://github.com/libewd/dotp/blob/main/LICENSE.txt
[version-shield]: https://img.shields.io/github/v/tag/libewd/dotp?style=for-the-badge
[language-shield]: https://img.shields.io/github/languages/top/libewd/dotp?style=for-the-badge
[api-create-secret-key]: hhttps://github.com/libewd/dotp/blob/main/key.ts#L7-L16
