export function $vuelidate_setup(
  formKey,
  validations,
  validationsMessages,
  formData
) {
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

export function $vuelidate(callback) {
  this.$v.$touch();
  console.error(this.$v.$invalid);
  console.error(this.$v);
  if (!this.$v.$invalid) {
    callback();
  }
}
