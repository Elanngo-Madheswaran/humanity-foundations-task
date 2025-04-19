export const fakeLogin = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "admin") {
        resolve({ token: "fake-jwt-token" });
      } else {
        reject("Invalid email or password");
      }
    }, 1000);
  });
};

export const fakeRegister = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        resolve({ token: "fake-jwt-token" });
      } else {
        reject("All fields are required");
      }
    }, 1000);
  });
};

