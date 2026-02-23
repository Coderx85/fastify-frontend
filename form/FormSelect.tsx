import { Label } from "@/components/ui/label";
import { useFormContext } from "./FormContext";
import { Input } from "@/components/ui";

type FormFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
};

type FormSelectProps = FormFieldProps & {
  options: { value: string; label: string }[];
};

export const FormSelect = ({ ...props }: FormSelectProps) => {
  const { values, errors, touched, handleChange, handlerBlur } =
    useFormContext();

  const hasErrors = touched[props.name] && errors[props.name];

  return (
    <div className="mb-4">
      <Label
        htmlFor={props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
      </Label>
      <select
        id={props.name}
        name={props.name}
        required={props.required}
        value={values[props.name]}
        onChange={handleChange(props.name)}
        onBlur={() => handlerBlur(props.name)}
        className="mt-1 block w-full bg-gray-700 text-white rounded-md border-gray-300 shadow-sm px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        {props.options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-gray-700 bg-accent-foreground text-sm hover:bg-gray-100"
            aria-label={option.label}
          >
            {option.label}
          </option>
        ))}
      </select>
      {hasErrors && (
        <p className="text-red-500 text-sm mt-1">{errors[props.name]}</p>
      )}
    </div>
  );
};
