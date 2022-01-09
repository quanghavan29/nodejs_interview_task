import axios from "axios";

export const getAllPostsAction = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                url: 'http://localhost:8081/api/post/get-all',
                method: 'GET',
            });
            dispatch({
                type: 'GET_ALL_POSTS',
                posts: data,
            })
        } catch (error) {
            console.log('Error Get All Post: ', error);
        }
    }
}


export const createNewPost = (newPost) => {
    return async (dispatch) => {
        try {
            await axios({
                url: 'http://localhost:8081/api/post/create-new-post',
                method: 'POST',
                data: newPost,
            });
            dispatch(getAllPostsAction());
        } catch (error) {
            console.log('Error Create New Post: ', error);
        }
    }
}

export const deletePost = (postId) => {
    return async (dispatch) => {
        try {
            await axios({
                url: `http://localhost:8081/api/post/delete-post/${postId}`,
                method: 'DELETE',
            });
            dispatch(getAllPostsAction());
        } catch (error) {
            console.log('Error Delete Post: ', error);
        }
    }
}