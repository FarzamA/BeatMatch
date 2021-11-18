import { ACTIVATE_BURGER_MODAL, DEACTIVATE_BURGER_MODAL } from '../actions/burger_modal_actions';

const _nullState = { isActive: false };

const burgerModalReducer = (state = _nullState, action) => {
    Object.freeze(state);
    switch(action.type) {
        case ACTIVATE_BURGER_MODAL:
            return { isActive: true };
        case DEACTIVATE_BURGER_MODAL:
            return { isActive: false };
        default:
            return state;
    }
};

export default burgerModalReducer;