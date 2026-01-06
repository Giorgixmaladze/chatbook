import { createContext, useEffect, useContext } from "react"
import { useState } from "react"
import { AuthContext } from "./AuthContext"

export const PostContext = createContext()

const API_URL = import.meta.env.VITE_API_URL
const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 2,
        totalCount: 0,
        limit: 5,

    })
    const { user } = useContext(AuthContext)


    const getAllPosts = async(page = 1, limit = 5) =>{
        try{
            setPosts([])
            const res = await fetch(`${API_URL}/posts?page=${page}&limit=${limit}`,{
                credentials:"include"
            })
            if (!res.ok) {
                throw new Error("Failed to fetch posts")
            }
            const data = await res.json()
            if (data.status === "success") {
                setPosts(data.data.posts)
                setPagination(data.data.pagination)
            } else {
                // Fallback for old API format
                setPosts(data)
            }
            console.log(data)


        }catch(err){
            console.error(err)
        }
    }

    const getPostsByUser = async (userId) => {
        if (!userId) return
        
        try {
            const res = await fetch(`${API_URL}/posts/${userId}`, {
                credentials: "include"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch posts")
            }

            const data = await res.json()
            setPosts(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {

        console.log(user)
        if (user?._id) {
            getPostsByUser(user._id)
        }
    }, [user?._id])


    const createPost = async (formObj) => {
        try {
            const res = await fetch(`${API_URL}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(formObj)
            })

            if (!res.ok) {
                throw new Error("Failed to create post")
            }

            const newPost = await res.json()
            
  
            setPosts(prevPosts => [...prevPosts, newPost])
            
            return newPost
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    return (
        <PostContext.Provider value={{ posts, pagination, getPostsByUser, createPost, getAllPosts }}>
            {children}
        </PostContext.Provider>
    )
}
export default PostProvider