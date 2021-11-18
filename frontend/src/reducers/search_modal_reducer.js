import { ACTIVATE_SEARCH_MODAL, DEACTIVATE_SEARCH_MODAL } from '../actions/search_modal_actions';

const _nullState = { isActive: false };

const searchModalReducer = (state = _nullState, action) => {
    Object.freeze(state);
    switch(action.type) {
        case ACTIVATE_SEARCH_MODAL:
            return { isActive: true };
        case DEACTIVATE_SEARCH_MODAL:
            return { isActive: false };
        default:
            return state;
    }
};

export default searchModalReducer;