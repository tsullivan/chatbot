/* global $ */
function Ajax() {

  function Scroller($container) {
    // http://jsfiddle.net/dotnetCarpenter/KpM5j/
    const el = $container.get(0);
    const { scrollHeight, clientHeight, scrollTop } = el;

    this.trackingBottom = scrollHeight - clientHeight <= scrollTop + 1;
    this.scroll = () => {
      if (this.trackingBottom) {
        const { scrollHeight, clientHeight } = el;
        el.scrollTop = scrollHeight - clientHeight;
      }
    };

    return this;
  }

  function updateHistory(message, $container) {
    const html = window.messageFormatter(message);
    if (html) {
      const scroller = new Scroller($container); // capture bottom tracking
      const $html = $(html);
      $container.append($html); // add to page
      $html.fadeTo(0, 0); // make invisible
      scroller.scroll(); // scroll down
      $html.fadeTo(1200, 1); // make visible
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
