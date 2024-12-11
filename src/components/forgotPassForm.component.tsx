import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface forgotPass{
    setPage: (value: string) => void;
  }
  

const ForgotPassForm: React.FC<forgotPass> = ({ setPage }) => {

    const [userIsFocused, setUserIsFocused] = useState(false);
    const [inputIsEmpty , setInputIsEmpty] = useState(true);

    const onSubmit = async (data) => {
        console.log("SUCCESS", data);
    }

    const checkInput = async (input) => {
        if(input.value.length > 0){
            setInputIsEmpty(false)
        }
        else{
            setInputIsEmpty(true);
        }
    }

    const {
        register,
        handleSubmit,
    formState: { errors }
  } = useForm();

    return(
        <div>

            <button className="absolute top-[3%] left-[3%]" onClick={() => setPage("Onboarding")}>
                <FaArrowLeft size={24}/>
            </button>

            <form onSubmit={handleSubmit(onSubmit)}>
            <img className="mx-auto" src="/src/assets/logo-black.svg"/>
            <h1 className="text-3xl font-bold text-center m-4 mt-24">Forgot password</h1>
                <div className={`flex flex-row items-center bg-gray-100 px-2 rounded-md mt-12 ${
                    userIsFocused? "border-2 border-black" : ""}`}>
                    <FaUser size={18} color={userIsFocused ? "black" : "gray"} />
                    <input
                        className="w-[380px] h-[36px] bg-gray-100 mx-auto p-2 rounded-md border-black focus:outline-none"
                        type="email"
                        placeholder="Username/Email"
                        onFocus={() => setUserIsFocused(true)}
                        onBlur={() => setUserIsFocused(false)}
                        onChange={(e)=> checkInput(e.target)}
                    />

                </div>

                <div className="flex flex-row justify-center my-12">
                    <button className=" text-center" onClick={() => setPage("SignInForm")}>
                        Back to sign in
                    </button>
                </div>

                <button type="submit" disabled={inputIsEmpty? true : false} className={`submit-button w-10/12 h-[48px] rounded-3xl bg-slate-500 text-2xl font-semibold text-white fixed bottom-[2%] right-[10%] ${
                    !inputIsEmpty? "bg-slate-900" : ""}`}>
                    Send
                </button>
            </form>
        </div>
    )
}

export default ForgotPassForm