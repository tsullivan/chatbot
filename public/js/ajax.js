/* global $ */
function Ajax() {
  let lastText = '';
  function updateHistory(message, $container) {
    const html = window.messageFormatter(message);
    if (html) {
      const $html = $(`<div role="log">${html}</div>`);
      $container.prepend($html); // add to page

      const fadeTo = message.format === 'user' ? 0 : 1200;
      $html.fadeTo(0, 0); // make invisible
      $html.fadeTo(fadeTo, 1); // make visible
    }
  }

  const AJAX_OPTS = {
    method: 'post',
    contentType: 'application/json',
    url: './chat',
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
        success: response => callback(message, response)
      })
    );
  }

  function handleSubmit($userText, $history) {
    return e => {
      e.preventDefault();

      let messageText = $userText.val();
      if (messageText === '') {
        // prefill with last message, and stop
        messageText = lastText;
        $userText.val(messageText);
        return false;
      }

      sendMessage(messageText, 'user', (message, response) => {
        lastText = messageText;
        updateHistory(message, $history);
        $userText.val('');
        updateHistory(response, $history);
      });
    };
  }

  return {
    initAjax($userText, $history) {
      $('#chat').on('submit', handleSubmit($userText, $history));

      sendMessage('HELO', 'syn', (message, response) => {
        updateHistory(response, $history);
      });
    }
  };
}

window.Ajax = Ajax;
