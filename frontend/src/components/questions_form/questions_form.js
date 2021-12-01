import React from 'react';

class QuestionsForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pageNum: 0,
            prevBgColor: '#131316',
            prevTextColor: 'white',
            selectedGenre: '',
            bgColors: ['#ff60b8', '#1a71eb', '#fffa69', '#ed3747', '#b398f1', '#ff8e3f', '#4ddbba', '#d6dd21', '#7dcdef', '#ff6d74', '#6bffc8', '#4cc141', '#ff9cf3', '#fffa69', '#ed3747', '#1a71eb', '#ffa230'],
            questions: this.props.questions,
            answers: new Array(this.props.questions.length),
            targetCategories: this.props.targetCategories,
            generatedPlaylist: null
        };

        this.handleInput = this.handleInput.bind(this);
        this.generatePlaylist = this.generatePlaylist.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.setGenre = this.setGenre.bind(this);
    }

    componentDidMount(){
        this.props.fetchQuestions();
        this.setState({ questions: this.props.questions });
    }

    componentWillUnmount(){
        const body = document.querySelector('body')
        body.classList.remove('first-answer');
        body.classList.remove('following-answer-1');
        body.classList.remove('following-answer-2');
        body.style.backgroundColor = '#131316';
    }
    
    setGenre(genre){
        this.setState({ 
            pageNum: this.state.pageNum + 1,
            selectedGenre: genre
        });
    }

    handleInput(e, answerIndex, answerValue){
        if (this.props.modalIsActive) return null;
        const answers = document.querySelectorAll('.answer-option-container');

        answers.forEach(answer => {
            if(e.target.innerText == answer.innerText){
                answer.classList.add('choosen-answer');
            }else{
                answer.classList.add('other-answer');
            }
        });

        let answerTargetCategoryMap = this.state.targetCategories;
        answerTargetCategoryMap[this.props.questions[answerIndex].targetCategory] = answerValue;

        setTimeout(() => {
            answers.forEach(answer => {
                answer.classList.remove('choosen-answer');
                answer.classList.remove('other-answer');
            });
            this.setState({ 
                targetCategories: answerTargetCategoryMap,
                pageNum: this.state.pageNum <= this.props.questions.length ? this.state.pageNum + 1 : this.state.pageNum
            });
        }, 1500);
    }

    handleMouseEnter(e){
        if (this.props.modalIsActive) return null;
        e.currentTarget.classList.remove('answer-option-mouse-leave');
        e.currentTarget.classList.add('answer-option-mouse-enter');
    }

    handleMouseLeave(e){
        if (this.props.modalIsActive) return null;
        e.currentTarget.classList.remove('answer-option-mouse-enter');
        e.currentTarget.classList.add('answer-option-mouse-leave');
    }

    handleGenreButtonMouseEnter(e, i){
        const targetGenreButton = e.currentTarget;
        targetGenreButton.style.setProperty('--bg-color', this.state.bgColors[i]);
        if (this.props.modalIsActive) return null;
    }

    handleGenreButtonMouseLeave(e){
        if (this.props.modalIsActive) return null;
    }

    generatePlaylist(){
        let responseObj = {};
        const selectedGenre = this.state.selectedGenre;
        const answersArray = [];
        const answerKeys = Object.keys(this.state.targetCategories);
        const answerValues = Object.values(this.state.targetCategories);
        for(let i = 0; i < answerKeys.length; i++){
            let answer = '';
            if(answerValues[i] === 0){
                answer = `min_${answerKeys[i]}`;
            } else{
                answer = `max_${answerKeys[i]}`;
            }
            answersArray.push(answer);
        }

        answersArray.sort(function(i, j){
            let el1 = i.substr(4);
            let el2 = j.substr(4);
            return el1 == el2 ? 0 : el1 < el2 ? -1 : 1;
        });

        responseObj = {
            answers: answersArray,
            genre: selectedGenre
        }

        this.props.fetchPlaylist(responseObj)
            .then(playlist => {
                this.setState({ generatedPlaylist: playlist });
            });
    }

    savePlaylist(){
        const playlist = this.state.generatedPlaylist;
        playlist.user_id = this.props.currentUser.id;
        this.props.postPlaylist(playlist)
            .then(() => this.props.history.push({
                pathname: '/profile'
            }));
    }
    
    render(){
        if(!this.props.questions || this.props.questions.length == 0){
            return null;
        }
        const { pageNum } = this.state;
        const { questions } = this.props;
        const genres = [ "metal", "disney", "hip-hop", "k-pop", "new-release", "pop", "r-n-b", "latino", "world-music", "edm", "jazz", "country", "anime", "rock", "indie", "study", "work-out" ];
        const question = questions[pageNum - 1];
        const previewPlaylistButton = <button className="questions-submit-button button-grow" onClick={this.generatePlaylist}>Generate Playlist</button>;
        const playlistPreview = this.state.generatedPlaylist ? (
            <div className="playlist-preview-container">
                <div className="playlist-preview-heading">Check out your brand new playlist!</div>
                <iframe
                    src={this.state.generatedPlaylist.playlist.spotify_embed_link}
                    width="300"
                    height="380"
                    frameBorder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                ></iframe>
                <div className="save-playlist-prompt">Like what you're hearing?</div>
                <button className="save-playlist-button" onClick={this.savePlaylist}>Save to Profile</button>
                <button className="try-again-button" onClick={() => location.reload()}>Try Again</button>
            </div>
        ) : (
            <div>Loading...</div>
        );
        const selectGenreQuestion = (
            <div className="question-content">
                <div className="genre-question-text">Select a genre</div>
                <div className="genre-answers-container">
                    {genres.map((genre, i) => {
                        return (
                            <div className="genre-option-container" key={`genre-${i}`}>
                                <div 
                                    className="genre-option-button"
                                    onClick={() => this.setGenre(genre)}
                                    onMouseEnter={(e) => this.handleGenreButtonMouseEnter(e, i)}
                                    onMouseLeave={(e) => this.handleGenreButtonMouseLeave(e)}
                                >
                                    {genre}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
        let questionsContent;
        if(pageNum === 0){
            questionsContent = selectGenreQuestion;
        } else {
            questionsContent = pageNum <= this.props.questions.length ? (
                    <div className="question-content">
                        <div className="question-text">{question.question}</div>
                        <div className="answers-container">
                            {question.answerOptions.map((answerOption, i) => {
                                return (
                                    <div className="answer-option-container" onClick={(e) => this.handleInput(e, pageNum - 1, answerOption.answerValue)} key={`answer-${i}`}>
                                        <div 
                                            className="answer-option" 
                                            onMouseEnter={(e) => this.handleMouseEnter(e)}
                                            onMouseLeave={(e) => this.handleMouseLeave(e)}
                                        >
                                            {answerOption.answerText}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="page-num-indicator">
                            {questions.map((question, i) => {
                                const largeDot = pageNum === i + 1 ? 'large-dot' : '';
                                return (
                                    <div key={`page-${i}`} className={`question-number-dot ${largeDot}`}></div>
                                );
                            })}
                        </div>
                    </div>
                ) : <></>;
        }

        if(this.state.generatedPlaylist){
            return (
                <div>
                    <div className="question-container">
                        <div>{playlistPreview}</div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="question-container">
                    {pageNum > this.props.questions.length ? previewPlaylistButton : questionsContent}
                </div>
            </div>
        );
    }
}

export default QuestionsForm;