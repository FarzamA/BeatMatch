import { /*RECEIVE_QUESTION,*/ RECEIVE_QUESTIONS } from '../actions/question_actions';

const _nullState = {};

const questionsReducer = (state = _nullState, action) => {
    Object.freeze(state);

    switch(action.type){
        case RECEIVE_QUESTIONS:
            return action.questions;
        default:
            return state;
    }
}

export default questionsReducer;