// A mock function to mimic making an async request for data
export function addToCart(item) {
  try {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:8080/cart", {
        method: "POST",
        body: JSON.stringify(item),
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
export function fetchCartItmstByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart?user="+userId);
    const data = await response.json();
    resolve({ data });
  });
}
export function updateCartItem(update) {
  try {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:8080/cart/"+update.id, {
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

export function deleteCartItem(itemId) {
  try {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:8080/cart/"+itemId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      resolve({ data:{id:itemId} });
    });
  } catch (error) {
    console.log(error);
  }
}
