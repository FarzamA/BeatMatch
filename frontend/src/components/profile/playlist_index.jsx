import React from 'react';
import PlaylistIndexItem from './playlist_index_item';
import { Link } from 'react-router-dom';
import { receiveCurrentUser } from '../../actions/session_actions';

class PlaylistIndex extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            offset: 0,
            didSearch: false,
            morePlaylists: true
        };
        this.observer = React.createRef();
        this.incrementOffset = this.incrementOffset.bind(this);
        this.lastPlaylistRef = this.lastPlaylistRef.bind(this);
    }

    componentDidMount() {
        let offset = this.state.offset;

        this.props.fetchPlaylistByUser(this.props.user.username, offset)
            .then(this.setState({didSearch: true}));
    }

    lastPlaylistRef(node) {
        debugger
        this.observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && this.state.morePlaylists) {
                this.props.fetchAddlPlaylistsByUser(this.props.user.username, this.state.offset + 5)
                .then((res) => {
                    debugger
                    if (res.playlists.length < 5) {
                        this.setState({morePlaylists: false})
                    }
                }).catch(err => console.log(err))
                this.incrementOffset();
            }
        });

        if (node) this.observer.current.observe(node);
    }

    incrementOffset() {
        this.setState({ offset: (this.state.offset + 5) });
    }

    render(){
        const { playlists, user, currentUser, deleteUserPlaylist } = this.props;

        let playlistsDisplay;
        debugger

        if (playlists.length > 0) {
            
            playlistsDisplay = (
                <ul className="playlist-index">
                {playlists.map((playlist, idx) => {
                    if (idx === playlists.length - 1) {
                        return (
                            <div ref={this.lastPlaylistRef} >
                                <PlaylistIndexItem
                                    key={idx}
                                    playlist={playlist}
                                    deleteUserPlaylist={deleteUserPlaylist}
                                />
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <PlaylistIndexItem
                                    key={idx}
                                    playlist={playlist}
                                    deleteUserPlaylist={deleteUserPlaylist}
                                />
                            </div>
                        )
                    }
                }
                )}
            </ul>
            )
            
            
            
            
            // visiblePlaylists = playlists.filter(playlist => playlist.isPublic)
            // let mapPlaylists;
            // let actualMapPlaylists;
            // if (playlists.length > 50){
            //     mapPlaylists = playlists.slice(0,50);
            //     actualMapPlaylists = [...mapPlaylists];
            // }else {
            //     mapPlaylists = playlists;
            //     actualMapPlaylists = [...mapPlaylists];
            // }
            // playlistsDisplay = (
            //     <ul className="playlist-index">
            //         {/* not able to call .reverse on original mapPlaylist so created a shallow copy and called it on that instead */}
            //         {actualMapPlaylists.reverse().map(playlist =>
            //             <PlaylistIndexItem key={playlist._id} playlist={playlist} deleteUserPlaylist={deleteUserPlaylist} />)}
            //     </ul>
            // )
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