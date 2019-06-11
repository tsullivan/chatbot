/* global $ */

const AJAX_OPTS = {
  method: 'post',
  contentType: 'application/json',
  url: './chat',
  dataType: 'json',
};

class Ajaxer {
  constructor($userText, $history, $error, historyRecaller) {
    this.$userText = $userText;
    this.$history = $history;
    this.$error = $error;
    this.historyRecaller = historyRecaller;

    this.handleAjaxError = this.handleAjaxError.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateHistory = this.updateHistory.bind(this);

    $('#chat').on('submit', this.handleSubmit());

    this.sendMessage('HELO', 'syn', (message, response) => {
      this.updateHistory($history, response);
    });
  }

  prepareHistory($container) {
    const $fresh = $(
      `<div id="history-user" aria-hidden="true"></div> <div id="history-bot" aria-live="polite"></div>`
    );
    $container.empty();
    $container.append($fresh);
  }

  updateHistory($container, ...messages) {
    this.prepareHistory($container);

    for (const message of messages) {
      const html = window.messageFormatter(message);
      if (html) {
        const $html = $(html);
        const $userContainer = $container.find('#history-user');
        const $botContainer = $container.find('#history-bot');

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

  handleAjaxError(jqXHR, textStatus, errorThrown) {
    console.error(`${textStatus} ${errorThrown}`);

    const $alert = $(
      `<div class="alert alert-danger" role="alert">${textStatus}: ${errorThrown}</div>`
    );

    this.$error.empty(); // EVIL UGLY HACK
    this.$error.append($alert);
  }

  sendMessage(messageText, messageFormat, callback, callbackError) {
    const message = {
      format: messageFormat,
      message: messageText,
      time: Date.now(),
    };

    $.ajax(
      Object.assign({}, AJAX_OPTS, {
        data: JSON.stringify(message),
        success: response => callback(message, response),
        error: this.handleAjaxError,
      })
    );
  }

  handleSubmit() {
    return e => {
      e.preventDefault();

      let messageText = this.$userText.val();
      if (messageText === '') {
        // prefill with last message, and stop
        this.$userText.val(this.historyRecaller.getEarlierText());
        return false;
      } else {
        this.historyRecaller.addHistory(messageText);
      }

      this.sendMessage(messageText, 'user', (message, response) => {
        this.$userText.val('');
        this.updateHistory(this.$history, message, response);
      });
    };
  }
}

window.Ajaxer = Ajaxer;
