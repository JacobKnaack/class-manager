'use strict';

function sendRequest(url, options, callback) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: options.method || 'GET',
      data: options.body || null,
      headers: options.headers || {},
      success: function(res) {
        !!callback ? resolve(callback(res)) : resolve(res);
      },
      error: function (xhr, ajaxOptions, error) {
        console.error(xhr.status);
        console.error(error);
        reject(error);
      },
      complete: function(xhr, status) {
        console.log(xhr.getAllResponseHeaders(), status);
      },
    });
  });
}
