import { Label } from "@/components/ui/label";
import { useFormContext } from "./FormContext";
import { Input } from "@/components/ui";

type FormRadioProps = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  required: boolean;
  reset: boolean;
};

/**
 *
 * @param props
 * @param props.name - The name of the radio group
 * @param props.label - The label for the radio group
 * @param props.options - An array of options for the radio group, each with a value and label
 * @param props.required - Whether the radio group is required
 * @param props.reset - Whether to reset the radio group on form reset
 * @returns
 */
export const FormRadio = ({ ...props }: FormRadioProps) => {
  const { isSubmitting } = useFormContext();

  return (
    <div className="mb-4">
      <Label
        htmlFor={props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
      </Label>

      <div className="mt-2">
        {props.options.map((option) => (
          <div key={option.value} className="flex items-center mb-2">
            <Input
              type="radio"
              id={`${props.name}-${option.value}`}
              name={props.name}
              value={option.value}
              disabled={isSubmitting}
            />
            <Label htmlFor={`${props.name}-${option.value}`} className="ml-2">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
