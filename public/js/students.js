'use strict';

window.addEventListener('DOMContentLoaded', () => {
  sendRequest(
    `${window.location.origin}/students`,
    {},
    console.log
  );
});
