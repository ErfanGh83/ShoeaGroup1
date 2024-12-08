import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

  export type FormData = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    gender: "male" | "female";
  };

  export type SignInFormData = {
    email: string;
    password: string;
  }

  export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
  };


  export type ValidFieldNames =
  | "firstName"
  | "lastName"
  | "username"
  | "email"
  | "password"
  | "phoneNumber"
  | "gender"
  | "confirmPassword";

  export const UserSchema: ZodType<FormData> = z
  .object({
    firstName: z.string().min(3, "اسم کوچک باید حداقل 3 کارکتر باشد."),
    lastName: z.string().min(3, "نام خانوادگی باید حداقل 3 کارکتر باشد."),
    username: z.string()
    .min(5, "نام کاربری باید حداقل 5 کارکتر باشد.")
    .regex(
      /^[a-zA-Z][a-zA-Z0-9]*$/,
      "نام کاربری وارد شده صحیح نمی باشد."
    ),
    email: z.string().email(),
    password: z.string()
    .min(8, "رمز عبور باید حداقل 8 کارکتر باشد.")
    .max(16, "رمز عبور نباید بیشتر از 16 کارکتر باشد.")
    .regex(
      /^[a-zA-Z0-9!#$@()]+$/,
      "رمز وارد شده صحیح نمی باشد."
    ),
    phoneNumber: z
    .string()
    .length(11, "شماره تلفن باید 11 رقمی باشد")
    .startsWith('09', "شماره تلفن باید با 09 شروع شود"),
    gender: z.union([z.literal("male"), z.literal("female")], {
      invalid_type_error: "لطفاً جنسیت را انتخاب کنید."
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "پسورد ها یکسان نیستند",
    path: ["confirmPassword"],
  });