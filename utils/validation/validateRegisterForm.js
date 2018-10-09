function validateRegisterForm(formValues) {
  const errors = [];
  const { name, email, password, confirmPassword } = formValues;
  console.log("values", name);
  console.log("values", password);
  if (!name) {
    errors.push = { errorText: "Fill in a name!" };
  }
  if (!email) {
    errors.push = { errorText: "Fill in a valid email!" };
  }
  if (!password || password.length < 4) {
    errors.push = { errorText: "Fill in a valid password!" };
  }
  if (password !== confirmPassword) {
    errors.push = { errorText: "Password don't match!" };
  }

  return errors;
}

module.exports = validateRegisterForm;
