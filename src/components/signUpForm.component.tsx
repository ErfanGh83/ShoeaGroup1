import { useForm } from "react-hook-form";
import { FormData, UserSchema } from "./formTypes.component";
import { useState } from "react";
import FormField from "./FormField.component";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'

import { signUp } from "../api/auth.api";
import { toast } from "react-toastify";

const Form: React.FC= () => {

  const [gender, setGender] = useState("");
  const Navigate = useNavigate()
  
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>({
        resolver: zodResolver(UserSchema),
      });
      const navigate=useNavigate();

      const onSubmit = async (data: FormData) => {
        delete data.confirmPassword;
        delete data.gender;
        signUp(data)
        Navigate(`/login`)
        toast.success('signed up successfully')
      };

  return (
    <div>
        <button className="absolute top-[3%] left-[3%]" onClick={() => navigate("/Onboarding")}>
            <FaArrowLeft size={24}/>
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <img className="mx-auto" src="/src/assets/logo-black.svg"/>
          <h1 className="text-3xl font-bold text-center m-4 ">Sign Up</h1>
          <div className="grid col-auto gap-2">
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

            <div className="w-11/12 mx-auto flex flex-row justify-between">
              <div className="w-full">
                <FormField
                  type="firstName"
                  placeholder="First name"
                  name="firstName"
                  register={register}
                  error={errors.firstName}
                />
              </div>
                
              <div className="w-full">
                <FormField
                type="lastName"
                placeholder="Last name"
                name="lastName"
                register={register}
                error={errors.lastName}
              />
              </div>
              
            </div>

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

            <div className="flex flex-row w-11/12 gap-4 mx-auto rounded-md">
              <div className="w-1/4 bg-slate-100">
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
              </div>

              <div className="w-3/4">
                  <FormField
                  type="phone"
                  placeholder="Phone number"
                  name="phone"
                  register={register}
                  error={errors.phone}
                />
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
                <button className="text-blue-500 text-center" onClick={() => navigate("/login")}>
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