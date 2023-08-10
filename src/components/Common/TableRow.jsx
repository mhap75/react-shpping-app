import {useState} from "react";
import {FaCartPlus} from "react-icons/fa";
import {IconContext} from "react-icons";
import {useCart, useCartActions} from "../../context/CartProvider";
import checkIfInCart from "../../utilities/checkIfInCart";

const TableRow = ({product, toaster}) => {
    const [isLoading, setIsLoading] = useState(false)
    const {cart} = useCart()
    const renderOutput = (rate) => {
        let output = []
        for (let i = 0; i < rate; i++) {
            output.push(<input key={i} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"
                               disabled/>)
        }
        return output
    }

    const dispatch = useCartActions()
    const handleAddToCart = () => {
        setIsLoading(!isLoading)
        setTimeout(() => {
            dispatch({type: "ADD_TO_CART", payload: product})
            setIsLoading(false)
            toaster()
        }, 1000)
    }

    return (<>
        <tr>
            <td>
                <div className="flex items-center space-x-3 max-w-2xl">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 md:w-20 md:h-20">
                            <img src={product.image} alt={product.data}/>
                        </div>
                    </div>
                    <div>
                        <div className="tooltip tooltip-info tooltip-right before:whitespace-pre-wrap"
                             data-tip={product.title}>
                            <div className="font-bold truncate whitespace-pre-wrap text-left">{product.title}</div>
                        </div>
                        <br/>
                        <div className="rating rating-xs">
                            {renderOutput(Math.floor(product.rating))}
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="text-center">
                    <span className="text-success">$</span>{product.price}
                </div>
            </td>
            <td className="hidden md:table-cell">
                <div tabIndex={0}
                     className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                    <input type="checkbox" className="peer"/>
                    <div
                        className="collapse-title text-center">
                        Detail
                    </div>
                    <div
                        className="collapse-content">
                        <div
                            className="max-w-xl whitespace-pre-wrap align-middle">{product.description}</div>
                    </div>
                </div>

            </td>
            <td>
                <IconContext.Provider value={{size: "1.5rem"}}>
                    <div className="indicator">
                        {checkIfInCart(cart, product) && <span
                            className="indicator-item badge badge-info">{checkIfInCart(cart, product).quantity}</span>}
                        <button onClick={() => handleAddToCart(product)}
                                className={`btn btn-info btn-outline flex items-center mx-auto btn-square ${isLoading && "loading"}`}>
                            {!isLoading && <FaCartPlus/>}
                        </button>
                    </div>
                </IconContext.Provider>
            </td>
        </tr>
    </>)
}

export default TableRow