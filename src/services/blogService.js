import axios from 'axios';

const fetchPosts = () => axios.get('http://localhost:8000/blog/posts');

const fetchSinglePost = (postId) => axios.get(`http://localhost:8000/blog/post/${postId}`);

export default {
    fetchPosts,
    fetchSinglePost
}