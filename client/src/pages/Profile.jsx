import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { PostContext } from "../context/PostContext"
import Nav from "../components/Nav"

const Profile = () =>{
    const {user,logOut} = useContext(AuthContext)
    const {posts,createPost} = useContext(PostContext)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formObj = {
            title: e.target.title.value,
            content: e.target.content.value
        }
        try {
            createPost(formObj)
            e.target.reset() 
        } catch (err) {
            console.error("Failed to create post:", err)
        }

    }

    return(
        <div>
            <Nav />
            <button onClick={logOut}>Log Out</button>
            <h1>Profile page</h1>
            {user && (
                <>
                    <h2>User: {user.name}</h2>
                    <p>User mail: {user.email}</p>
                    <p>Role: {user.role}</p>
                    <p>Verified: {user.isVerified ? "Yes" : "No"}</p>
                    <p>Posts: {posts?.length || 0}</p>
                </>
            )}
            
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" required />
                <input type="text" name="content" placeholder="Content" required />
                <button type="submit">Create Post</button>
            </form>

            <div>
                <h3>Your Posts:</h3>
             
                {posts.length > 0 ? (
                    <ul>
                        {posts.map((post) => (
                            <li key={post._id}>
                                <h4>{post.title}</h4>
                                <p>{post.content}</p>
                                <p>Likes: {post.likesCount || 0}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No posts yet. Create your first post!</p>
                )}
            </div>
        </div>
    )
}

export default Profile