import { useVuelidate } from "@vuelidate/core";
import { get } from "lodash";

export function useMyVuelidate(validations, formData) {
  const $v = useVuelidate(validations, formData);

  function $v_validate(callback) {
    $v.value.$touch();
    if ($v.value.$invalid) return;
    callback();
  }

  function $v_getErrorMessage(key) {
    if (!$v.$dirty) return "";

    let errorObject = get($v.value, key, {});

    if (!errorObject.$invalid) return "";

    const filteredErrorMessages = Object.fromEntries(
      Object.entries(errorObject).filter((i) => i[0][0] !== "$")
    );

    const firstMessage = Object.entries(filteredErrorMessages)
      .map(([_, { $invalid, $message }]) => {
        if ($invalid) return $message;
      })
      .find((i) => !!i);

    return firstMessage || "";
  }

  return {
    $v,
    $v_validate,
    $v_getErrorMessage,
  };
}
