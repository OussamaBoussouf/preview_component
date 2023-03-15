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

/*-------------- function --------------*/

function validateInputs(e) {
  allInputs.forEach(function (input) {
    if (input.value.length === 0) {
      e.preventDefault();
      deleteErrorMessage(input);
      const message = `${input.placeholder} cannot be empty`;
      createErrorMessage(input, message);
    } else if (input.value.length !== 0) {
      if (input.id === "firstName" || input.id === "lastName") {
        const regex = /[^a-zA-Z0-9]/;
        hasWrongStructureName(regex, input, e);
      }
      if (input.id === "password") {
        const regex = /[!-/:-@[-`{-~]/;
        hasWrongStructurePassword(regex, input, e);
      }
      if (input.id === "email") {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        hasWrongStructureEmail(regex, input, e);
      }
    }
  });
}

function hasWrongStructureName(regex, input, e) {
  const content = input.value;
  if (regex.test(content)) {
    e.preventDefault();
    backToNormalState(input);
    const message = `${input.placeholder} cannot contain special character`;
    createErrorMessage(input, message);
  } else backToNormalState(input);
}

function hasWrongStructurePassword(regex, input, e) {
  const content = input.value;
  if (input.value.length < 6) {
    e.preventDefault();
    backToNormalState(input);
    const message = `Password cannot be less than 6 characters`;
    createErrorMessage(input, message);
  } else if (!regex.test(content)) {
    e.preventDefault();
    const message = `Password should contain at least one special character`;
    createErrorMessage(input, message);
  } else backToNormalState(input);
}

function hasWrongStructureEmail(regex, input, e) {
  const content = input.value;
  if (!regex.test(content)) {
    e.preventDefault();
    backToNormalState(input);
    const message = `Looks like this is not an email`;
    createErrorMessage(input, message);
  } else backToNormalState(input);
}

function createErrorMessage(ele, errorMessage) {
  //select the parent div of the input
  const errorDiv = ele.parentElement;
  errorDiv.dataset.error = "true";
  //create the error div
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
