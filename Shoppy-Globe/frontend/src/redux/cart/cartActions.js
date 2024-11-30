
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INITIALIZE_CART = 'INITIALIZE_CART';

export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

export const addToCart = (product) => async (dispatch) => {
  try {
      // Make a POST request to the API to add the product to the backend cart
      const response = await fetch('http://localhost:5000/cart', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              "Authorization" : "Bearer " +localStorage.getItem('token')
       
          },
          body: JSON.stringify({
              productId: product._id,
              quantity: 1, // default quantity
          }),
      });

      // Check if the request was successful
      if (response.ok) {
          // If successful, dispatch the action to Redux
          const data = await response.json();
          dispatch(fetchCartData());
          // dispatch({
          //     type: ADD_TO_CART,
          //     payload: product,
          // });
          // alert(`${product.title} has been added to the cart!`);
      } else {
          // Handle failure response from API
          alert('Failed to add product to the cart.');
      }
  } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('An error occurred while adding the product to the cart.');
  }
};

export const removeFromCart = (productId) => async (dispatch) => {
  try {
      // Make a DELETE request to the API to remove the product from the cart
      const response = await fetch('http://localhost:5000/cart', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              "Authorization" :"Bearer " +localStorage.getItem('token')
            },
          body: JSON.stringify({
              productId: productId, // Pass the productId in the request body
          }),
      });

      // Check if the request was successful
      if (response.ok) {
          // If successful, dispatch the action to Redux to remove item from the state
          // dispatch({
          //     type: REMOVE_FROM_CART,
          //     payload: productId,
          // });
          dispatch(fetchCartData()); // Re-fetch cart data after removal
      } else {
          // Handle failure response from API
          alert('Failed to remove product from the cart.');
      }
  } catch (error) {
      console.error('Error removing product from cart:', error);
      alert('An error occurred while removing the product from the cart.');
  }
};

export const removeFromCartAll  = (productId) => async (dispatch) => {
  dispatch(fetchCartData());
} 


export const initializeCart = (cartData) => ({
  type: INITIALIZE_CART,
  payload: cartData,
});

export const fetchCartData = () => async (dispatch) => {
  try {
      const response = await fetch('http://localhost:5000/cart/', {
        headers: {
          "Authorization" :"Bearer " +localStorage.getItem('token')
        }
      }); // Replace with your API endpoint
      const data = await response.json();
      dispatch(initializeCart(data));
  } catch (error) {
      console.error('Failed to fetch cart data:', error);
  }
};




export const updateQuantity = (id, quantity) => async (dispatch) => {
  try {
      // Make a PATCH or PUT request to the API to update the product quantity in the cart
      const response = await fetch('http://localhost:5000/cart', {
          method: 'PUT',  // Or 'PUT' depending on your API
          headers: {
              'Content-Type': 'application/json',
              "Authorization" : "Bearer " +localStorage.getItem('token')
            },
          body: JSON.stringify({
              productId: id,   // Pass the productId in the request body
              quantity: quantity,  // Pass the updated quantity
          }),
      });

      // Check if the request was successful
      if (response.ok) {
          // If successful, dispatch the action to Redux
          const data = await response.json();
          // dispatch({
          //     type: UPDATE_QUANTITY,
          //     payload: { id, quantity },  // Update the state with the new quantity
          // });
          dispatch(fetchCartData()); // Optional: Re-fetch the cart data to ensure the state is in sync
      } else {
          // Handle failure response from API
          alert('Failed to update product quantity.');
      }
  } catch (error) {
      console.error('Error updating product quantity:', error);
      alert('An error occurred while updating the product quantity.');
  }
};
