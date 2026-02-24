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
    <div className="space-y-2">
      <Label
        htmlFor={props.name}
        className="block text-sm font-medium text-foreground"
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
        className={
          hasErrors ? "border-destructive" : "bg-secondary/15 text-foreground"
        }
        aria-invalid={hasErrors ? "true" : undefined}
      />
      {hasErrors && (
        <p className="mt-1 text-sm text-destructive">{errors[props.name]}</p>
      )}
    </div>
  );
};
