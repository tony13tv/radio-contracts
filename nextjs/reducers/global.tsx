const initialState = {
    pagination: null
}

export default function (state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case 'SET_PAGINATION':
            return { ...state, pagination: action.payload }
        default:
            return state
    }
}