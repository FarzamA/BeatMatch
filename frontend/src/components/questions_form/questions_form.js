import React from 'react';

class QuestionsForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            questions: this.props.questions
        };
    }

    componentDidMount(){
        this.props.fetchQuestions();
    }

    handleSubmit(){
        e.preventDefault();

        console.log()
    }
    
    render(){
        console.log(this.props.questions)
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
                                            <input type="radio" value={answerOption} />
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