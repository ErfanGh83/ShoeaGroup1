import { useForm } from "react-hook-form";
import { SignInFormData, UserSchema } from "./formTypes";
import { zodResolver } from "@hookform/resolvers/zod";

interface signInPage{
  setPage: (value: number) => void;
}

const SignInForm: React.FC<signInPage> = ({ setPage }) => {
  
    const {
        handleSubmit,
      } = useForm<SignInFormData>({
        resolver: zodResolver(UserSchema),
      });

  const onSubmit = async (data: SignInFormData) => {
      console.log("SUCCESS", data);
  }

  return (
    <div>
        <button className="absolute top-[3%] left-[3%]" onClick={() => setPage(0)}>
                <img className="w-8 h-8 scale-x-[-1] m-auto" src="/src/assets/right-arrow-icon.png"/>
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <img className="mx-auto mt-8" src="/src/assets/logo-black.svg"/>
          <h1 className="text-3xl font-bold text-center m-4 mt-12">Login</h1>
          <div className="grid col-auto gap-4">

            <input
                className="w-[380px] h-[36px] bg-gray-100 mx-auto p-2 rounded-md border-black focus:outline-none focus:border-2"
                type="email"
                placeholder="Email"
            />

            <input
                className="w-[380px] h-[36px] bg-gray-100 mx-auto p-2 rounded-md border-black focus:outline-none focus:border-2"
                type="password"
                placeholder="Password"
            />  

            <div className="flex flex-row mx-auto">
              <input
                  className="w-[18px] accent-black"
                  type="checkbox"
              />
              <label>Remember me</label>
            </div>

            <div className="flex flex-row justify-center">
                <button className="text-blue-500 text-center" onClick={() => setPage(2)}>
                    Don't have an account ?
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