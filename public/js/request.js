'use strict';

function sendRequest(url, options, callback) {
  $.ajax({
    url: url,
    type: options.method || 'GET',
    data: options.data || null,
    headers: options.headers,
    success: callback,
    error: function (xhr, ajaxOptions, error) {
      console.error(xhr.status);
      console.error(error);
    },
  });
}
