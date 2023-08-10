import {Link} from "react-router-dom";

const LogoLink = () => {
    return (<div className="flex-1">
        <Link to="/"
              className="btn text-sky-300 border-none normal-case text-xl">Shopping<span
            className="text-secondary-focus">LINE</span></Link>
    </div>)
}

export default LogoLink