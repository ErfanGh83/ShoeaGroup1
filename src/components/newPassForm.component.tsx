import { useForm, SubmitHandler } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { newPassData, newPassSchema } from "./formTypes.component";
import FormField from "./FormField.component";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const NewPassForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<newPassData>({
    resolver: zodResolver(newPassSchema),
  });

  const onSubmit: SubmitHandler<newPassData> = async (data) => {
    console.log("SUCCESS", data);
  };

  return (
    <div className="w-full">
      <button
        className="absolute top-[3%] left-[3%]"
        onClick={() => navigate("Onboarding")}
      >
        <FaArrowLeft size={24} />
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <img className="mx-auto" src="/src/assets/logo-black.svg" alt="Logo" />
        <h1 className="text-3xl font-bold text-center m-4 mt-24">New Password</h1>

        <div className="w-full flex flex-col gap-2">
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
        </div>

        <div className="flex flex-row justify-center my-12">
          <button className="text-center" onClick={() => navigate("/SignInForm")}>
            Back to sign in
          </button>
        </div>

        <button
          type="submit"
          className="submit-button w-10/12 h-[48px] rounded-3xl bg-slate-900 text-2xl font-semibold text-white fixed bottom-[2%] right-[10%]"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default NewPassForm;
