import { connect } from "react-redux";
import Search from './search';
import { activateSearchModal, deactivateSearchModal } from "../../actions/search_modal_actions";

const mDTP = (dispatch) => ({
    activateSearchModal: () => dispatch(activateSearchModal),
    deactivateSearchModal: () => dispatch(deactivateSearchModal)
});

export default connect(null, mDTP)(Search);