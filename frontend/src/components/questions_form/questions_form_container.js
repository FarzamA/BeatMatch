import { connect } from 'react-redux';
import { fetchQuestions } from '../../actions/question_actions';
import { fetchPlaylist } from '../../actions/playlist_actions';
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
        targetCategories: targetCategoriesObj
    };
};

const mapDispatchToProps = dispatch => ({
    fetchQuestions: () => dispatch(fetchQuestions()),
    fetchPlaylist: responses => dispatch(fetchPlaylist(responses))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsForm);