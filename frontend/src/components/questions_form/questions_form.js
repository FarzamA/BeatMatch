import React from 'react';

class QuestionsForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            questions: this.props.questions,
            answers: new Array(this.props.questions.length)
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.props.fetchQuestions();
        this.setState({ questions: this.props.questions });
    }

    handleInput(answerIndex){
        return (e) => {
            let answersArray = [...this.state.answers];
            answersArray[answerIndex] = e.target.value;

            this.setState({ answers: answersArray });
        }
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state);
    }
    
    render(){
        if(!this.props.questions){
            return null;
        }
        return (
            <form onSubmit={this.handleSubmit}>
                {this.props.questions.map((question, i) => {
                    return (
                        <div key={`question-${i}`}>
                            <label>{question.question}<br/>
                                {question.answerOptions.map((answerOption, j) => {
                                    return (
                                        <label key={`answer-${j}`}>{answerOption}
                                            <input name={question.question} type="radio" value={answerOption} onChange={this.handleInput(i)} />
                                        </label>
                                    );
                                })}
                            </label>
                        </div>
                    );
                })}
                <input type="submit" value="Create Playlist"/>
            </form>
        );
    }
}

export default QuestionsForm;