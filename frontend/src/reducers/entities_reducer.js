import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import followersReducer from './followers_reducer';
import followingReducer from './following_reducer'
import questionsReducer from './questions_reducer';
import searchResultsReducer from './search_results_reducer';
import playlistsReducer from './playlists_reducer';


const entitiesReducer = combineReducers({
    users: usersReducer,
    followers: followersReducer,
    following: followingReducer,
    questions: questionsReducer,
    searchResults: searchResultsReducer,
    playlists: playlistsReducer
});

export default entitiesReducer;