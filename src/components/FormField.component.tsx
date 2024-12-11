import { FormFieldProps } from "./formTypes.component";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  valueAsNumber,
}) => (
  <>
    <input
      className="w-11/12 h-[36px] bg-gray-100 mx-auto p-2 rounded-md border-black focus:outline-none focus:border-2"
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
    />
  </>
);
export default FormField;