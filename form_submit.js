import React, { useState } from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

function Answer({ name, val, display, questionIndex }) {
    const id = `question_${questionIndex}_answer_${val}`;
    return (
        <div key={id}>
            <input type="radio" id={id} name={name} value={val} />
            <label for={id}>{display}</label><br />
        </div>
    )
}

function Question({ data, index }) {
    const answersHtml = Object.keys(data.answers).map(answerValue => {
        const answerDisplay = data.answers[answerValue];
        const name = index;//name should be question index so on form submit the data is in format {questionIndex:questionAnswer}
        return <Answer questionIndex={index} name={name} val={answerValue} display={answerDisplay} />;
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

    const questionsHtml = jsQuestions.map(function (questionData, questionIndex) {
        return <Question data={questionData} index={questionIndex} />;
    })

    const numOfQuestions = Object.keys(jsQuestions).length;

    function handleFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const submittedQuestionIndexesAndAnswer = Object.fromEntries(formData);

        //make sure all are filled out
        const numOfQuestionsAnswered = Object.keys(submittedQuestionIndexesAndAnswer).length;
        if (numOfQuestions > numOfQuestionsAnswered) {
            setErrorMsg('Please select an answer for each question.')
            return;
        }

        //clear error message after user has passed validation
        setErrorMsg('');

        //determine the num of correct answers
        const numCorrect = Object.keys(submittedQuestionIndexesAndAnswer).reduce(
            (previousValue, questionIndex) => {
                const correctAnswer = jsQuestions[questionIndex]['correctAnswer'];
                const submittedAnswer = submittedQuestionIndexesAndAnswer[questionIndex]
                const answerIsCorrect = correctAnswer === submittedAnswer;
                return previousValue + (answerIsCorrect ? 1 : 0);
            }, 0);


        setNumOfCorrectAnswers(numCorrect);
        setFormFullySubmitted(true)
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div id="questions">
                <ol>
                    {questionsHtml}
                </ol>
            </div>
            <button type="submit" id="submit">Submit Answers</button>
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
        </form>
    );
}


ReactDOM.render(<QuizApp />, document.getElementById("root"))