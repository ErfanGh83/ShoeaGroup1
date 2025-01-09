import { useForm, SubmitHandler } from "react-hook-form";
import { FaUser, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ForgotPassFormInputs {
  email: string;
}

const ForgotPassForm: React.FC = () => {
  const [userIsFocused, setUserIsFocused] = useState(false);
  const [inputIsEmpty, setInputIsEmpty] = useState(true);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassFormInputs>();

  const onSubmit: SubmitHandler<ForgotPassFormInputs> = async (data) => {
    console.log("SUCCESS", data);
  };

  const checkInput = (input: HTMLInputElement) => {
    setInputIsEmpty(input.value.length === 0);
  };

  return (
    <div>
      <button
        className="absolute top-[3%] left-[3%]"
        onClick={() => navigate("Onboarding")}
      >
        <FaArrowLeft size={24} />
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <img className="mx-auto" src="/src/assets/logo-black.svg" alt="Logo" />
        <h1 className="text-3xl font-bold text-center m-4 mt-24">Forgot password</h1>
        <div
          className={`w-fit  mx-auto flex flex-row items-center bg-gray-100 px-2 rounded-md mt-12 ${
            userIsFocused ? "border-2 border-black" : ""
          }`}
        >
          <FaUser size={18} color={userIsFocused ? "black" : "gray"} />
          <input
            {...register("email", { required: "Email is required", pattern: /^\S+@\S+\.\S+$/ })}
            className="w-[380px] h-[36px] bg-gray-100 mx-auto p-2 rounded-md border-black focus:outline-none"
            type="email"
            placeholder="Username/Email"
            onFocus={() => setUserIsFocused(true)}
            onBlur={() => setUserIsFocused(false)}
            onChange={(e) => checkInput(e.target)}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
        )}

        <div className="flex flex-row justify-center my-12">
          <button className="text-center" onClick={() => navigate("/login")}>
            Back to sign in
          </button>
        </div>

        <button
          type="submit"
          disabled={inputIsEmpty}
          className={`submit-button w-10/12 h-[48px] rounded-3xl text-2xl font-semibold text-white fixed bottom-[2%] right-[10%] ${
            inputIsEmpty ? "bg-slate-500" : "bg-slate-900"
          }`}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ForgotPassForm;
