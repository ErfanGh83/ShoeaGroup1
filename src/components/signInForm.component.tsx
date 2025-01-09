import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaArrowLeft, FaEnvelope, FaLock } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "react-query";
import { ILoginApiParams, loginApi } from "../api/auth.api";
import { AuthActions } from "../redux/slices/Auth.slice";

type SignInFormData = {
  username: string;
  password: string;
};

const SignInForm: React.FC = () => {
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [passIsFocused, setPassIsFocused] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  
  const appDispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<SignInFormData>();

  const loginMutation = useMutation({
    mutationKey: 'loginApi',
    mutationFn: (data: ILoginApiParams) => loginApi(data),
    onSuccess: ({ data }) => {
        appDispatch(AuthActions.setLogin({ username: data.username, accessToken: data.accessToken }))
        navigate('/home')
    }
  })

  useEffect(() => {
    const lockTime = localStorage.getItem("lockTime");
    if (lockTime) {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - parseInt(lockTime);

      if (timeDifference < 5 * 60 * 1000) {
        setIsLocked(true);
        setRemainingTime(5 * 60 - Math.floor(timeDifference / 1000));
        startCountdown(5 * 60 - Math.floor(timeDifference / 1000));
      } else {
        localStorage.removeItem("lockTime");
        localStorage.removeItem("attemptCount");
        setIsLocked(false);
      }
    }
  }, []);

  const startCountdown = (seconds: number) => {
    let timer = seconds;
    const countdown = setInterval(() => {
      timer--;
      setRemainingTime(timer);
      if (timer <= 0) {
        clearInterval(countdown);
        setIsLocked(false);
        localStorage.removeItem("lockTime");
        localStorage.removeItem("attemptCount");
      }
    }, 1000);
  };

  return (
    <div>
      <button
        className="absolute top-[3%] left-[3%]"
        onClick={() => navigate("/Onboarding")}
      >
        <FaArrowLeft size={24} />
      </button>
      <form onSubmit={handleSubmit(data => {console.log(data); loginMutation.mutate(data)})}>
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
              {...register("username", { required: "Username is required" })}
              className="w-[380px] h-[36px] bg-gray-100 mx-auto p-2 rounded-md border-black focus:outline-none"
              name="username"
              type="text"
              placeholder="Username"
              onFocus={() => setEmailIsFocused(true)}
              onBlur={() => setEmailIsFocused(false)}
            />
          </div>

          <div
            className={`flex flex-row items-center w-fit mx-auto bg-gray-100 px-2 rounded-md ${
              passIsFocused ? "border-2 border-black" : ""
            }`}
          >
            <FaLock color={passIsFocused ? "black" : "gray"} size={18} />
            <input
              {...register("password", { required: "Password is required" })}
              className="w-[380px] h-[36px] bg-gray-100 mx-auto p-2 rounded-md border-black focus:outline-none"
              name="password"
              type="password"
              placeholder="Password"
              onFocus={() => setPassIsFocused(true)}
              onBlur={() => setPassIsFocused(false)}
            />
          </div>

          {isLocked && (
            <p className="text-red-500 text-center">
              Too many failed attempts. Please wait {remainingTime} seconds.
            </p>
          )}

          <div className="mx-auto flex flex-col items-center justify-center">
            <Link to={`/signUp`}>
              <p className="mx-auto my-2 text-md text-blue-500">Don't have an account ? sign up</p>
            </Link>

            <Link to={`/ForgotPassForm`}>
              <p className="mx-auto my-2 text-md text-blue-500">Forgot password</p>
            </Link>
          </div>
            

          <button
            type="submit"
            className={`submit-button w-10/12 h-[48px] rounded-3xl text-2xl font-semibold text-white fixed bottom-[2%] right-[10%] ${
              isLocked ? "bg-gray-400 cursor-not-allowed" : "bg-slate-900"
            }`}
            disabled={isLocked}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
