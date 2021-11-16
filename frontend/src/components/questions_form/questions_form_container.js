import { connect } from 'react-redux';
import { fetchQuestions } from '../../actions/question_actions';
import QuestionsForm from './questions_form';

const mapStateToProps = state => ({
    questions: Object.values(state.entities.questions)
});

const mapDispatchToProps = dispatch => ({
    fetchQuestions: () => dispatch(fetchQuestions()),
    // createPlaylist: responses => dispatch(createPlaylist(responses))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsForm);