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
  firstName: yup
    .string()
    .required("این فیلد الزامیست"),
  lastName: yup
    .string()
    .required("این فیلد الزامیست"),
  department: yup
    .string()
    .required("این فیلد الزامیست"),
  phone: yup
    .string()
    .min(11, "فرمت شماره تلفن اشتباه است")
    .max(11, "فرمت شماره تلفن اشتباه است")
    .required("این فیلد الزامیست"),
});
