import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const AuthContext = createContext()

const API_URL = import.meta.env.VITE_API_URL
const AuthProvider = ({ children }) => {

    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const login = async (formObj) => {
        try {
            const res = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include", // allow server cookie (lt) to be set
                body: JSON.stringify(formObj)
            })

            const data = await res.json()
            console.log(data.status === "success" ? "Logged in" : data.message || "Login failed")
            setUser(data.data.user)
            console.log(user)
            navigate("/profile")
        } catch (err) {
            console.error(err)
        }
    }


    const signUp = async (formObj) => {
        try {
            const res = await fetch(`${API_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include", // receive auth cookie after signup
                body: JSON.stringify(formObj)
            })
            const data = await res.json()
            console.log(data.data.user)
        } catch (err) {
            console.log(err)
        }

    }


    const autoLogin = async () => {
        try {
            const res = await fetch(`${API_URL}/users/me`, {
                method: "GET",
                credentials: "include",
            })

            if (res.ok) {
                const data = await res.json()
                if (data.status === "success" && data.data.user) {
                    setUser(data.data.user)
                    console.log("Auto-login successful:", data.data.user)
                    navigate("/profile")
                }
            } else {

                setUser(null)
            }
        } catch (err) {
            console.error("Auto-login error:", err)
            setUser(null)
        }
    }

    const logOut = async () =>{
        try{
            await fetch(`${API_URL}/users/logout`,{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                credentials:"include",
            })
            navigate("/login")
        }catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        
        autoLogin()
    }, [])

    return (
        <AuthContext.Provider value={{ login, signUp, user,logOut}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider