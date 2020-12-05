const nameInput = document.getElementById('name')
nameInput.oninput = handleInput;
let inputValue = ''

// handleChange for name input
function handleInput(e) {
  inputValue = e.target.value;
}

// submit name to redirect to shopping list
function submitName() {
  // get list of users from localStorage
  const users = JSON.parse(localStorage.getItem("users"));

  // if users key is present in localStore create key and add user
  if (!users) {
    const users = [{ name: inputValue, list: [] }];
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    const existingUser = users.find(({ name }) => name === inputValue);
    console.log(existingUser, users);
    if (!existingUser) {
        users.push({ name: inputValue, list: [] });
        localStorage.setItem("users", JSON.stringify(users))
    }
  }

  nameInput.value=""

  window.location.href = "shopping-list.html";
}
