import React from "react";
import { NavLink } from "react-router-dom";

const PlaylistIndexItem = (props) => {
  const { playlist, deleteUserPlaylist } = props;
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
      <div className="delete" onClick={() => {
        return deleteUserPlaylist(playlist._id)
        }}>Delete Playlist</div>
      <div className="spotify-export">Export to Spotify</div>
    </li>
  );
};

export default PlaylistIndexItem;
