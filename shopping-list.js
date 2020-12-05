function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

function onLoad() {
  // check if user is logged in.
  const loggedInUser = sessionStorage.getItem("loggedInUserName");
  if (!loggedInUser) window.location.href = "index.html";
}
