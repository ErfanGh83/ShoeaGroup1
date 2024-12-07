import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

  export type FormData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
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
  | "username"
  | "email"
  | "password"
  | "confirmPassword";

  export const UserSchema: ZodType<FormData> = z
  .object({
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "پسورد ها یکسان نیستند",
    path: ["confirmPassword"],
  });