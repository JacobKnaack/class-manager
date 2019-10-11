'use strict';

function handleSignIn() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const base64 = btoa(`${email}:${password}`);

  sendRequest(`${window.location.origin}/api/signin`, {
    method: "POST",
    headers: {
      'Authorization': `Basic ${base64}`,
    },
  }, () => {
    window.location.reload();
  });
}

function handleSignup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  sendRequest(`${window.location.origin}/api/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      email,
      password,
    },
  })
}

function handleLogout() {
  document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.location.reload();
};

