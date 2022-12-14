import { useCallback, useState } from "react";
import isEmail from "validator/es/lib/isEmail";
import { ERROR_NAME, ERROR_EMAIL } from "../utils/constants";

export const useFormValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    if (name === "name" && target.validity.patternMismatch) {
      target.setCustomValidity(ERROR_NAME);
    } else {
      target.setCustomValidity("");
    }

    if (name === "email") {
      if (!isEmail(value)) {
        target.setCustomValidity(ERROR_EMAIL);
      } else {
        target.setCustomValidity("");
      }
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
};
