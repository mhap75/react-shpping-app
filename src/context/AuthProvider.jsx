import {createContext, useContext, useEffect, useState} from "react";

const AuthProviderContext = createContext()
const AuthProviderDispatcher = createContext()

function AuthProvider({children}) {
    const [state, setState] = useState(() => {
        const userData = JSON.parse(localStorage.getItem("LOCAL_STORAGE_KEY"));
        return userData || false;
    })

    useEffect(() => {
        const data = JSON.stringify(state)
        localStorage.setItem("LOCAL_STORAGE_KEY", data)
    }, [state])

    return (<AuthProviderContext.Provider value={state}>
        <AuthProviderDispatcher.Provider value={setState}>
            {children}
        </AuthProviderDispatcher.Provider>
    </AuthProviderContext.Provider>)
}

export default AuthProvider;

export const useAuth = () => useContext(AuthProviderContext)
export const useAuthActions = () => useContext(AuthProviderDispatcher)
