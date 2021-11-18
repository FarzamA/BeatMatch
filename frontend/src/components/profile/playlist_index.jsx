import React from 'react';
import PlaylistIndexItem from './playlist_index_item';
import { Link } from 'react-router-dom';
import { receiveCurrentUser } from '../../actions/session_actions';

class PlaylistIndex extends React.Component{
    constructor(props){
        super(props);

    }

    componentDidMount(){
        // this.props.fetchPlaylistByUser(this.props.user._id)
    }
    render(){
        const { playlists, user, currentUser } = this.props
        // this needs to be refactored so that it checks whether the current user
        // is in the Followed Users of the current profile view
        // righ now, it defaults to ONLY showing public playlists
        let visiblePlaylists, playlistsDisplay;
    
        
        if (Object.keys(playlists).length !== 0) {
            // visiblePlaylists = playlists.filter(playlist => playlist.isPublic)
            let mapPlaylists
            if (playlists.length > 5){
                mapPlaylists = playlists.slice(0,5)
            }else {
                mapPlaylists = playlists
            }
            playlistsDisplay = (
                <ul className="playlist-index">
                    {mapPlaylists.map(playlist =>
                        <PlaylistIndexItem key={playlist.id} playlist={playlist} />)}
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