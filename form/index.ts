import { Form as FormRoot } from "./Form";
import { FormField } from "./FormField";
import { FormRadio } from "./Formradio";
import { FormTextArea } from "./FormTextArea";
import { FormSelect } from "./FormSelect";
import { FormButtons } from "./FormButtons";

// Exporting the form component with its subcomponents as properties for easy access
export const form = Object.assign(FormRoot, {
  Field: FormField,
  Radio: FormRadio,
  Select: FormSelect,
  Buttons: FormButtons,
  TextArea: FormTextArea,
});

export { FormButtons, FormField, FormRadio, FormSelect, FormTextArea };
