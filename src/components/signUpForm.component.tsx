import { useForm } from "react-hook-form";
import { FormData, UserSchema } from "./formTypes.component";
import { useState } from "react";
import FormField from "./FormField.component";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Form: React.FC= () => {

  const [gender, setGender] = useState("");
  
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>({
        resolver: zodResolver(UserSchema),
      });
      const navigate=useNavigate();

      const onSubmit = async (data: FormData) => {
        console.log(data);
      
        const BASE_URL = 'http://localhost:5173/users';
      
        try {
          const response = await axios.get(BASE_URL);
          const users = response.data;
      
          const isUsernameTaken = users.some(
            (user: any) => user.username === data.username
          );
          const isEmailTaken = users.some(
            (user: any) => user.email === data.email
          );
          const isPhoneTaken = users.some(
            (user: any) => user.phoneNumber === data.phoneNumber
          );

      
          if (isUsernameTaken) {
            toast.warning('Username already taken. Please choose another one.');
            return;
          }
      
          if (isEmailTaken) {
            toast.warning('Email already registered. Please use another email.');
            return;
          }

          if (isPhoneTaken) {
            toast.warning('Phone number already registered.');
            return;
          }
      
          const newUserData = {
            ...data,
            cart: [],
            orders: [],
            wishlist: [],
            locations: [],
            defaultLocation: '',
            defaultShipping: ''
          };
      
          console.log('Final Data to be Posted:', newUserData);

          await axios.post(BASE_URL, newUserData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          toast.success('Account created successfully!');
          navigate('/login');
        } catch (error) {
          toast.error(error);
          toast.warning('An error occurred. Please try again.');
        }
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
                  type="phoneNumber"
                  placeholder="Phone number"
                  name="phoneNumber"
                  register={register}
                  error={errors.phoneNumber}
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