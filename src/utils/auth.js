// src/utils/auth.js

// Temporary mock users
const users = [
  { email: "admin@notary.com", password: "1234", role: "admin" },
  { email: "notary@notary.com", password: "5678", role: "notary" },
];

// Validate user credentials
export function validateUser(email, password) {
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
  return null;
}

// Get current user
export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// Logout user
export function logout() {
  localStorage.removeItem("user");
}
