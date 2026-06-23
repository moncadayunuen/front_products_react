import type {Post} from "../types/Post.ts";

const baseURL = 'https://jsonplaceholder.typicode.com';

export const getPosts = async (page: Number, limit: Number) => {
    const response = await fetch(`${baseURL}/posts?_page=${page}&_limit=${limit}`, {
        method: 'GET'
    });
    const data = await response.json();
    return data.map((post: Post) => {
        return {
            ...post,
            thumbnail: `https://picsum.photos/id/${post.id}/450/300`
        }
    })
}