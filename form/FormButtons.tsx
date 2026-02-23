import { Label } from "@/components/ui/label";
import { useFormContext } from "./FormContext";
import { Button } from "@/components/ui/button";

type FormFieldProps = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
};

type FormButtonsProps = {
  submitLabel: string;
  showReset?: boolean;
  cancelLabel: string;
  onCancel: () => void;
  onSubmit: () => void;
};

export const FormButtons = ({ ...props }: FormButtonsProps) => {
  const { isSubmitting, resetForm } = useFormContext();

  return (
    <div className="flex justify-end px-4 py-4 bg-gray-500 sm:px-6 gap-3 rounded-b-lg">
      {/* Reset Button */}
      {props.showReset && (
        <Button
          type="button"
          variant={"destructive"}
          onClick={resetForm}
          disabled={isSubmitting}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
        >
          Reset
        </Button>
      )}
      {/* Cancel Button */}
      <Button
        type="button"
        variant={"outline"}
        onClick={props.onCancel}
        disabled={isSubmitting}
        className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
      >
        {props.cancelLabel}
      </Button>
      {/* Submit Button */}
      <Button
        type="submit"
        onClick={props.onSubmit}
        disabled={isSubmitting}
        className="bg-blue-500 hover:bg-primary text-primary-foreground font-medium py-2 px-4 rounded"
      >
        {props.submitLabel}
      </Button>
    </div>
  );
};
