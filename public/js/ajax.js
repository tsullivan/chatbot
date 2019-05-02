/* global $ */
function Ajax() {
  function prepareHistory($container) {
    $container.empty();
    $container.append(`<div id="history-user" aria-hidden="true"></div> <div id="history-bot" aria-live="polite"></div>`);
  }

  function updateHistory($container, ...messages) {
    prepareHistory($container);

    for (const message of messages) {
      const html = window.messageFormatter(message);
      if (html) {
        const $html = $(html);

        $userContainer = $container.find('#history-user');
        $botContainer = $container.find('#history-bot');

        if (message.format === 'user') {
          $userContainer.append($html); // add to page
        } else {
          $botContainer.append($html); // add to page
        }

        const fadeTo = message.format === 'user' ? 0 : 1200;
        $html.fadeTo(0, 0); // make invisible
        $html.fadeTo(fadeTo, 1); // make visible
      }
    }
  }

  const AJAX_OPTS = {
    method: 'post',
    contentType: 'application/json',
    url: './chat',
    dataType: 'json',
  };

  function sendMessage(messageText, messageFormat, callback) {
    const message = {
      format: messageFormat,
      message: messageText,
      time: Date.now(),
    };

    $.ajax(
      Object.assign({}, AJAX_OPTS, {
        data: JSON.stringify(message),
        success: response => callback(message, response),
      })
    );
  }

  function handleSubmit($userText, $history, historyRecaller) {
    return e => {
      e.preventDefault();

      let messageText = $userText.val();
      if (messageText === '') {
        // prefill with last message, and stop
        $userText.val(historyRecaller.getEarlierText());
        return false;
      } else {
        historyRecaller.addHistory(messageText);
      }

      sendMessage(messageText, 'user', (message, response) => {
        $userText.val('');
        updateHistory($history, message, response);
      });
    };
  }

  return {
    initAjax($userText, $history, historyRecaller) {
      $('#chat').on('submit', handleSubmit($userText, $history, historyRecaller));

      sendMessage('HELO', 'syn', (message, response) => {
        updateHistory($history, response);
      });
    },
  };
}

window.Ajax = Ajax;
