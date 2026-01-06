import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Nav } from "../components/Nav"
const Signup = () => {
    const { signUp } = useContext(AuthContext)
    const handleSubmit = (e) => {
        e.preventDefault()
        const formObj = {
            name: e.target.name.value,
            email: e.target.email.value,
            role: e.target.role.value,
            password: e.target.password.value
        }

        signUp(formObj)

    }
    return (
        <>
            <Nav />
            <h1>Register page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Enter your name" />
                <input type="email" name="email" placeholder="Enter your email" />
                <select name="role">
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                </select>
                <input type="password" name="password" placeholder="Create a password" />
                <button>Sign up</button>
            </form>
        </>

    )
}


export default Signup