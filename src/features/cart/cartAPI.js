// A mock function to mimic making an async request for data
export function addToCart(item) {
  try {
    return new Promise(async (resolve) => {
      const response = await fetch("/cart", {
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
export function fetchCartItmstByUserId() {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart");
    const data = await response.json();
    resolve({ data });
  });
}
export function updateCartItem(update) {
  try {
    return new Promise(async (resolve) => {
      const response = await fetch("/cart/" + update.id, {
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
      const response = await fetch("/cart/" + itemId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      resolve({ data: { id: itemId } });
    });
  } catch (error) {
    console.log(error);
  }
}

export function  resetCart(userId) {
  try {
    return new Promise(async (resolve) => {
      const response = await fetchCartItmstByUserId(userId);
      const items = response.data;
      for (let item of items) {
        await deleteCartItem(item.id);
      }
      resolve({status:"success"});
    });
  } catch (error) {
    console.log(error);
  }
}
