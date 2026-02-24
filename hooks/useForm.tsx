"use client";

import { useState, useCallback } from "react";

export type FormProps<D> = {
  initialValues: D;
  onSubmit: (data: D) => void;
  validate: (data: D) => Partial<Record<keyof D, string>>;
};

/**
 * Custom hook to manage form state, validation, and submission.
 * It provides handlers for input changes, form submission, and form reset.
 * @returns An object containing form values, errors, touched fields, submission state, and handler functions.
 * @prop initialValues - The initial values for the form fields.
 * @prop onSubmit - The function to call when the form is submitted with valid data.
 * @prop validate - A function that takes form values and returns an object of validation errors.
 */
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

/**
 *
 * @param initialValues - The initial values for the form fields.
 * @param onSubmit - The function to call when the form is submitted with valid data.
 * @param validate - A function that takes form values and returns an object of validation errors.
 * @returns An object containing form values, errors, touched fields, submission state, and handler functions.
 * This hook manages form state, validation, and submission logic. It provides handlers for input changes, form submission, and form reset.
 */
export const useForm = ({
  initialValues,
  onSubmit,
  validate,
}: FormProps<any>) => {
  // form state
  const [values, setValues] = useState(initialValues);

  // validation state
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof initialValues, string>>
  >({});

  // touched state to track which fields have been interacted with
  const [touched, setTouched] = useState<
    Partial<Record<keyof typeof initialValues, boolean>>
  >({});

  // submission state to track if the form is currently being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handler for input changes, updates the corresponding field in values
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

  // handler for input blur events, marks the field as touched and validates it
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

  // handler for form submission, validates the form and calls onSubmit if valid
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

  // function to reset the form to its initial state
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // function to set multiple form values at once, merging with existing values
  const setFormValues = useCallback((newValues: any) => {
    setValues((prev: any) => ({ ...prev, ...newValues }));
  }, []);

  // function to set a single field value, merging with existing values
  const setFieldValues = useCallback((name: any, value: any) => {
    setValues((prev: any) => ({ ...prev, [name]: value }));
  }, []);

  // function to set a single field error, merging with existing errors
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
