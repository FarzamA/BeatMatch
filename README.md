# Beat Match

Find the beat that matches you!

<img src="https://beatmatch-images.s3.us-east-1.amazonaws.com/homepage.png"/>

# Live Site

Check out our [live site](https://beat-match-mern.herokuapp.com/#/)!

# Background and Overview
Beat Match is a web application that recommends the perfect Spotify playlist for YOU. We use an interactive questionnaire and the Spotify Web API to generate a playlist that matches your preferred genre and your current mood. You can save these playlists to your profile, view your friends' playlists on your newsfeed, and share your playlists to other social media.

Beat Match is built using the MERN stack: MongoDB, Express.js, React / Redux, and Node.js. The application includes an infinite scroll newsfeed (using the Intersection Observer API), modern styling using CSS / SCSS, a searchbar, and creative use of the Spotify Web API.

# Technologies

Our application employs a number of technologies and frameworks.

* MongoDB
* Mongoose
* Express.js
* React
* Redux
* Node.js
* HTML5
* CSS3
* SCSS
* Axios
* Intersection Observer API
* JSON Web Tokens
* Spotify Web API


# Features

## Playlist Generation

* Once you're logged in, we ask you a series of cheeky questions to see what playlist is right for you.

<img src="https://beatmatch-images.s3.us-east-1.amazonaws.com/genreselection.png"/>

<img src="https://beatmatch-images.s3.us-east-1.amazonaws.com/question.png"/>

* We convert your responses into parameters defined by the Spotify WEB API ("instrumentalness", "energy", e.g.) to find a playlist that matches your preferences.

```javascript

router.post('/playlist', (req, res) => {

    // Find all playlists that match your answers
    Playlist.find({
        answers: req.body.answers,
        genre: req.body.genre
    }).then(playlists => {
        // Choose a random playlist from the perfect matches, or a less-than-perfect match if there's no perfect match
        if (playlists.length > 0){
            return res.json(playlists[Math.floor((Math.random() * playlists.length-1))])
        } else{
            Playlist.find({ genre: req.body.genre })
                .then(playlists => res.json(playlists[Math.floor((Math.random() * playlists.length-1))]))
                .catch(err => console.log(err))
        }
    })
}

```

## Newsfeed

* When you follow other users, their playlists (as well as your own) appear in your Feed.

<img src="https://beatmatch-images.s3.us-east-1.amazonaws.com/newsfeed2.png"/>

* The Feed features an infinite scroll through you and your friends' playlists. The component state stores information about whether there are more posts left to fetch from the database.

```javascript

class FeedIndex extends React.Component {
    constructor(props) {
        super(props);
        
        // Component state stores information about whether an initial search has been performed,
        // whether there are remaining posts left to fetch,
        // and what offset to use in the DB query
        this.state = {
            offset: 0,
            didSearch: false,
            morePlaylists: true
        };

        this.observer = React.createRef();
    }

    // This function defines the infinite scroll
    lastPlaylistRef(node) {
            this.observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && this.state.morePosts) {
                    props.fetchAddlFeedPlaylists(props.currentUser.username, this.state.offset + 5)
                    .then((res) => {
                        // If there aren't enough playlists, change state to prevent additional queries
                        if (res.playlists.length < 5) {
                            this.setState({morePlaylists: false})
                        }
                    });
                    // Adjust the offset for future queries
                    this.incrementOffset();
                }
            });

            if (node) this.observer.current.observe(node);
    }
}

```

## Social Media Integration

* You can also share your profile to various social media sites.

<img src="https://beatmatch-images.s3.us-east-1.amazonaws.com/socialmedia.png"/>

# Team Members
* [Zeki Kural](https://github.com/zkural1) - Project Lead/Flex Developer
* [Farzam Ahmad](https://github.com/FarzamA) - Backend Lead
* [Alberto Young](https://github.com/alyoung1991) - Frontend Lead
* [Elliot Wilson](https://github.com/elliot-wilson) - Flex Developer

# What's Next

We're in the process of having our app reviewed by Spotify. Once we get Spotify's approval, users will be able to export their playlists from Beat Match to their own Spotify profiles.
