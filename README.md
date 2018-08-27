

# Trilogy Quiz App


---


### Libraries
- [React Router](https://reacttraining.com/react-router/web)
- [React Materialize](https://react-materialize.github.io/)


---


### Sitemap of components:

- App
  - Home (FSC)
  - Question
    - Radios (FSC)
    - Checkboxes (FSC)
    - Dropdowns
    - Text areas (FSC)
  - Final Score (FSC)
  - No Match (FSC)


---


### What is the App component responsible for?

- Fetching the question data
- Keeping track of which question the user is currently on
- The score
- Preventing the user from navigating ahead/back
- Ensuring that user provided an answer  
- Checking user's answer
- Updating the score
- Navigating user to next question
- Alerting user if their answer was wrong/correct


---


### What is the Question component responsible for?

- Displays the correct form type (checkbox, radio, etc.) based on the current question
- Keeps track of user's selected answer
- Generates the text of button
  - "Begin", "Next", or "Finish"
- Generates link where button will take you
  - i.e. "/question/2"
- Handling change in each form type
- After user submits answer, resets `userAnswer` & navigates you to next question


---


### How do I prevent manual navigation?
If the user manually types "/question/3" into the URL, I compare the number question they are trying to navigate to (3) with `currentQuestion`.

- If it matches, allow them to stay on that page
- If no, redirect them to the question they should be on


---


### The form

The form components (text area, radios, etc.)

- User selects (or types) answer
- `Question` handles changes in individual functions for each form type
- Each one makes sure the user's answer is in the correct format to be compared to the actual answer  
- Then updates `userAnswer`


---


### How does the MySelect component work?

- As user selects options:
  - The dropdown updates to reflect the chosen answer (`MySelect` keeps track of this)
  - `userAnswer` is lifted to the `Question` component
- When user submits answer, user's answer is compared against actual answer
    - In the case of the checkboxes array, the comparison is a shallow one, but good enough for the moment!

---


### How does the Checkboxes component work?

- Instead of updating `userAnswer`, checkboxes updates `userSelectionArr` instead.
  - Checkboxes are the only form type in this quiz where the user can select multiple answers, so we store it in an array.
- Compare this array to the answer, which looks like this: `[ 0, 1 ]`







---


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
