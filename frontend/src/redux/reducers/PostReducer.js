const initialState = {
    posts: []
}

const PostReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_ALL_POSTS': {
            return { ...state, posts: action.posts }
        }

        default:
            return state
    }
}

export default PostReducer;