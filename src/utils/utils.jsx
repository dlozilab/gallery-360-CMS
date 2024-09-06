export function toTitleCase(fullName) {
    if(fullName){
    return fullName
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  else{
    return "* No Name *";
  }
}

export function getRandomBoolean() {
  return Math.random() >= 0.5;
}

export function isValidEmail(email) {
  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regular expression
  return emailRegex.test(email);
}

export function validatePassword(password) {
  // Define regular expressions for each criteria
  const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/;
  const digitPattern = /\d/;
  const uppercasePattern = /[A-Z]/;

  // Check if the email meets all criteria
  const hasSpecialCharacter = specialCharacterPattern.test(password);
  const hasDigit = digitPattern.test(password);
  const hasUppercase = uppercasePattern.test(password);

  // Return true if all conditions are met, otherwise false
  return hasSpecialCharacter && hasDigit && hasUppercase;
}