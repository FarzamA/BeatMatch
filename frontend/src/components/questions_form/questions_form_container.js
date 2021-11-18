import { connect } from 'react-redux';
import { fetchQuestions } from '../../actions/question_actions';
import QuestionsForm from './questions_form';

const mapStateToProps = state => {
    const questions = Object.values(state.entities.questions);
    const targetCategories = questions.map(question => {
        return question.targetCategory;
    });
    
    let targetCategoriesObj = {};

    targetCategories.forEach((targetCategory) => {
        targetCategoriesObj[targetCategory] = 0;
    })

    return {
        questions,
        targetCategories: targetCategoriesObj,
        modalIsActive: (state.modals.searchModal.isActive || state.modals.burgerModal.isActive)
    };
};

const mapDispatchToProps = dispatch => ({
    fetchQuestions: () => dispatch(fetchQuestions()),
    // createPlaylist: responses => dispatch(createPlaylist(responses))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsForm);