import React from 'react';
import PlaylistIndexItem from './playlist_index_item';
import { Link } from 'react-router-dom';
import { receiveCurrentUser } from '../../actions/session_actions';

class PlaylistIndex extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        const { playlists, user, currentUser, deleteUserPlaylist } = this.props;
        // this needs to be refactored so that it checks whether the current user
        // is in the Followed Users of the current profile view
        // right now, it defaults to ONLY showing public playlists
        let visiblePlaylists, playlistsDisplay;
    
        if (playlists.length > 0) {
            // visiblePlaylists = playlists.filter(playlist => playlist.isPublic)
            let mapPlaylists;
            let actualMapPlaylists;
            if (playlists.length > 10){
                mapPlaylists = playlists.slice(0,10);
                actualMapPlaylists = [...mapPlaylists];
            }else {
                mapPlaylists = playlists;
                actualMapPlaylists = [...mapPlaylists];
            }
            playlistsDisplay = (
                <ul className="playlist-index">
                    {/* not able to call .reverse on original mapPlaylist so created a shallow copy and called it on that instead */}
                    {actualMapPlaylists.reverse().map(playlist =>
                        <PlaylistIndexItem key={playlist._id} playlist={playlist} deleteUserPlaylist={deleteUserPlaylist} />)}
                </ul>
            )
        } else if (user.username === currentUser.username) {
            playlistsDisplay = (
                <div className="playlist-index">
                    <p className="missing-playlist-list">Looks like you need some playlists. Follow this <Link to="/">Link</Link> to make one.</p>
                </div>
            )
        } else {
            playlistsDisplay = (
                <div className="playlist-index">
                    <p className="missing-playlist-list">Looks like this user doesn't have any playlists.</p>
                </div>
            )
        }
    
        return (
            <div>
                {playlistsDisplay}
            </div>
        )
    }

};

export default PlaylistIndex;