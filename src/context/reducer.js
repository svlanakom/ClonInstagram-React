export const initialState = {
    email: '',
    token: '',
};

export function AuthReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                email: action.payload.email,
                token: action.payload.token
            };
        case 'LOGOUT':
            return {
                email: '',
                token: ''
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}
