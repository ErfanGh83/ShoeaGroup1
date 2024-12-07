import { useForm } from "react-hook-form";
import { FormData, UserSchema } from "./formTypes";
import FormField from "./FormField";
import { zodResolver } from "@hookform/resolvers/zod";

function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
      } = useForm<FormData>({
        resolver: zodResolver(UserSchema),
      });

  const onSubmit = async (data: FormData) => {
      console.log("SUCCESS", data);
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid col-auto">
          <h1 className="text-3xl font-bold mb-4">
            Zod & React-Hook-Form
          </h1>
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
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
  );
}

export default Form;