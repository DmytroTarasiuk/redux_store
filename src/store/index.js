import { createSlice, configureStore } from '@reduxjs/toolkit';

//handling cart visibility state
const initialCartState = {
    isCartShown: false,
    notification: null
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        toogle(state) {
            state.isCartShown = !state.isCartShown
        },
        showNotification(state, action) {
          state.notification = {
            status: action.payload.status,
            title: action.payload.title,
            message: action.payload.message,
          };
        },
    }
})

//handling cart actions/content state
const initialCartContentState = {
    totalQuantity: 0,
    items: [],
    changed: false
}

const cartContentSlice = createSlice({
    name: 'cartContent',
    initialState: initialCartContentState,
    reducers: {
        replaceCart(state, action) {
        state.totalQuantity = action.payload.totalQuantity;
        state.items = action.payload.items;
        },
        addItemToCart(state, action) {
          const newItem = action.payload;
          const existingItem = state.items.find((item) => item.id === newItem.id);
          state.totalQuantity++;
          state.changed = true;
          if (!existingItem) {
            state.items.push({
              id: newItem.id,
              price: newItem.price,
              quantity: 1,
              totalPrice: newItem.price,
              name: newItem.title
            });
          } else {
            existingItem.quantity++;
            existingItem.totalPrice = existingItem.totalPrice + newItem.price;
          }
        },
        removeItemFromCart(state, action) {
          const id = action.payload;
          const existingItem = state.items.find(item => item.id === id);
          state.totalQuantity--;
          state.changed = true
          if (existingItem.quantity === 1) {
            state.items = state.items.filter(item => item.id !== id);
          } else {
            existingItem.quantity--;
            existingItem.totalPrice = existingItem.totalPrice - existingItem.price
          }
        },
      },
})

const store = configureStore({
    reducer: { cart: cartSlice.reducer, cartContent: cartContentSlice.reducer }
});

export const cartActions = cartSlice.actions
export const cartContentActions = cartContentSlice.actions

export default store;