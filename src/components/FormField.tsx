import { FormFieldProps } from "./formTypes";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input
      className="w-[380px] h-[36px] bg-gray-100 mx-auto p-2 rounded-md border-black focus:outline-none focus:border-2"
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
    />
    {error && <span className="error-message text-red-500 mx-auto">{error.message}</span>}
  </>
);
export default FormField;