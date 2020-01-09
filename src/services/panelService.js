import axios from 'axios';

const fetchAdminPosts = (token) => axios.get("http://localhost:8000/blog/user/posts", {
    headers: {
        Authorization: "Bearer " + token
    }
});

const addPost = ({ title, content, token }) => axios.post(
    "http://localhost:8000/blog/post",
    { title, content },
    {
        headers: {
            Authorization: "Bearer " + token
        }
    }
);

const editPost = ({ title, content, token, postId }) => axios.put(`http://localhost:8000/blog/update-post/${postId}`, { title, content },
    {
        headers: {
            Authorization: "Bearer " + token
        }
    }
);

const deletePost = ({ token, postId }) => axios.delete(
    `http://localhost:8000/blog/delete-post/${postId}`,
    {
        headers: {
            Authorization: "Bearer " + token
        }
    }
);

export default {
    fetchAdminPosts,
    addPost,
    editPost,
    deletePost
}