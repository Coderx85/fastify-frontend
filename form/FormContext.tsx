import { FormState } from "@/hooks/useForm";
import { createContext, useContext } from "react";

export const FormContext = createContext<FormState | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }

  return context;
};
