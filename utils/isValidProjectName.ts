export function isValidProjectName(name: string): { valid: boolean, error?: string } {
  const minLength = 3;
  const maxLength = 50;

  if (name.length < minLength || name.length > maxLength) {
    return { valid: false, error: `Name must be between ${minLength} and ${maxLength} characters long.` };
  }

  const validNamePattern = /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/;
  if (!validNamePattern.test(name)) {
    return {
      valid: false,
      error:
        "Name can only contain alphanumeric characters, hyphens, or underscores, and cannot start or end with a hyphen or underscore."
    };
  }

  return { valid: true };
}
