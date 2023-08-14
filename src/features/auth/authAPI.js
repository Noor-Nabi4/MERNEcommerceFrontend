// A mock function to mimic making an async request for data
export function createUser(userData) {
  try {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:8080/users", {
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

export function checkUser({ email, password }) {
  try {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(
        `http://localhost:8080/users?email=${email}`
      );
      const data = await response.json();
      if (data.length) {
        if (password === data[0].password) {
          resolve({ data: data[0] });
        } else {
          reject("user not found");
        }
      } else {
        reject("user not found");
      }
    });
  } catch (error) {
    console.log(error);
  }
}
export function UpdateUser(update) {
  try {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:8080/users/"+update.id, {
        method: "PATCH",
        body: JSON.stringify(update),
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
