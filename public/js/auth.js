'use strict';

document.getElementById("login-form").addEventListener("submit", function(event){
  event.preventDefault()
});

function handleSignIn() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const base64 = btoa(`${username}:${password}`);

  sendRequest(`${window.location.origin}/students`, {
    method: "POST",
    // extended:  true,
    headers: {
      'Authorization': `Basic ${base64}`,
    },
  }, console.log);
}
