import {Layout} from "./container/Layout/Layout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Cart} from "./components/Pages/Cart";
import Home from "./components/Pages/Home";
import {CartProvider} from "./context/CartProvider";
import {SignUp} from "./components/Pages/SignUp";
import {LogIn} from "./components/Pages/LogIn";
import {NotFound} from "./components/Pages/NotFound";
import AuthProvider from "./context/AuthProvider";
import {SuccessfullPayment} from "./components/Pages/SuccessfullPayment";

function App() {
    return (<BrowserRouter>
        <AuthProvider>
            <CartProvider>
                <Layout>
                    <Routes>
                        <Route index element={<Home/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/login" element={<LogIn/>}/>
                        <Route path="/success" element={<SuccessfullPayment/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </Layout>
            </CartProvider>
        </AuthProvider>
    </BrowserRouter>);
}

export default App;
