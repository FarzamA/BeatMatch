import React from "react";
import { NavLink } from "react-router-dom";

const PlaylistIndexItem = (props) => {
  const { playlist, deleteUserPlaylist } = props;
  let playlistOptions;

  if (window.location.hash === "#/profile"){
    playlistOptions = (
      <div className="playlist-options">
        <div className="delete" onClick={() => 
          deleteUserPlaylist(playlist._id)
          }>Delete Playlist</div>
        <div className="spotify-export">Export to Spotify</div>
      </div>
    )
  } else {
    playlistOptions = (
      <div className="playlist-options">
        <div className="spotify-export">Export to Spotify</div>
      </div>
    )
  }

  return (
    <li className="playlist-index-item">
      <NavLink to={`/playlists/${playlist.id}`}>
        <iframe
          src={playlist.spotify_embed_link}
          width="300"
          height="380"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      </NavLink>
      {playlistOptions}
    </li>
  );
};

export default PlaylistIndexItem;
