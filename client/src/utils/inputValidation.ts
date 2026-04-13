const reserved = ["admin", "null", "root", "api", "login", "register"];

// checks for length (3-20), characters (a-z, A-Z, 0-9, -,_)
export const isValidUsername = (input: string) => {
  if (input.length < 3 || input.length > 20)
    return "Username must be 3-20 characters long";

  const isValidLetters = /^[a-zA-Z0-9_-]+$/.test(input);

  if (!isValidLetters)
    return "Invalid characters, only a-z, A-Z, 0-9, -, _ are allowed";

  if (reserved.includes(input.toLowerCase())) return "Username is reserved";

  const tempInput = input.split("");

  for (let i = 0; i < tempInput.length - 1; i++) {
    const char = tempInput[i];
    const next = tempInput[i + 1];
    if ((char === "-" || char === "_") && (next === "-" || next === "_")) {
      return "Two following special characters are not allowed";
    }
  }

  return null;
};

// checks for length (8-100), password match, characters (a-z, A-Z, 0-9, &%()?!)
export const isValidPassword = (password: string, password2: string) => {
  if (password.length < 8 || password.length > 100)
    return "Password must be 8+ characters long";
  if (password !== password2) return "Passwords do not match";

  return null;
};

export const isValidEmail = (email: string) => {
  if (!email.includes("@")) return "Invalid email";
  const [local, domain] = email.split("@");
  if (!local || !domain || !domain.includes(".")) return "Invalid email";
  return null;
};
