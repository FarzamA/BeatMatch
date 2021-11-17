import React from 'react';

class QuestionsForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pageNum: 1,
            questions: this.props.questions,
            answers: new Array(this.props.questions.length),
            targetCategories: this.props.targetCategories
        };

        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.generatePlaylist = this.generatePlaylist.bind(this);
    }

    componentDidMount(){
        this.props.fetchQuestions();
        this.setState({ questions: this.props.questions });
    }

    handleInput(answerIndex, categoryValue){
        return () => {
            let answerTargetCategoryMap = this.state.targetCategories;
            answerTargetCategoryMap[this.props.questions[answerIndex].targetCategory] = categoryValue;
            this.setState({ 
                targetCategories: answerTargetCategoryMap,
                pageNum: this.state.pageNum != 6 ? this.state.pageNum + 1 : this.state.pageNum
            });
        }
    }

    generatePlaylist(){
        console.log(this.state.targetCategories);
    }

    prevPage(){
        const { pageNum } = this.state;
        this.setState({ pageNum: pageNum - 1});
    }

    nextPage(){
        const { pageNum } = this.state;
        this.setState({ pageNum: pageNum + 1});
    }
    
    render(){
        if(!this.props.questions || this.props.questions.length == 0){
            return null;
        }
        const { pageNum } = this.state;
        const { questions } = this.props;
        const question = questions[pageNum - 1];
        const disablePrev = pageNum === 1 ? 'disabled' : '';
        const disableNext = pageNum === 6 ? 'disabled' : '';
        const submitButton = pageNum === 6 ? <button onClick={this.generatePlaylist}>Create Playlist</button> : <></>;
        return (
            <div>
                
                <div>
                    <div>
                        <label>{question.question}<br/>
                            {question.answerOptions.map((answerOption, i) => {
                                return (
                                    <label key={`answer-${i}`}>{answerOption}
                                        <input name={question.question} type="radio" value={answerOption} checked={false} onChange={this.handleInput(pageNum - 1, i)} />
                                    </label>
                                );
                            })}
                        </label>
                    </div>
                </div>
                <button disabled={disablePrev} onClick={this.prevPage}>Prev</button>
                <button disabled={disableNext} onClick={this.nextPage}>Next</button>
                {submitButton}
                <div>{pageNum}</div>
            </div>
        );
    }
}

export default QuestionsForm;