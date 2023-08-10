import {createContext, useContext, useReducer} from "react";
import cartReducer from "./cartReducer";

const CartContext = createContext()
const CartContextDispatcher = createContext()
export const CartProvider = ({children}) => {

    const [cart, dispatch] = useReducer(cartReducer, {cart: [], totalPrice: 0})

    return (<CartContext.Provider value={cart}>
        <CartContextDispatcher.Provider value={dispatch}>
            {children}
        </CartContextDispatcher.Provider>
    </CartContext.Provider>)
}

export const useCart = () => useContext(CartContext)
export const useCartActions = () => useContext(CartContextDispatcher)
