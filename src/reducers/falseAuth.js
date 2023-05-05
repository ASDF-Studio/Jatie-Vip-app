
let initalStates = {
    user: 'Free'
}

export default AuthReducer = (state = initalStates, action) => {
    switch (action.type) {
        case 'Admin':
            return {
                user: 'Admin',

            }
        case 'Free':
            return {
                user: 'Free'
            }

        case 'VIP': {
            return {
                user: 'VIP'
            }
        }
        default: {
            return state
        }
    }
}
