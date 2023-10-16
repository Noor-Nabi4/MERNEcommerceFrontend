// A mock function to mimic making an async request for data
/* export function fetcLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost/8080/orders");
    const data = await response.json();
    resolve({ data });
  });
} */
export function fetcLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders/" + userId);
    const data = await response.json();
    resolve({ data });
  });
}
export function UpdateUser(update) {
  try {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:8080/user/", {
        method: "PUT",
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

