import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaArrowLeft, FaEnvelope, FaLock } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

type SignInFormData = {
  email: string;
  password: string;
};

const SignInForm: React.FC = () => {
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [passIsFocused, setPassIsFocused] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
    console.log("Sign In Data:", data);

    const BASE_URL = "http://localhost:5173/users";

    try {
      const response = await axios.get(BASE_URL);
      const users = response.data;

      const user = users.find(
        (user: any) =>
          user.email === data.email && user.password === data.password
      );

      if (user) {
        toast.success(`Welcome back, ${user.username}!`);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else {
        toast.warning("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <button
        className="absolute top-[3%] left-[3%]"
        onClick={() => navigate("/Onboarding")}
      >
        <FaArrowLeft size={24} />
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <img className="mx-auto" src="/src/assets/logo-black.svg" />
        <h1 className="text-3xl font-bold text-center m-4">Login</h1>
        <div className="grid col-auto gap-4">
          <div
            className={`flex flex-row items-center w-fit mx-auto bg-gray-100 px-2 rounded-md ${
              emailIsFocused ? "border-2 border-black" : ""
            }`}
          >
            <FaEnvelope size={18} color={emailIsFocused ? "black" : "gray"} />
            <input
              {...register("email", { required: "Email is required" })}
              className="w-[380px] h-[36px] bg-gray-100 mx-auto p-2 rounded-md border-black focus:outline-none"
              type="email"
              placeholder="Email"
              onFocus={() => setEmailIsFocused(true)}
              onBlur={() => setEmailIsFocused(false)}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-center">{errors.email.message}</p>
          )}

          <div
            className={`flex flex-row items-center w-fit mx-auto bg-gray-100 px-2 rounded-md ${
              passIsFocused ? "border-2 border-black" : ""
            }`}
          >
            <FaLock color={passIsFocused ? "black" : "gray"} size={18} />
            <input
              {...register("password", { required: "Password is required" })}
              className="w-[380px] h-[36px] bg-gray-100 mx-auto p-2 rounded-md border-black focus:outline-none"
              type="password"
              placeholder="Password"
              onFocus={() => setPassIsFocused(true)}
              onBlur={() => setPassIsFocused(false)}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-center">{errors.password.message}</p>
          )}

          <div className="flex flex-row mx-auto gap-2">
            <input className="w-[18px] accent-black" type="checkbox" />
            <label>Remember me</label>
          </div>

          <div className="flex flex-row justify-center">
            <button
              className="text-blue-500 text-center"
              onClick={() => navigate("/signUp")}
            >
              Don't have an account?
            </button>
          </div>

          <div className="flex flex-row justify-center">
            <button
              className="text-center"
              onClick={() => navigate("/ForgotPassForm")}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="submit-button w-10/12 h-[48px] rounded-3xl bg-slate-900 text-2xl font-semibold text-white fixed bottom-[2%] right-[10%]"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
