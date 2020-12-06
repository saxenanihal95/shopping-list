function redirectToShoppingList() {
  window.location.href = "shopping-list.html";
}

function onLoad() {
  const loggedInUser = sessionStorage.getItem("loggedInUserName");
  if (loggedInUser) redirectToShoppingList();
}

const nameInput = document.getElementById("name");
nameInput.oninput = handleInput;
let inputValue = "";

// handleChange for name input
function handleInput(e) {
  inputValue = e.target.value;
}

// submit name to redirect to shopping list
function submitName() {
  if (!inputValue) return null;

  // get existing user from localStorage
  const existingUser = JSON.parse(localStorage.getItem(inputValue));

  // user is not present add user
  if (!existingUser) {
    localStorage.setItem(inputValue, JSON.stringify([]));
  }

  sessionStorage.setItem("loggedInUserName", inputValue);

  nameInput.value = "";

  redirectToShoppingList();
}
