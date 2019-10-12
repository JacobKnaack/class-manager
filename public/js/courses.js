'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const authToken = getCookie('auth');
  console.log(authToken);
  sendRequest(
    `${window.location.origin}/api/courses`,
    {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    },
  );
});
