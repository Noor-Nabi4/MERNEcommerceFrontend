// A mock function to mimic making an async request for data
export function createUser(userData) {
  try {
    return new Promise(async (resolve) => {
      const response = await fetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      resolve({ data });
    });
  } catch (error) {
    console.log(error);
  }
}

export function login(loginInfo) {
  try {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(`/auth/login`, {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.json();
        reject({ err });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
export function signOut(userId) {
  try {
    return new Promise(async (resolve, reject) => {
      resolve({ data: "success" });
    });
  } catch (error) {
    console.log(error);
  }
}
