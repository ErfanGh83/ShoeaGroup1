import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { SignInFormData, UserSchema } from "./formTypes.component";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaArrowLeft } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const MAX_ATTEMPTS = 5;
const LOCK_TIME = 5 * 60 * 1000;

interface SignInPageProps {
  setPage: (value: string) => void;
}

const SignInForm: React.FC<SignInPageProps> = ({ setPage }) => {

    const [emailIsFocused, setEmailIsFocused] = useState(false);
    const [passIsFocused, setPassIsFocused] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
  
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
      resolver: zodResolver(UserSchema),
    });

      useEffect(() => {
        const attempts = Number(localStorage.getItem("loginAttempts")) || 0;
        const lockTime = Number(localStorage.getItem("lockTime"));
    
        if (attempts >= MAX_ATTEMPTS && lockTime) {
          const now = Date.now();
          if (now - lockTime < LOCK_TIME) {
            setIsLocked(true);
          } else {
            localStorage.removeItem("loginAttempts");
            localStorage.removeItem("lockTime");
            setIsLocked(false);
          }
        }
      }, []);

      const onSubmit = (data: SignInFormData) => {
        console.log('here')
        if (isLocked) return;
    
        const isPasswordCorrect = checkPassword(data);
        if (!isPasswordCorrect) {
          const attempts = Number(localStorage.getItem("loginAttempts")) || 0;
          if (attempts + 1 >= MAX_ATTEMPTS) {
            localStorage.setItem("lockTime", Date.now().toString());
            setIsLocked(true);
          }
          localStorage.setItem("loginAttempts", (attempts + 1).toString());
          alert("رمز عبور اشتباه است!");
        } else {
          localStorage.removeItem("loginAttempts");
          localStorage.removeItem("lockTime");
          alert("ورود موفقیت‌آمیز بود!");
        }
      };

  return (
    <div>
        <button className="absolute top-[3%] left-[3%]" onClick={() => setPage("Onboarding")}>
            <FaArrowLeft size={24}/>
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <img className="mx-auto mt-8" src="/src/assets/logo-black.svg"/>
          <h1 className="text-3xl font-bold text-center m-4 mt-12">Login</h1>
          <div className="grid col-auto gap-4">

            <div className={`flex flex-row items-center bg-gray-100 px-2 rounded-md ${
                emailIsFocused? "border-2 border-black" : ""}`}>
                <FaEnvelope size={18} color={emailIsFocused ? "black" : "gray"} />
                <input
                    className="w-[380px] h-[36px] bg-gray-100 mx-auto p-2 rounded-md border-black focus:outline-none"
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    onFocus={() => setEmailIsFocused(true)}
                    onBlur={() => setEmailIsFocused(false)}
                />
            </div>

            <div className={`flex flex-row items-center bg-gray-100 px-2 rounded-md ${
                passIsFocused? "border-2 border-black" : ""}`}>
                <FaLock color={passIsFocused ? "black" : "gray"} size={18} />
                <input
                    className="w-[380px] h-[36px] bg-gray-100 mx-auto p-2 rounded-md border-black focus:outline-none"
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    onFocus={() => setPassIsFocused(true)}
                    onBlur={() => setPassIsFocused(false)}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <div className="flex flex-row mx-auto gap-2">
              <input
                  className="w-[18px] accent-black"
                  type="checkbox"
              />
              <label>Remember me</label>
            </div>

            <div className="flex flex-row justify-center">
                <button className="text-blue-500 text-center" onClick={() => setPage("SignUpForm")}>
                    Don't have an account ?
                </button>
            </div>

            <div className="flex flex-row justify-center">
                <button className="text-center" onClick={() => setPage("ForgotPassForm")}>
                    Forgot password ?
                </button>
            </div>

            <button type="submit" disabled={isLocked} className={`submit-button w-10/12 h-[48px] rounded-3xl bg-slate-900 text-2xl font-semibold text-white fixed bottom-[2%] right-[10%] 
            ${isLocked?"bg-slate-600": ""}`}>
              Login
            </button>
          </div>
        </form>
      </div>
  );
}

function checkPassword(data: SignInFormData): boolean {
  return data.password === "12345";
}

export default SignInForm;
