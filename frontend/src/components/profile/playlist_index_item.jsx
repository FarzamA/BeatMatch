import React from 'react';

const PlaylistIndexItem = (props) => {

    const { playlist } = props;

    return (
        <li>
            <p>PLACEHOLDER FOR PLAYLIST PREVIEW IMAGES</p>
            <p>{playlist.title}</p>
        </li>
    )



};

export default PlaylistIndexItem;