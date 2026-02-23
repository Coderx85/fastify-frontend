"use client";

import { useState, useCallback } from "react";

export type FormProps<D> = {
  initialValues: D;
  onSubmit: (data: D) => void;
  validate: (data: D) => Partial<Record<keyof D, string>>;
};

export type FormState = {
  values: FormProps<any>["initialValues"];
  errors: Partial<Record<keyof FormProps<any>["initialValues"], string>>;
  touched: Partial<Record<keyof FormProps<any>["initialValues"], boolean>>;
  isSubmitting: boolean;
  // handleChange now takes a field name and returns an event handler that
  // updates that field using `e.target.value`
  handleChange: (name: any) => (e: any) => void;
  handlerBlur: (name: any) => void;
  handleSubmit: (e: any) => void;
  resetForm: () => void;
  setFormValues: (newValues: any) => void;
  setFieldValues: (name: any, value: any) => void;
  setFieldError: (name: any, error: string) => void;
};

export const useForm = ({
  initialValues,
  onSubmit,
  validate,
}: FormProps<any>) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof initialValues, string>>
  >({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof typeof initialValues, boolean>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (name: keyof typeof initialValues) => (e: React.ChangeEvent<any>) => {
      const target = e.target;
      const value =
        target?.type === "number"
          ? target.value === ""
            ? ""
            : Number(target.value)
          : target?.value;
      setValues((prev: any) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    // clear errors when values change
    [errors],
  );

  const handlerBlur = useCallback(
    (name: any) => {
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));

      if (validate) {
        const fieldErros = validate({ ...values });
        if (fieldErros[name]) {
          setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
      }
    },
    [errors],
  );

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();

      if (validate) {
        const validErrors = validate(values);
        setErrors(validErrors);

        if (Object.keys(validErrors).length > 0) {
          const allTouched = Object.keys(values).reduce(
            (acc: Record<string, boolean>, key) => ({
              ...acc,
              [key]: true,
            }),
            {},
          );
          setTouched(allTouched);
          return;
        }
      }
      setIsSubmitting(true);

      try {
        await onSubmit(values);
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validate, onSubmit],
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const setFormValues = useCallback((newValues: any) => {
    setValues((prev: any) => ({ ...prev, ...newValues }));
  }, []);

  const setFieldValues = useCallback((name: any, value: any) => {
    setValues((prev: any) => ({ ...prev, [name]: value }));
  }, []);

  const setFieldError = useCallback((name: any, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handlerBlur,
    handleSubmit,
    resetForm,
    setFormValues,
    setFieldValues,
    setFieldError,
  };
};
