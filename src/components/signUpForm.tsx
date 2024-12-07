import { useForm } from "react-hook-form";
import { FormData, UserSchema } from "./formTypes";
import FormField from "./FormField";
import { zodResolver } from "@hookform/resolvers/zod";

interface signUpPage{
  setPage: (value: number) => void;
}

const Form: React.FC<signUpPage> = ({ setPage }) => {
  
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>({
        resolver: zodResolver(UserSchema),
      });

  const onSubmit = async (data: FormData) => {
      console.log("SUCCESS", data);
  }

  return (
    <div>
        <button className="absolute top-[3%] left-[3%]" onClick={() => setPage(2)}>
                <img className="w-8 h-8 scale-x-[-1] m-auto" src="/src/assets/right-arrow-icon.png"/>
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <img className="mx-auto mt-8" src="/src/assets/logo-black.svg"/>
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
      </div>
  );
}

export default Form;