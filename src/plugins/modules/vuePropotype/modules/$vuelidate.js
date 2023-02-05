import { get } from "lodash";

export function $v_setup(formKey, validations, validationsMessages, formData) {
  const val = this.$options?.validations && this.$options?.validations[formKey];
  if (!val) {
    this.$options.validations = { [formKey]: validations };
  } else {
    this.$options.validations[formKey] = validations;
  }

  const mes =
    this.$options?.validationsMessages &&
    this.$options?.validationsMessages[formKey];
  if (!mes) {
    this.$options.validationsMessages = { [formKey]: validationsMessages };
  } else {
    this.$options.validationsMessages[formKey] = validationsMessages;
  }
  this.$forceUpdate();

  this.$on("hook:created", () => {
    this.$set(this, formKey, formData);
  });
}

export function $v_validate(callback) {
  this.$v.$touch();
  if (!this.$v.$invalid) {
    callback();
  }
}

export function $v_getErrorMessage(key) {
  if (!this.$v.$dirty) return "";

  let errorObject = get(this.$v, key, {});
  let errorMessagesObject = get(this.$options.validationsMessages, key, {});

  const filteredErrorMessages = Object.fromEntries(
    Object.entries(errorObject).filter((i) => i[0][0] !== "$")
  );
  const firstMessage = Object.entries(filteredErrorMessages)
    .map(([errorCode, errorStatus]) => {
      if (typeof errorStatus === "boolean" && !errorStatus) {
        return errorMessagesObject[errorCode];
      }
    })
    .find((i) => !!i);

  return firstMessage || "";
}
