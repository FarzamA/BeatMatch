import React from 'react';

class QuestionsForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pageNum: 1,
            prevBgColor: '#131316',
            prevTextColor: 'white',
            bgColors: ['#ff60b8', '#1a71eb', '#fffa69', '#ed3747', '#ed3747', '#b81d45', '#b81d45', '#d6dd21', '#7dcdef', '#7dcdef', '#7dcdef', '#4cc141'],
            textColors: ['#b81d45', '#ff6783', '#ff6783', '#ff60b8', '#4cc141', '#d6dd21', '#672d91', '#0d4215', '#fffa69', '#ed3747', '#1a71eb', '#531754'],
            questions: this.props.questions,
            answers: new Array(this.props.questions.length),
            targetCategories: this.props.targetCategories
        };

        this.handleInput = this.handleInput.bind(this);
        this.generatePlaylist = this.generatePlaylist.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
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

    handleInput(e, answerIndex, answerValue){
        const body = document.querySelector('body');
        const answers = document.querySelectorAll('.answer-option-container');
        const dots = document.querySelectorAll('.question-number-dot');
        const randomIndex = Math.floor(Math.random() * this.state.bgColors.length);
        const bgColor = this.state.bgColors[randomIndex];
        const textColor = this.state.textColors[randomIndex];

        answers.forEach(answer => {
            if(e.target.innerText == answer.innerText){
                answer.classList.add('choosen-answer');
            }else{
                answer.classList.add('other-answer');
            }
        });

        // css variables
        body.style.setProperty('--prev-bg-color', this.state.prevBgColor);
        body.style.setProperty('--prev-text-color', this.state.prevTextColor);
        body.style.setProperty('--bg-color', bgColor);
        body.style.setProperty('--text-color', textColor);

        body.classList.remove('first-answer');
        if(body.classList.contains('following-answer-1')){
            body.classList.remove('following-answer-1');
            body.classList.add('following-answer-2');
        }else if(body.classList.contains('following-answer-2')){
            body.classList.remove('following-answer-2');
            body.classList.add('following-answer-1');
        }else{
            body.classList.add('following-answer-1');
        }
        body.style.backgroundColor = bgColor;
        dots.forEach(dot => {
            dot.style.backgroundColor = textColor;
        });
        
        const prevBgColor = bgColor;
        const prevTextColor = textColor;
        let answerTargetCategoryMap = this.state.targetCategories;
        answerTargetCategoryMap[this.props.questions[answerIndex].targetCategory] = answerValue;

        setTimeout(() => {
            answers.forEach(answer => {
                answer.classList.remove('choosen-answer');
                answer.classList.remove('other-answer');
            });
            this.setState({ 
                targetCategories: answerTargetCategoryMap,
                pageNum: this.state.pageNum <= this.props.questions.length ? this.state.pageNum + 1 : this.state.pageNum,
                prevBgColor: prevBgColor,
                prevTextColor: prevTextColor
            });
        }, 1500);
    }

    handleMouseEnter(){
        const body = document.querySelector('body');
        const dots = document.querySelectorAll('.question-number-dot');
        const randomIndex = Math.floor(Math.random() * this.state.bgColors.length);
        const bgColor = this.state.bgColors[randomIndex];
        const textColor = this.state.textColors[randomIndex];

        // css variables
        body.style.setProperty('--prev-bg-color', this.state.prevBgColor);
        body.style.setProperty('--prev-text-color', this.state.prevTextColor);
        body.style.setProperty('--bg-color', bgColor);
        body.style.setProperty('--text-color', textColor);

        body.classList.remove('first-answer');
        if(body.classList.contains('following-answer-1')){
            body.classList.remove('following-answer-1');
            body.classList.add('following-answer-2');
        }else if(body.classList.contains('following-answer-2')){
            body.classList.remove('following-answer-2');
            body.classList.add('following-answer-1');
        }else{
            body.classList.add('following-answer-1');
        }
        body.style.backgroundColor = bgColor;
        dots.forEach(dot => {
            dot.style.backgroundColor = textColor;
        });
        
        const prevBgColor = bgColor;
        const prevTextColor = textColor;
        this.setState({
            prevBgColor: prevBgColor,
            prevTextColor: prevTextColor
        });
    }

    handleMouseLeave(){
        const body = document.querySelector('body');
        const dots = document.querySelectorAll('.question-number-dot');
        const bgColor = '#131316';
        const textColor = 'white';

        // css variables
        body.style.setProperty('--prev-bg-color', this.state.prevBgColor);
        body.style.setProperty('--prev-text-color', this.state.prevTextColor);
        body.style.setProperty('--bg-color', bgColor);
        body.style.setProperty('--text-color', textColor);

        body.classList.remove('first-answer');
        if(body.classList.contains('following-answer-1')){
            body.classList.remove('following-answer-1');
            body.classList.add('following-answer-2');
        }else if(body.classList.contains('following-answer-2')){
            body.classList.remove('following-answer-2');
            body.classList.add('following-answer-1');
        }else{
            body.classList.add('following-answer-1');
        }
        body.style.backgroundColor = bgColor;
        dots.forEach(dot => {
            dot.style.backgroundColor = textColor;
        });
        
        const prevBgColor = bgColor;
        const prevTextColor = textColor;
        this.setState({
            prevBgColor: prevBgColor,
            prevTextColor: prevTextColor
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
        const submitButton = <button className="questions-submit-button button-grow" onClick={this.generatePlaylist}>Create Playlist</button>;
        const questionsContent = pageNum <= this.props.questions.length ? (
                    <div className="question-content">
                        <div className="question-text">{question.question}</div>
                        <div className="answers-container">
                            {question.answerOptions.map((answerOption, i) => {
                                return (
                                    <div className="answer-option-container" onClick={(e) => this.handleInput(e, pageNum - 1, answerOption.answerValue)} key={`answer-${i}`}>
                                        <div 
                                            className="answer-option" 
                                            onMouseEnter={this.handleMouseEnter}
                                            onMouseLeave={this.handleMouseLeave}
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
        return (
            <div>
                <div className="question-container">
                    {pageNum > this.props.questions.length ? submitButton : questionsContent}
                </div>
            </div>
        );
    }
}

export default QuestionsForm;