function validateRegisterForm(formValues) {
  const errors = [];
  const { name, email, password, confirmPassword } = formValues;

  if (!name) {
    errors.push = { errorText: "Fill in a name!" };
  }
  if (!email) {
    errors.push = { errorText: "Fill in a valid email!" };
  }
  if (!password) {
    errors.push = { errorText: "Fill in a valid password!" };
  }
  if (password !== confirmPassword) {
    errors.push = { errorText: "Password don't match!" };
  }

  return errors;
}
