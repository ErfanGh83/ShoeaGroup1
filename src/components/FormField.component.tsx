import { FormFieldProps } from "./formTypes.component";

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
      className="w-11/12 h-[36px] bg-gray-100 mx-auto p-2 rounded-md border-black focus:outline-none focus:border-2"
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
    />
    <div className="w-11/12 h-1 mx-auto my-1 flex items-center">
      {error && <span className="error-message text-red-500 text-xs mx-auto">{error.message}</span>}
    </div>
    
  </>
);
export default FormField;