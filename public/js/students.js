'use strict';

window.addEventListener('DOMContentLoaded', () => {
  sendRequest(
    `${window.location.origin}/students`,
    { extended: true },
    console.log
  );
});
