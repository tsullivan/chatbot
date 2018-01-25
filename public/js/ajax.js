/* global $ */

function updateHistory(message, $container) {
  const html = window.messageFormatter(message);
  if (html) {
    $container.prepend(html);
  }
}

const AJAX_OPTS = {
  method: 'post',
  contentType: 'application/json',
  url: '/chat',
  dataType: 'json'
};

function sendMessage(messageText, messageFormat, callback) {
  const message = {
    format: messageFormat,
    message: messageText,
    time: Date.now()
  };

  $.ajax(
    Object.assign({}, AJAX_OPTS, {
      data: JSON.stringify(message),
      success: (response) => callback(message, response)
    })
  );
}

function handleSubmit($userText, $history) {
  return e => {
    e.preventDefault();

    const messageText = $userText.val();
    if (messageText === '') {
      return false;
    }

    sendMessage(messageText, 'user', (message, response) => {
      updateHistory(message, $history);
      $userText.val('');
      updateHistory(response, $history);
    });
  };
}

$(document).ready(() => {
  const $userText = $('#userText');
  const $history = $('#history');
  $('#chat').on('submit', handleSubmit($userText, $history));

  sendMessage('HELO', 'syn', (message, response) => {
    updateHistory(response, $history);
  });

  $userText.focus();
});
