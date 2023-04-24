import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("ایمیل معتبر نیست")
    .required("این فیلد الزامیست"),
  password: yup
    .string()
    .min(8, "طول رمز حداقل باید 8 کارکتر باشد")
    .required("این فیلد الزامیست"),
});
