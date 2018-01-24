/* global $ */

function updateHistory(message, $container) {
  const html = window.messageFormatter(message);
  $container.prepend(html);
}

const AJAX_OPTS = {
  method: 'post',
  contentType: 'application/json',
  url: '/chat',
  dataType: 'json'
};

function handleSubmit($userText, $history) {
  return e => {
    e.preventDefault();

    const messageText = $userText.val();
    if (messageText === '') {
      return false;
    }

    const message = {
      format: 'user',
      message: messageText,
      time: Date.now(),
    };
    updateHistory(message, $history);

    $.ajax(
      Object.assign({}, AJAX_OPTS, {
        data: JSON.stringify(message),
        success: response => {
          $userText.val('');
          updateHistory(response, $history);
        }
      })
    );
  };
}

$(document).ready(() => {
  const $userText = $('#userText');
  const $history = $('#history');
  $('#chat').on('submit', handleSubmit($userText, $history));
  $userText.focus();
});
