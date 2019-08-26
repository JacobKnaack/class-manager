'use strict';

function fetch(url, options) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      return options.extended ? JSON.parse(this.responseText) : this.responseText;
    }
  }
  const method = options.method || 'GET';
  xhttp.open(method, url, true);
  xhttp.send;
}

function studentList() {
  const students = fetch(`${window.location.origin}/students`, { extended: true });
  console.log(students);
}

window.addEventListener('DOMContentLoaded', () => {
  studentList();
})