import React, {useEffect, useState} from "react";
import {useCart, useCartActions} from "../../context/CartProvider";
import {
    TbInfoSquareRoundedFilled,
    TbSquareRoundedMinus,
    TbSquareRoundedPlus,
    TbSquareRoundedCheckFilled
} from "react-icons/tb";
import {IconContext} from "react-icons";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthProvider";

export const Cart = () => {
    const {cart, totalPrice} = useCart();
    const dispatch = useCartActions()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [isValidCard, setIsValidCard] = useState(true);
    const [coupon, setCoupon] = useState("")
    const [netPrice, setNetPrice] = useState(Math.floor(totalPrice * 100) / 100)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const userData = useAuth()

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            dispatch({type: "SUCCESSFUL_PAYMENT"})
            navigate("/success", {replace: true})
        }, 1200)
    };

    // Format credit card number input as user types
    const handleCardNumberChange = (event) => {
        // Remove any non-numeric characters
        let value = event.target.value.replace(/\D/g, "");

        // Add a space after every 4 digits
        value = value.replace(/(\d{4})/g, "$1 ");

        // Truncate to 16 digits
        value = value.slice(0, 19);

        // Update state
        setCardNumber(value);

        validateCardNumber()
    };

    // Validate credit card number input
    const validateCardNumber = () => {
        // Remove any non-numeric characters
        const value = cardNumber.replace(/\D/g, "");

        // Check if input is exactly 16 digits
        if (value.length === 16) {
            setIsValidCard(true)
        } else {
            setIsValidCard(false)
        }
    };

    const handleCvvChange = (e) => {
        let cvv = e.target.value
        // Remove any whitespace from the input
        cvv = cvv.trim();

        // Check if the input is numeric and exactly 3 digits long
        if (/^\d{0,3}$/.test(cvv)) {
            // Return the processed input
            setCvv(cvv)
        } else {
            // Return null if the input is not valid
            return null
        }
    }

    const handleAddItem = (item) => {
        dispatch({type: "ADD_TO_CART", payload: item})
        setNetPrice(Math.floor(totalPrice * 100) / 100)
    }

    const handleRemoveItem = (item) => {
        dispatch({type: "REMOVE_FROM_CART", payload: item})
        setNetPrice(Math.floor(totalPrice * 100) / 100)
    }

    const handleCoupon = (coupon) => {
        if (coupon === "DG-25") {
            setNetPrice(Math.floor((totalPrice * 0.75) * 100) / 100)
        } else {
            setNetPrice(Math.floor(totalPrice * 100) / 100)
        }
    }

    useEffect(()=> {
        if (userData) {
            setName(userData.name)
            setEmail(userData.email)
        }
    }, [])

    return (<section className="p-4 container mx-auto">
        {cart.length > 0 && <ul className="steps w-full">
            <li className="step step-primary">Select product</li>
            <li className="step step-primary">Cart & Check out</li>
            <li className="step">Order info</li>
        </ul>}
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        {cart.length ? (<div className="grid grid-cols-1 md:grid-cols-8 gap-4">
            <div className="bg-neutral rounded-lg shadow-lg p-4 md:col-span-5">
                <h2 className="text-xl font-bold mb-4">Cart Items:</h2>
                {cart.map((item) => (<div key={item.id} className="flex justify-between mb-4">
                    <div className="gap-2 flex flex-col"><span className="max-w-[45ch]">{item.title}</span><span
                        className="badge badge-primary badge-outline">x{item.quantity}</span></div>
                    <div className="flex flex-col items-end justify-evenly gap-2">
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                        <div className="flex gap-1">
                            <IconContext.Provider value={{size: "1.3rem"}}>
                                <button className="btn btn-outline btn-error btn-xs"
                                        onClick={() => handleRemoveItem(item)}>
                                    <TbSquareRoundedMinus/>
                                </button>
                                <button className="btn btn-outline btn-secondary btn-xs"
                                        onClick={() => handleAddItem(item)}>
                                    <TbSquareRoundedPlus/>
                                </button>
                            </IconContext.Provider>
                        </div>
                    </div>
                </div>))}
                <hr className="my-4"/>
                <div className="flex justify-between">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold">${netPrice}</span>
                </div>
                <div className="form-control mt-3">
                    <div className="input-group">
                        <input type="text" placeholder="enter coupon" className="input input-bordered input-sm"
                        onChange={(e) => setCoupon(e.target.value)}/>
                        <button className="btn btn-square btn-secondary btn-sm" onClick={() => handleCoupon(coupon)}>
                            <IconContext.Provider value={{size: "1.2rem"}}>
                            <TbSquareRoundedCheckFilled/>
                            </IconContext.Provider>
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-secondary-focus rounded-lg shadow-lg p-4 md:col-span-3 h-fit">
                <h2 className="text-xl font-bold mb-4">Checkout:</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="input input-bordered input-secondary w-full input-sm"
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="input input-bordered input-secondary w-full input-sm"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="cardNumber">
                            Credit Card Number
                        </label>
                        <input
                            className="input input-bordered input-secondary w-full input-sm"
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            required={true}
                        />
                        {!isValidCard && (<div className="alert alert-error shadow-lg p-1 px-2 w-fit text-xs mt-2">
                            Please enter a valid 16-digit credit card number
                        </div>)}
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="expirationDate">
                            Expiration Date
                        </label>
                        <input
                            className="input input-bordered input-secondary w-full input-sm"
                            type="month"
                            id="expirationDate"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="cvv">
                            CVV
                        </label>
                        <input
                            className="input w-full input-bordered input-secondary w-full input-sm"
                            type="text"
                            id="cvv"
                            value={cvv}
                            onChange={handleCvvChange}
                            required={true}
                        />
                    </div>
                    {!userData ?
                        <Link
                        className="btn btn-success btn-block"
                        type="submit"
                        to="/login?redirect=cart">
                        Login or sign up first
                    </Link> :
                        <button type="submit" className={`btn btn-success btn-block ${isLoading && "loading"}`}>Check out</button>
                    }
                </form>
            </div>
        </div>) : (<div className="text-center">
            <div className="alert alert-info shadow-lg flex items-center w-fit mx-auto gap-1.5">

                <IconContext.Provider value={{size: "1.8rem"}}>
                    <TbInfoSquareRoundedFilled/>
                </IconContext.Provider>
                <h2 className="text-xl font-bold my-4">Your cart is empty.</h2>
                <p className="text-lg mb-4">
                    Start adding some awesome products to your cart!
                </p>
            </div>
        </div>)}
    </section>);
};