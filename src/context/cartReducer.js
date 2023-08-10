const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const cart = [...state.cart]
            const index = cart.findIndex(p => p.id === action.payload.id)
            if (index < 0) {
                cart.push({...action.payload, quantity: 1})
            } else {
                const updatedCartItem = {...cart[index]}
                updatedCartItem.quantity++;
                cart[index] = updatedCartItem;
            }
            return {...state, cart: cart, totalPrice: state.totalPrice + action.payload.price}
        }
        case 'REMOVE_FROM_CART':
            const cart = [...state.cart]
            const index = cart.findIndex(p => p.id === action.payload.id)
            const updatedCartItem = {...cart[index]}
            if (updatedCartItem.quantity === 1) {
                const removedCartItem = cart.filter(item => item.id !== action.payload.id)
                return {...state, cart: removedCartItem}
            } else {
                updatedCartItem.quantity--;
                cart[index] = updatedCartItem;
                return {...state, cart: cart, totalPrice: state.totalPrice - action.payload.price}
            }
        case 'SUCCESSFUL_PAYMENT':
            return {cart: []}
        default:
            return state
    }
}

export default cartReducer