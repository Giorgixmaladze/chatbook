import { useContext, useEffect, useState } from "react"
import { PostContext } from "../context/PostContext"
import Nav from "../components/Nav"
import Pagination from "../components/Pagination"

const Posts = () => {
    const {posts, pagination, getAllPosts} = useContext(PostContext)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() =>{
        getAllPosts(currentPage, 10)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPage])

    const handlePageChange = (page) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return(
        <div>
            <Nav/>
            <h1>All Posts:</h1>
            {pagination.totalCount > 0 && (
                <p style={{ color: '#666', marginBottom: '20px' }}>
                    Showing {posts.length} of {pagination.totalCount} posts
                </p>
            )}
            <ul>
                {
                    posts.map((post,i) =>{
                        return (<li key={i}>
                            <h2>{post.title}</h2>
                            <p>{post.author}</p>
                            <p>{post.content}</p>
                            <p>{post.likesCount}</p>
                        </li>)
                    })
                }
            </ul>
            <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
    )
}

export default Posts