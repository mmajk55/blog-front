import axios from 'axios';

const fetchPosts = () => axios.get('http://localhost:8000/blog/posts');

const fetchSinglePost = (postId) => axios.get(`http://localhost:8000/blog/post/${postId}`);

const addComment = ({ token, postId, commentContent }) => axios.post('http://localhost:8000/blog/add-comment', { token, postId, commentContent }, {
    headers: {
        Authorization: "Bearer " + token
    }
});

export default {
    fetchPosts,
    fetchSinglePost,
    addComment
}