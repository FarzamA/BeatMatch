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
        this.observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && this.state.morePlaylists) {
                this.props.fetchAddlPlaylistsByUser(this.props.user.username, this.state.offset + 5)
                .then((res) => {
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
        
        console.log(this.state.didSearch);

        if (!(playlists instanceof Array)) return (<div className="placeholder"></div>)

        let playlistsDisplay;
        if (playlists.length > 0) {
            const realPlaylists = [...playlists];
            playlistsDisplay = (
                <ul className="playlist-index">
                {realPlaylists.reverse().map((playlist, idx) => {
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
        } else if (user.username === currentUser.username) {
            playlistsDisplay = (
                <div className="playlist-index">
                    <p className="missing-playlist-list">Looks like you need some playlists. Follow this <Link to="/">link</Link> to make one.</p>
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