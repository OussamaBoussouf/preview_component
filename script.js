const allInputs = document.querySelectorAll("input");
const form = document.getElementById("form");

/*--------- Event Listener -----------*/
form.addEventListener("submit", (e) => {
  validateInputs(e);
});

allInputs.forEach((inputField) => {
  inputField.addEventListener("input", (e) => {
    backToNormalState(e.target);
  });
});

/*-------------- main function --------------*/

function validateInputs(e) {
  allInputs.forEach(function (input) {
    if (input.value.length === 0) {
      e.preventDefault();
      deleteErrorMessage(input);
      const message = `${input.placeholder} cannot be empty`;
      createErrorMessage(input, message);
    } else {
      if (input.id === "firstName" || input.id === "lastName") {
        const regex = /[^a-zA-Z0-9]/;
        checkFirstAndLastName(regex, input, e);
      }
      if (input.id === "password") {
        const regex = /[!-/:-@[-`{-~]/;
        checkPassword(regex, input, e);
      }
      if (input.id === "email") {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        checkEmail(regex, input, e);
      }
    }
  });
}

/*------------- helper function ----------*/

function checkFirstAndLastName(regex, input, e) {
  const content = input.value;
  if (regex.test(content)) {
    const message = `${input.placeholder} cannot contain special character`;
    getError(input, message, e);
  } else backToNormalState(input);
}

function checkPassword(regex, input, e) {
  const content = input.value;
  if (input.value.length < 6) {
    const message = `Password cannot be less than 6 characters`;
    getError(input, message, e);
  } else if (!regex.test(content)) {
    const message = `Password should contain at least one special character`;
    getError(input, message, e);
  } else backToNormalState(input);
}

function checkEmail(regex, input, e) {
  const content = input.value;
  if (!regex.test(content)) {
    const message = `Looks like this is not an email`;
    getError(input, message, e);
  } else backToNormalState(input);
}

function getError(input, errorMessage, e) {
  e.preventDefault();
  backToNormalState(input);
  createErrorMessage(input, errorMessage);
}

function createErrorMessage(ele, errorMessage) {
  const errorDiv = ele.parentElement;
  errorDiv.dataset.error = "true";
  const div = document.createElement("div");
  div.classList.add("error");
  div.innerText = errorMessage;
  errorDiv.append(div);
}

function backToNormalState(inputField) {
  const errorDiv = inputField.parentElement;
  if (errorDiv.dataset.error) {
    deleteErrorMessage(inputField, errorDiv);
    delete errorDiv.dataset.error;
  }
}

function deleteErrorMessage(inputField) {
  const errorDiv = inputField.parentElement;
  const errorDivMessage = inputField.nextElementSibling;
  if (errorDiv.dataset.error) errorDivMessage.remove();
}
