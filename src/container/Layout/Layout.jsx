import {NavBar} from "../../components/NavBar";
import {Footer} from "../../components/Footer";

export const Layout = ({children}) => {
    return (
        <>
            <NavBar/>
            <main>{children}</main>
            <Footer/>
        </>
    )
}