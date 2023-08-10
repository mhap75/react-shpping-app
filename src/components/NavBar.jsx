import {Link, useNavigate} from "react-router-dom";
import LogoLink from "./Common/LogoLink";
import profile from "../assets/images/profile.png"
import {useCart} from "../context/CartProvider";
import {useAuth} from "../context/AuthProvider";
import profileIcon from "../assets/images/profileIcon.png"

export const NavBar = () => {

    const {cart, totalPrice} = useCart();
    const userData = useAuth()
    const navigate = useNavigate()

    let cartItemsNumber = 0;
    for (const item of cart) {
        cartItemsNumber += item.quantity;
        // totalPrice += item.price * item.quantity;
    }

    const handleLogout = () => {
        localStorage.removeItem("LOCAL_STORAGE_KEY")
        navigate(0, {replace: true})
    }

    return (<header className="navbar bg-neutral">
        <nav className="container mx-auto">
            <LogoLink/>
            <div className="flex-none flex items-center gap-2">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                            </svg>
                            <span className="badge badge-error badge-sm indicator-item">{cartItemsNumber}</span>
                        </div>
                    </label>
                    <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <span className="font-bold text-lg">{cartItemsNumber} Items</span>
                            <span className="text-info">Total: <span
                                className="badge badge-primary">${Math.floor(totalPrice * 100) / 100}</span></span>
                            <div className="card-actions">
                                <Link to="/cart" className="btn btn-accent btn-block btn-outline">View cart</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className={`w-10 rounded-full ${userData && 'ring ring-primary ring-offset-base-100 ring-offset-2'}`}>
                            <img alt="user" src={userData ? profile : profileIcon}/>
                        </div>
                    </label>
                    <ul tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {userData ? <>
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><Link to="/settings">Settings</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </> : <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Signup</Link></li>
                        </>}
                    </ul>
                </div>
            </div>
        </nav>
    </header>)
}