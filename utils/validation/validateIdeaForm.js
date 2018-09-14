function validateIdeaForm(formValues) {
  const { title, details } = formValues;
  const errors = [];
  if (!title) {
    errors.push({ errorText: "Please insert a valid title!" });
  }
  if (!details) {
    errors.push({ errorText: "Please give some details on the idea!" });
  }

  return errors;
}

module.exports = validateIdeaForm;
