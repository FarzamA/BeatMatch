import React from "react";

import FollowIndexItem from './follow_index_item';

class FollowIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username,
            followers: this.props.followers,
            following: this.props.following
        }
    }

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.username)
            .then(data => {
                this.setState({
                    username: data.user.username,
                    followers: data.user.followers,
                    following: data.user.following
                })
            })
    }

    render() {
        const { followers, following, username } = this.state;
        const followerValues = Object.values(followers);
        console.log('props', this.props);
        let list;
        let header;

        if (this.props.location.pathname === `/${username}/followers`) {
            list = (<div>
                {followerValues.map((follow, idx) => 
                    <FollowIndexItem key={idx} follow={follow} />)}
            </div>);
            // header = <h1>Followers:</h1>
        } else if(this.props.location.pathname === `/${username}/following`) {
            list = (<div>
                {following.map((follow, idx) => 
                    <FollowIndexItem key={idx} follow={follow} />)}
            </div>);
            // header = <h1>Following:</h1>
        }

        return(
            <div className='follow-index-container'>
                {/* { header } */}
                <ul className='follow-index'>
                    { list }
                </ul>
            </div>
        )
    }
};

export default FollowIndex;