import { Label } from "@/components/ui/label";
import { useFormContext } from "./FormContext";
import { Input } from "@/components/ui";

type FormFieldProps = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
};

export const FormField = ({ ...props }: FormFieldProps) => {
  const { values, errors, touched, handleChange, handlerBlur } =
    useFormContext();

  const hasErrors = touched[props.name] && errors[props.name];

  return (
    <div className="mb-4 px-2 py-4 border rounded bg-gray-50">
      <Label
        htmlFor={props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
      </Label>
      <Input
        type={props.type}
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        required={props.required}
        value={values[props.name]}
        onChange={handleChange(props.name)}
        onBlur={() => handlerBlur(props.name)}
        className={hasErrors ? "border-red-500" : "text-white bg-gray-700"}
        aria-invalid={hasErrors ? "true" : undefined}
      />
      {hasErrors && (
        <p className="text-red-500 text-sm mt-1">{errors[props.name]}</p>
      )}
    </div>
  );
};
