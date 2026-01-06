import { useState } from "react";
import { createContext } from "react";

export const usersContext = createContext()

const API_URL = import.meta.env.VITE_API_URL
const UserProvider = ({children}) =>{
    const [users,setUsers] = useState([])
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        limit: 10,
        hasNextPage: false,
        hasPrevPage: false
    })

    const getAllUsers = async (page = 1, limit = 10) =>{
        try{
            const res = await fetch(`${API_URL}/users?page=${page}&limit=${limit}`,{
                credentials:"include"
            })

            const data = await res.json()
            if (data.status === "success") {
                setUsers(data.data.users)
                console.log(data.data)
                setPagination(data.data.pagination)
            } else {
                // Fallback for old API format
                setUsers(data)
            }
        }catch(err){
            console.error(err)
        }
    }



    return(
        <usersContext.Provider value={{users, pagination, getAllUsers}}>
            {children}
        </usersContext.Provider>
    )
}

export default UserProvider