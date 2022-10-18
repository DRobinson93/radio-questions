import React, { useState } from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

function Question({ data, index, handleAnswerSelected, selectedAnswer }) {
    const answersHtml = Object.keys(data.answers).map(answerValue => {
        return (
            <>  
                <input 
                    checked={selectedAnswer === answerValue}
                    onChange={(e) => handleAnswerSelected(index, e.target.value)} 
                    value={answerValue}
                    type="radio"
                /> 
                {data.answers[answerValue]} 
                <br/>
            </>
        );
    });
    return (
        <li key={`question_${index}`}>
            {data.question}
            <div>
                {answersHtml}
            </div>
        </li>
    )
}

const QuizApp = () => {
    const [questionIndexesAndAnswer, setQuestionIndexesAndAnswer] = useState({});
    const [formFullySubmitted, setFormFullySubmitted] = useState(false);
    const [numOfCorrectAnswers, setNumOfCorrectAnswers] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const jsQuestions = [
        {
            question: "Inside which HTML element do we put the JavaScript?",
            answers: {
                a: "<scripting>",
                b: "<javascript>",
                c: "<script>"
            },
            correctAnswer: "c"
        },
        {
            question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
            answers: {
                a: "<script href='abc.js'>",
                b: "<script name='abc.js'>",
                c: "<script src='abc.js'>"
            },
            correctAnswer: "c"
        },
        {
            question: "How do you write 'Hello World' in an alert box?",
            answers: {
                a: "msgBox('Hello World')",
                b: "alert('Hello World')",
                c: "msg('Hello World')",
                d: "alertBox('Hello World')"
            },
            correctAnswer: "b"
        },
        {
            question: "How do you declare a JavaScript variable?",
            answers: {
                a: "var myValue",
                b: "v myValue",
                c: "variable myValue",
                d: "String muValue"
            },
            correctAnswer: "a"
        }
    ];

    const handleAnswerSelected = (questionIndex, answerValue) => {
        //update the val of questionIndexesAndAnswer
        const questionIndexesAndAnswerCopy = {...questionIndexesAndAnswer};
        questionIndexesAndAnswerCopy[questionIndex] = answerValue;
        setQuestionIndexesAndAnswer(questionIndexesAndAnswerCopy);
    }

    const questionsHtml = jsQuestions.map(function (questionData, questionIndex) {
        return <Question 
                selectedAnswer={questionIndexesAndAnswer[questionIndex] || null} 
                handleAnswerSelected={handleAnswerSelected} 
                data={questionData} 
                index={questionIndex}
            />;
    })

    const numOfQuestions = Object.keys(jsQuestions).length;

    function handleSubmit() {
        //make sure all are filled out
        const numOfQuestionsAnswered = Object.keys(questionIndexesAndAnswer).length;
        if (numOfQuestions > numOfQuestionsAnswered) {
            setErrorMsg('Please select an answer for each question.')
            return;
        }

        //clear error message after user has passed validation
        setErrorMsg('');

        //determine the num of correct answers
        const numCorrect = Object.keys(questionIndexesAndAnswer).reduce(
            (previousValue, questionIndex) => {
                const correctAnswer = jsQuestions[questionIndex]['correctAnswer'];
                const submittedAnswer = questionIndexesAndAnswer[questionIndex]
                const answerIsCorrect = correctAnswer === submittedAnswer;
                return previousValue + (answerIsCorrect ? 1 : 0);
            }, 0);


        setNumOfCorrectAnswers(numCorrect);
        setFormFullySubmitted(true)
    }

    return (
        <div>
            <div id="questions">
                <ol>
                    {questionsHtml}
                </ol>
            </div>
            <button type="button" onClick={handleSubmit} id="submit">Submit Answers</button>
            {errorMsg !== '' && 
                <div>
                    {errorMsg}
                </div>
            }
            <div id="results">
                {formFullySubmitted &&
                    <div>
                        Result: {numOfCorrectAnswers}/{numOfQuestions} answers correct
                    </div>
                }
            </div>
        </div>
    );
}


ReactDOM.render(<QuizApp />, document.getElementById("root"))