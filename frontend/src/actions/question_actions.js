import * as QuestionAPIUtil from '../util/question_api_util';

export const RECEIVE_QUESTION = "RECEIVE_QUESTION";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

export const receiveQuestion = question => ({
    type: RECEIVE_QUESTION,
    question
});

export const receiveQuestions = questions => ({
    type: RECEIVE_QUESTIONS,
    questions
});

export const fetchQuestion = (id) => (dispatch) => (
    QuestionAPIUtil.fetchQuestion(id)
        .then(res => dispatch(receiveQuestion(res.data)))
        .catch(err => console.log(err))
);

export const fetchQuestions = () => dispatch => (
    QuestionAPIUtil.fetchQuestions()
        .then(res => dispatch(receiveQuestions(res.data)))
        .catch(err => console.log(err))
);