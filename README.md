# radio-questions
I made 2 different solutions to this: 
- in form_submit.js The radio buttons are not set via react and on click of them react does not handle the click. Instead I use a form and on submit of the form get the values from the radio buttons
- in store_state.js In this example, React is handling the click events on the radio buttons and setting the value of the radio buttons. On click of radio buttons I update a state variable, questionIndexesAndAnswer. That state variable is used to determine which answers to set checked={true} for. 

# the challenge:
https://codepen.io/Tario/pen/eYeQrgp?editors=1111
1) Display all the questions and answers in the questions div.
Sample UI: https://upload.wikimedia.org/wikipedia/en/2/2f/Multiple_Choice_Questions.png
2) On 'Submit Answers' click, display the # of corrected answers in result div. (eg. 4/4)
3) Validate all questions have been answered.
