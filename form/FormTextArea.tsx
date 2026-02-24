import { Label } from "@/components/ui/label";
import { useFormContext } from "./FormContext";
import { Textarea } from "@/components/ui/textarea";

type FormFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
};

type FormTextAreaProps = FormFieldProps & {
  rows: number;
};

export const FormTextArea = ({ ...props }: FormTextAreaProps) => {
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
      <Textarea
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        required={props.required}
        rows={props.rows}
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
