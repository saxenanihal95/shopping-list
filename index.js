const nameInput = document.getElementById('name')
nameInput.oninput = handleInput;
let inputValue = ''

// handleChange for name input
function handleInput(e) {
  inputValue = e.target.value;
}

// submit name to redirect to shopping list
function submitName() {
    window.location.href = "shopping-list.html"
}