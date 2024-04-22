const initialState = {
    isLogin: false,
    user: {}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            const newState = {
                ...state,
                isLogin: true,
                user: action.payload
            }
            return newState;
        case 'DECREMENT':
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
};

export default userReducer;
