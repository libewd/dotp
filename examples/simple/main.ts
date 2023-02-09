import { OTP } from "https://deno.land/x/dotp/mod.ts";

const otp = await OTP.withRandomSecretKey();
console.log(await otp.createTimeToken());
