import { useForm, FormProps } from "../hooks/useForm";
import { FormContext } from "./FormContext";

type FormComponentProps<D> = FormProps<D> & {
  children:
    | React.ReactNode
    | ((formState: ReturnType<typeof useForm>) => React.ReactNode);
};

export const Form = <D,>({ ...props }: FormComponentProps<D>) => {
  const formState = useForm(props);

  return (
    <FormContext.Provider value={formState}>
      {/* wrapper gives card-like appearance with spacing */}
      <form
        onSubmit={formState.handleSubmit}
        className="max-w-lg mx-auto bg-gray-400 p-6 rounded-lg shadow-md space-y-6"
      >
        {typeof props.children === "function"
          ? props.children(formState)
          : props.children}
      </form>
    </FormContext.Provider>
  );
};
