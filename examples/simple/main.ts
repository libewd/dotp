import { OTP } from "../../mod.ts";

const otp = await OTP.withRandomSecretKey();
const token = await otp.createTimeToken();

console.log(await token.toString());
