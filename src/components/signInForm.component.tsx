import { useForm } from "react-hook-form";
import { useState } from "react";
import { SignInFormData, UserSchema } from "./formTypes.component";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaArrowLeft } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const SignInForm: React.FC = () => {

    const [emailIsFocused, setEmailIsFocused] = useState(false);
    const [passIsFocused, setPassIsFocused] = useState(false);
  
    const {
        handleSubmit,
      } = useForm<SignInFormData>({
        resolver: zodResolver(UserSchema),
      });

  const onSubmit = async (data: SignInFormData) => {
      console.log("SUCCESS", data);
  }
const navigate=useNavigate();
  return (
    <div>
        <button className="absolute top-[3%] left-[3%]" onClick={() => navigate("/Onboarding")}>
            <FaArrowLeft size={24}/>
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <img className="mx-auto" src="/src/assets/logo-black.svg"/>
          <h1 className="text-3xl font-bold text-center m-4">Login</h1>
          <div className="grid col-auto gap-4">

            <div className={`flex flex-row items-center w-fit mx-auto bg-gray-100 px-2 rounded-md ${
                emailIsFocused? "border-2 border-black" : ""}`}>
                <FaEnvelope size={18} color={emailIsFocused ? "black" : "gray"} />
                <input
                    className="w-[380px] h-[36px] bg-gray-100 mx-auto p-2 rounded-md border-black focus:outline-none"
                    type="email"
                    placeholder="Email"
                    onFocus={() => setEmailIsFocused(true)}
                    onBlur={() => setEmailIsFocused(false)}
                />
            </div>

            <div className={`flex flex-row items-center w-fit mx-auto bg-gray-100 px-2 rounded-md ${
                passIsFocused? "border-2 border-black" : ""}`}>
                <FaLock color={passIsFocused ? "black" : "gray"} size={18} />
                <input
                    className="w-[380px] h-[36px] bg-gray-100 mx-auto p-2 rounded-md border-black focus:outline-none"
                    type="password"
                    placeholder="Password"
                    onFocus={() => setPassIsFocused(true)}
                    onBlur={() => setPassIsFocused(false)}
                />
            </div>

            <div className="flex flex-row mx-auto gap-2">
              <input
                  className="w-[18px] accent-black"
                  type="checkbox"
              />
              <label>Remember me</label>
            </div>

            <div className="flex flex-row justify-center">
                <button className="text-blue-500 text-center" onClick={() => navigate("/signUp")}>
                    Don't have an account ?
                </button>
            </div>

            <div className="flex flex-row justify-center">
                <button className="text-center" onClick={() => navigate("/ForgotPassForm")}>
                    Forgot password ?
                </button>
            </div>

            <button type="submit" className="submit-button w-10/12 h-[48px] rounded-3xl bg-slate-900 text-2xl font-semibold text-white fixed bottom-[2%] right-[10%]">
              Login
            </button>
          </div>
        </form>
      </div>
  );
}

export default SignInForm;