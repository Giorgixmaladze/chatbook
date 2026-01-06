import { useContext } from "react"
import { usersContext } from "../context/UsersContext"
import { useEffect, useState } from "react"
import Pagination from "../components/Pagination"

const Users = () =>{

    const {users, pagination, getAllUsers} = useContext(usersContext)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() =>{
        getAllUsers(currentPage, 10)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPage])

    const handlePageChange = (page) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return(
        <div>
            <h1>All Users:</h1>
            {pagination.totalCount > 0 && (
                <p style={{ color: '#666', marginBottom: '20px' }}>
                    Showing {users.length} of {pagination.totalCount} users
                </p>
            )}
            <ul>
                {users.map((user,i) =>{
                    return(
                        <li key={i}>
                            <h2>Name: {user.name}</h2>
                            <p>Email: {user.email}</p>
                            <p>Verified: {user.isVerified?"Yes":"No"}</p>
                        </li>
                    )
                })}
            </ul>
            <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
    )
}

export default Users