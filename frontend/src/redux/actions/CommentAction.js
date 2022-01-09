import axios from "axios";
import { getAllPostsAction } from "./PostAction";

export const createNewComment = (newComment) => {
    return async (dispatch) => {
        try {
            await axios({
                url: 'http://localhost:8081/api/comment/create-new-comment',
                method: 'POST',
                data: newComment,
            });
            dispatch(getAllPostsAction());
        } catch (error) {
            console.log('Error Create New Comment: ', error);
        }
    }
}

export const deleteComment = (commentId) => {
    return async (dispatch) => {
        try {
            await axios({
                url: `http://localhost:8081/api/comment/delete-comment/${commentId}`,
                method: 'DELETE',
            });
            dispatch(getAllPostsAction());
        } catch (error) {
            console.log('Error Delete Comment: ', error);
        }
    }
}