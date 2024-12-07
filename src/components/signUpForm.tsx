import { useForm } from "react-hook-form";
import { FormData, UserSchema } from "./formTypes";
import FormField from "./FormField";
import { zodResolver } from "@hookform/resolvers/zod";

function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
      } = useForm<FormData>({
        resolver: zodResolver(UserSchema),
      });

  const onSubmit = async (data: FormData) => {
      console.log("SUCCESS", data);
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <img className="mx-auto mt-16" src="/src/assets/logo-black.svg"/>
        <h1 className="text-3xl font-bold text-center m-4 mt-12">Sign Up</h1>
        <div className="grid col-auto gap-4">
          <FormField
            type="text"
            placeholder="Username"
            name="username"
            register={register}
            error={errors.username}
          />

          <FormField
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            error={errors.email}
          />

          <FormField
            type="password"
            placeholder="Password"
            name="password"
            register={register}
            error={errors.password}
          />

          <FormField
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword}
          />

          <div className="flex flex-row mx-auto">
            <input
                className="w-[18px] accent-black"
                type="checkbox"
            />
            <label>Remember me</label>
          </div>

          <button type="submit" className="submit-button w-10/12 h-[48px] rounded-3xl bg-slate-900 text-2xl font-semibold text-white fixed bottom-[2%] right-[10%]">
            Sign up
          </button>
        </div>
      </form>
  );
}

export default Form;