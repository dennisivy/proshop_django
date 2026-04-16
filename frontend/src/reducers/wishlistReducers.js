import {
    WISHLIST_LIST_REQUEST,
    WISHLIST_LIST_SUCCESS,
    WISHLIST_LIST_FAIL,

    WISHLIST_ADD_REQUEST,
    WISHLIST_ADD_SUCCESS,
    WISHLIST_ADD_FAIL,
    WISHLIST_ADD_RESET,

    WISHLIST_REMOVE_REQUEST,
    WISHLIST_REMOVE_SUCCESS,
    WISHLIST_REMOVE_FAIL,

    WISHLIST_CHECK_REQUEST,
    WISHLIST_CHECK_SUCCESS,
    WISHLIST_CHECK_FAIL,
} from '../constants/wishlistConstants'


export const wishlistListReducer = (state = { wishlistItems: [] }, action) => {
    switch (action.type) {
        case WISHLIST_LIST_REQUEST:
            return { loading: true, wishlistItems: [] }

        case WISHLIST_LIST_SUCCESS:
            return { loading: false, wishlistItems: action.payload }

        case WISHLIST_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const wishlistAddReducer = (state = {}, action) => {
    switch (action.type) {
        case WISHLIST_ADD_REQUEST:
            return { loading: true }

        case WISHLIST_ADD_SUCCESS:
            return { loading: false, success: true, wishlistItem: action.payload }

        case WISHLIST_ADD_FAIL:
            return { loading: false, error: action.payload }

        case WISHLIST_ADD_RESET:
            return {}

        default:
            return state
    }
}


export const wishlistRemoveReducer = (state = {}, action) => {
    switch (action.type) {
        case WISHLIST_REMOVE_REQUEST:
            return { loading: true }

        case WISHLIST_REMOVE_SUCCESS:
            return { loading: false, success: true, productId: action.payload }

        case WISHLIST_REMOVE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const wishlistCheckReducer = (state = { isInWishlist: false }, action) => {
    switch (action.type) {
        case WISHLIST_CHECK_REQUEST:
            return { loading: true, ...state }

        case WISHLIST_CHECK_SUCCESS:
            return { loading: false, isInWishlist: action.payload }

        case WISHLIST_CHECK_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
