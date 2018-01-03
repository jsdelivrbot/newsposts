// crud actions for news posts

import axios from 'axios';

// define action types so they can be used in reducers
export const ADD_POST = 'add_post';
export const FETCH_POST = 'fetch_post';
export const FETCH_POSTS = 'fetch_posts';
export const DELETE_POST = 'delete_post';

// vars for building API calls
const ROOT_URL = 'http://reduxblog.herokuapp.com/api/';
const API_KEY = '?key=starrynight';

export function addPost(values, callback) {
    // API endpoint provided in documentation
    const request = axios
        .post(`${ROOT_URL}posts${API_KEY}`, values)
        .then(() => callback()); // execute callback when complete

    return {
        type: ADD_POST,
        payload: request
    };
}

export function fetchPost(id) {
    // API endpoint provided in documentation
    const request = axios.get(`${ROOT_URL}posts/${id}${API_KEY}`);
    
    return {
        type: FETCH_POST,
        payload: request
    };
}

export function fetchPosts() {
    // API endpoint provided in documentation
    const request = axios.get(`${ROOT_URL}posts${API_KEY}`);

    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export function deletePost(id, callback) {
    // API endpoint provided in documentation
    const request = axios.delete(`${ROOT_URL}posts/${id}${API_KEY}`)
        .then(() => callback()); // execute callback when complete
    
    return {
        type: DELETE_POST,
        payload: id // return id so object can be deleted from local state
    }
}