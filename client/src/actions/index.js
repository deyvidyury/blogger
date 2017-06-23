import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const FETCH_POST = 'fetch_post';
export const EDIT_POST = 'edit_post';
export const DELETE_POST = 'delete_post';

const ROOT_URL = 'http://localhost:3000/api';

export function fetchPosts(){

	const request = axios.get(`${ROOT_URL}/posts`);

	return {
		type: FETCH_POSTS,
		payload: request
	}
}

export function createPost(values, callback){
	const request = axios.post(`${ROOT_URL}/post`, values)
		.then(() => callback());

	return {
		type: CREATE_POST,
		payload: request
	}
}

export function fetchPost(id){
	const request = axios.get(`${ROOT_URL}/post/${id}`);

	return {
		type: FETCH_POST,
		payload: request
	}
}

export function savePost(id, values, callback){
	const request = axios.put(`${ROOT_URL}/post/${id}`, values)
		.then(() => callback());

	return {
		type: EDIT_POST,
		payload: request
	}
}

export function deletePost(id, callback){
	const request = axios.delete(`${ROOT_URL}/post/${id}`)
		.then(() => callback());

	return {
		type: DELETE_POST,
		payload: id
	}	
}