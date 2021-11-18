import { combineReducers } from "redux";
import searchModalReducer from "./search_modal_reducer";
import burgerModalReducer from "./burger_modal_reducer";

const modalsReducer = combineReducers({
    searchModal: searchModalReducer,
    burgerModal: burgerModalReducer
});

export default modalsReducer;