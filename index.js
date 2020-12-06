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

  // get list of users from localStorage
  const users = JSON.parse(localStorage.getItem("users"));

  // if users key is present in localStore create key and add user
  if (!users) {
    const users = [{ name: inputValue, list: [] }];
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    const existingUser = users.find(({ name }) => name === inputValue);
    // user is not present add to users list
    if (!existingUser) {
      users.push({ name: inputValue, list: [] });
      localStorage.setItem("users", JSON.stringify(users));
    }
  }

  sessionStorage.setItem("loggedInUserName", inputValue);

  nameInput.value = "";

  redirectToShoppingList();
}
