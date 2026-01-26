import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Nav } from "../components/Nav"
const Login = () => {
    const { login } = useContext(AuthContext)
    const handleSubmit = (e) => {
        e.preventDefault()
        const formObj = {
   
            email: e.target.email.value,
    
            password: e.target.password.value
        }

        login(formObj)

    }
    return (
        <>
            <Nav />
            <h1>Login page</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Enter your email" />
                
                <input type="password" name="password" placeholder="Enter your password" />
                <button>Log in</button>
            </form>
        </>

    )
}


export default Login