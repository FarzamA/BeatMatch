import React from 'react';
import PlaylistIndexItem from './playlist_index_item';
import { Link } from 'react-router-dom';

const PlaylistIndex = (props) => {

    const { playlists } = props
    // this needs to be refactored so that it checks whether the current user
    // is in the Followed Users of the current profile view
    // righ now, it defaults to ONLY showing public playlists
    let visiblePlaylists, playlistsDisplay;
    if (playlists) {
        visiblePlaylists = playlists.filter(playlist => playlist.isPublic)
        playlistsDisplay = (
            <ul className="playlist-index">
                {visiblePlaylists.map(playlist =>
                    <PlaylistIndexItem playlist={playlist} />)}
            </ul>
        )
    } else {
        playlistsDisplay = (
            <div>
                <p>Looks like you need some playlists. Follow this <Link to="/">Link</Link> to make one.</p>
            </div>
        )
    }

    return (
        <div>
            {playlistsDisplay}
        </div>
    )

};

export default PlaylistIndex;