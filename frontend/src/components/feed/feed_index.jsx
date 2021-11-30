import React from "react";

class FeedIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            offset: 0
        };
    }

    componentDidMount() {
        let username = this.props.currentUser.username;
        let offset = this.state.offset;

        this.props.fetchFeedPlaylists(username, offset);
    }

    render() {

        return (
            <div>
                ayyyyy
            </div>
        )
    }
}

export default FeedIndex;