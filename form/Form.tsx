import { useForm, FormProps } from "../hooks/useForm";
import { FormContext } from "./FormContext";

/**
 * Form component that provides form state and handlers to its children via context.
 * It accepts initial values, validation schema, and an onSubmit handler.
 * Children can be either React nodes or a render prop function that receives form state.
 */
type FormComponentProps<D> = FormProps<D> & {
  children:
    | React.ReactNode
    | ((formState: ReturnType<typeof useForm>) => React.ReactNode);
};

/**
 *
 * @prop initialValues - The initial values for the form fields.
 * @prop onSubmit - The function to call when the form is submitted with valid data.
 * @prop validate - A function that takes form values and returns an object of validation errors.
 * @prop children - The form fields, which can be either React nodes or a render prop function that receives form state.
 * @returns A form component that manages its own state and validation, and provides it to its children via context.
 */
export const Form = <D,>({ ...props }: FormComponentProps<D>) => {
  const formState = useForm(props);

  return (
    <FormContext.Provider value={formState}>
      <form
        onSubmit={formState.handleSubmit}
        className="mx-auto w-full max-w-2xl space-y-5 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm"
      >
        {typeof props.children === "function"
          ? props.children(formState)
          : props.children}
      </form>
    </FormContext.Provider>
  );
};
