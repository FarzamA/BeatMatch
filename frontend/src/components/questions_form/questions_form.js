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
    
    render(){
        if(!this.props.questions){
            return null;
        }
        return (
            <div>
                {this.props.questions.map((question, i) => {
                    return <div key={i}>{question.question}</div>;
                })}
            </div>
        );
    }
}

export default QuestionsForm;