export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "! Recipe  is required";
  } else if (!input.summary) {
    errors.summary = "! summary  is required";
  } else if (!input.healthScore) {
    errors.healthScore = "! healthScore  is required";
  } else if (!input.image) {
    errors.image = "Image is required";
  } else if (!input.diet.length) {
    errors.diet = "Select at least one Diet.";
  }

  return errors;
}