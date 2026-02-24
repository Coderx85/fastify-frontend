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
    <div className="space-y-2">
      <Label
        htmlFor={props.name}
        className="block text-sm font-medium text-foreground"
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
        className="block h-9 w-full rounded-md border border-input bg-secondary/15 px-3 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        {props.options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-secondary/15 text-foreground text-sm"
            aria-label={option.label}
          >
            {option.label}
          </option>
        ))}
      </select>
      {hasErrors && (
        <p className="mt-1 text-sm text-destructive">{errors[props.name]}</p>
      )}
    </div>
  );
};
