import React from 'react';

class QuestionsForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pageNum: 1,
            prevAnswer: 0,
            questions: this.props.questions,
            answers: new Array(this.props.questions.length),
            targetCategories: this.props.targetCategories
        };

        this.handleInput = this.handleInput.bind(this);
        this.generatePlaylist = this.generatePlaylist.bind(this);
    }

    componentDidMount(){
        this.props.fetchQuestions();
        this.setState({ questions: this.props.questions });
    }

    componentWillUnmount(){
        const body = document.querySelector('body')
        body.classList.remove('first-negative-answer');
        body.classList.remove('first-positive-answer');
        body.classList.remove('positive-answer');
        body.classList.remove('negative-answer');
    }

    handleInput(answerIndex, answerValue){
        const body = document.querySelector('body');
        if(this.state.pageNum === 1){
            if(answerValue === 0){
                body.classList.add('first-negative-answer');
            }else {
                body.classList.add('first-positive-answer');
            }
        }else{
            if(this.state.prevAnswer != answerValue){
                if(answerValue === 0){
                    body.classList.remove('first-negative-answer');
                    body.classList.remove('first-positive-answer');
                    body.classList.remove('positive-answer');
                    body.classList.add('negative-answer');
                }else {
                    body.classList.remove('first-negative-answer');
                    body.classList.remove('first-positive-answer');
                    body.classList.remove('negative-answer');
                    body.classList.add('positive-answer');
                }
            }
        }
        
        const prevAnswer = answerValue;
        let answerTargetCategoryMap = this.state.targetCategories;
        answerTargetCategoryMap[this.props.questions[answerIndex].targetCategory] = answerValue;
        this.setState({ 
            targetCategories: answerTargetCategoryMap,
            pageNum: this.state.pageNum != this.props.questions.length ? this.state.pageNum + 1 : this.state.pageNum,
            prevAnswer: prevAnswer
        });
    }

    generatePlaylist(){
        console.log(this.state.targetCategories);
    }
    
    render(){
        if(!this.props.questions || this.props.questions.length == 0){
            return null;
        }
        const { pageNum } = this.state;
        const { questions } = this.props;
        const question = questions[pageNum - 1];
        const submitButton = <button onClick={this.generatePlaylist}>Create Playlist</button>;
        return (
            <div>
                <div className="question-container">
                    <div className="question-content">
                        <div className="question-text">{question.question}</div>
                        <div className="answers-container">
                            {question.answerOptions.map((answerOption, i) => {
                                return (
                                    <div className="answer-option-container" key={`answer-${i}`}>
                                        <div 
                                            className="answer-option" 
                                            onClick={() => this.handleInput(pageNum - 1, answerOption.answerValue)}
                                        >
                                            {answerOption.answerText}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {
                            (pageNum === this.props.questions.length) ? submitButton : (
                                <div className="page-num-indicator">
                                    {questions.map((question, i) => {
                                        const largeDot = pageNum === i + 1 ? 'large-dot' : '';
                                        return (
                                            <div className={`question-number-dot ${largeDot}`}></div>
                                        );
                                    })}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default QuestionsForm;