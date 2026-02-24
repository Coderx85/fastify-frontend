import { useFormContext } from "./FormContext";
import { Button } from "@/components/ui/button";

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
    <div className="mt-2 flex items-center justify-end gap-3 border-t border-border pt-4">
      {/* Reset Button */}
      {props.showReset && (
        <Button
          type="button"
          variant={"destructive"}
          onClick={resetForm}
          disabled={isSubmitting}
          className="font-medium"
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
        className="font-medium"
      >
        {props.cancelLabel}
      </Button>
      {/* Submit Button */}
      <Button
        type="submit"
        onClick={props.onSubmit}
        disabled={isSubmitting}
        className="font-medium"
      >
        {props.submitLabel}
      </Button>
    </div>
  );
};
