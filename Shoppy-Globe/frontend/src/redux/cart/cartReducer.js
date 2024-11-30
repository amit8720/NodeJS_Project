
import { ADD_TO_CART, INITIALIZE_CART,REMOVE_FROM_CART, UPDATE_QUANTITY } from './cartActions';



const initialState = {
    items: [],
};



const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_CART:
            return {
                ...state,
                items: action.payload,
            };
            
        case ADD_TO_CART:
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                // If item already exists in cart, increment its quantity
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === existingItem.id
                            ? { ...item, quantity: (item.quantity || 1) + 1 } // Increment quantity
                            : item
                    )
                };
            }
            // If the item does not exist in the cart, add it with a quantity of 1
            return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };

        case REMOVE_FROM_CART:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };

        case UPDATE_QUANTITY:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
            };

        default:
            return state;
    }
};

export default cartReducer;
