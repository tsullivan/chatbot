/* global $ */

window.messageFormatter = (() => {
  $.templates({
    user: `
      <div class="panel panel-default">
        <div class="panel-body userMessageBody">
          <span class="messageName">You:</span>
          <div class="messageBody">{{>message}}</div>
      </div>
    `,
    help: `
      <div class="panel panel-default">
        <div class="panel-body">
          <span class="messageName">Keyword help:</span>
          <div class="messageBody">{{>message}}</div>
        </div>
      </div>
    `,
    plain: `
      <div class="panel panel-primary">
        <div class="panel-body">
          <span class="messageName">{{>name}}:</span>
          <div class="messageBody">{{>message}}</div>
        </div>
      </div>
    `
  });

  const formatters = {
    user: message => $.render.user(message),
    plain: message => $.render.plain(message),
    help: message => $.render.help(message)
  };

  return message => {
    const formatter = formatters[message.format];
    if (formatter) {
      return formatter(message);
    }
  };
})();
