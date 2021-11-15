import React from 'react';
import PlaylistIndexItem from './playlist_index_item';

const PlaylistIndex = (props) => {

    const { playlists } = props
    // this needs to be refactored so that it checks whether the current user
    // is in the Followed Users of the current profile view
    // righ now, it defaults to ONLY showing public playlists
    const visiblePlaylists = playlists.filter(playlist => playlist.isPublic)

    return (
        <ul className="playlist-index">
            {visiblePlaylists.map(playlist =>
                <PlaylistIndexItem playlist={playlist} />)}
        </ul>
    )

};

export default PlaylistIndex;