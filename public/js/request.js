'use strict';

function sendRequest(url, options, callback) {
  // console.log(url, options);
  // const xhttp = new XMLHttpRequest();
  //
  // const method = options.method || 'GET';
  // xhttp.open(method, url, true);
  // if (!!options.headers) Object.keys(options.headers)
  //   .forEach(function(header) {
  //     xhttp.setRequestHeader(header, options.headers[header]);
  //   });
  // xhttp.send;
  // xhttp.onreadystatechange = function () {
  //   if (this.readyState == 4 && this.status == 200) {
  //     return options.extended
  //       ? callback(JSON.parse(this.responseText))
  //       : callback(this.responseText);
  //   } else if (this.readyState == 4 && this.status == 404) {
  //     console.log(this.responseText);
  //   }
  // };
  fetch(url, options)
    .then(res => res.json)
    .then(data => callback(data))
}
