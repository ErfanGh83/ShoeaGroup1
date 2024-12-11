import { useForm } from "react-hook-form";
import { FormData, UserSchema } from "./formTypes.component";
import { useState } from "react";
import FormField from "./FormField.component";
import { zodResolver } from "@hookform/resolvers/zod";

interface signUpPage{
  setPage: (value: string) => void;
}

const Form: React.FC<signUpPage> = ({ setPage }) => {

  const [gender, setGender] = useState("");
  
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>({
        resolver: zodResolver(UserSchema),
      });

  const onSubmit = async (data: FormData) => {
      console.log(data)
      setPage("SignInForm")
  }

  return (
    <div>
        <button className="absolute top-[3%] left-[3%]" onClick={() => setPage("Onboarding")}>
          <img className="w-8 h-8 scale-x-[-1] m-auto" src="/src/assets/right-arrow-icon.png"/>
        </button>
        <form className="w-full max-w-[400px] box-border mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <img className="mx-auto mt-8" src="/src/assets/logo-black.svg"/>
          <h1 className="text-3xl font-bold text-center m-4 mt-12">Sign Up</h1>
          <div className="w-full grid col-auto gap-y-2 box-border">
              <div className="w-full block mx-auto">
                <FormField
                  type="text"
                  placeholder="Username"
                  name="username"
                  register={register}
                  error={errors.username}
                />
              </div>
              <div className="block h-6 mx-auto">
                  {errors.username ? (
                    <p className="text-red-500">{errors.username.message}</p>
                  ) : (
                    <p className="invisible">Placeholder</p>
                  )}
                </div>

              <div className="w-full mx-auto">
                <FormField
                  type="email"
                  placeholder="Email"
                  name="email"
                  register={register}
                  error={errors.email}
                />
                <div className="block h-6">
                  {errors.email ? (
                    <p className="text-red-500">{errors.email.message}</p>
                  ) : (
                    <p className="invisible">Placeholder</p>
                  )}
                </div>
              </div>

              <div className="w-full mx-auto flex flex-row justify-between gap-x-2 text-sm">
                <div className="w-full">
                  <FormField
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    register={register}
                    error={errors.firstName}
                  />
                  <div className="block h-6 mx-auto">
                    {errors.firstName ? (
                      <p className="text-red-500">{errors.firstName.message}</p>
                    ) : (
                      <p className="invisible">Placeholder</p>
                    )}
                  </div>
                </div>

                <div className="w-full">
                  <FormField
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    register={register}
                    error={errors.lastName}
                  />
                  <div className="block h-8">
                    {errors.lastName ? (
                      <p className="text-red-500">{errors.lastName.message}</p>
                    ) : (
                      <p className="invisible">Placeholder</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full mx-auto">
                <FormField
                  type="password"
                  placeholder="Password"
                  name="password"
                  register={register}
                  error={errors.password}
                />
                <div className="block h-6">
                  {errors.password ? (
                    <p className="text-red-500">{errors.password.message}</p>
                  ) : (
                    <p className="invisible">Placeholder</p>
                  )}
                </div>
              </div>

              <div className="w-full mx-auto">
                <FormField
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  register={register}
                  error={errors.confirmPassword}
                />
                <div className="block h-6">
                  {errors.confirmPassword ? (
                    <p className="text-red-500">{errors.confirmPassword.message}</p>
                  ) : (
                    <p className="invisible">Placeholder</p>
                  )}
                </div>
              </div>

              <div className="flex flex-row w-11/12 gap-4 mx-auto rounded-md">
                <div className="w-1/4 h-[40px] bg-slate-100">
                  <select
                    className="w-full h-full bg-transparent"
                    id="gender"
                    {...register("gender")}
                    defaultValue=""
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" disabled>
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <div className="block h-6">
                    {errors.gender ? (
                      <p className="text-red-500 text-xs">{errors.gender.message}</p>
                    ) : (
                      <p className="invisible">Placeholder</p>
                    )}
                  </div>
                </div>

                <div className="w-3/4">
                  <FormField
                    type="text"
                    placeholder="Phone number"
                    name="phoneNumber"
                    register={register}
                    error={errors.phoneNumber}
                  />
                  <div className="block h-6">
                    {errors.phoneNumber ? (
                      <p className="text-red-500">{errors.phoneNumber.message}</p>
                    ) : (
                      <p className="invisible">Placeholder</p>
                    )}
                  </div>
                </div>
              </div>

            <div className="flex flex-row mx-auto gap-2">
              <input
                  className="w-[18px] accent-black"
                  type="checkbox"
              />
              <label>I agree to Shoea's terms of services</label>
            </div>

            <div className="flex flex-row justify-center">
                <button className="text-blue-500 text-center" onClick={() => setPage("SignInForm")}>
                    Already have an account ?
                </button>
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