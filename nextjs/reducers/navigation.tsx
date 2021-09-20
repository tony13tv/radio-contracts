import { CHANGE_ACTIVE_SIDEBAR_ITEM, CLOSE_SIDEBAR, OPEN_SIDEBAR, } from "../actions/navigation";
import { AnyAction } from "redux";

const initialState = {
    sidebarOpened: false,
    // activeItem: window.location.pathname,
    activeItem: typeof window !== 'undefined' && JSON.parse(localStorage.getItem('staticSidebar') as string) ? window.location.pathname : null,
    sidebarStatic: false
};

export default function runtime(state = initialState, action: AnyAction) {
    switch (action.type) {
        case OPEN_SIDEBAR:
            return {
                ...state,
                sidebarOpened: true,
            };
        case CLOSE_SIDEBAR:
            return {
                ...state,
                sidebarOpened: false,
            };
        case CHANGE_ACTIVE_SIDEBAR_ITEM:
            return {
                ...state,
                activeItem: action.activeItem,
            };
        default:
            return state;
    }
}
