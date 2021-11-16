import React from 'react';

class QuestionsForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            questions: this.props.questions,
            answers: new Array(this.props.questions.length)
        };

        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount(){
        this.props.fetchQuestions();
        this.setState({ questions: this.props.questions });
    }

    handleInput(answerIndex){

        return (e) => {
            console.log(answerIndex);
            console.log(e.target.value);
        }
        
    }

    handleSubmit(e){
        e.preventDefault();
    }
    
    render(){
        console.log(this.state);
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
                                            <input name={question.question} type="radio" value={answerOption} onChange={this.handleInput(j)} />
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