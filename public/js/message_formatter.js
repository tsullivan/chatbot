/* global $ */

window.messageFormatter = (() => {
  $.templates({
    user: `<p class="userMessageBody">{{>message}}</p>`,
    help: `
      <blockquote>
        <p class="messageBody">{{>message}}</p>
      </blockquote>
    `,
    plain: `
      <blockquote>
        <p class="messageBody">{{>message}}</p>
      </blockquote>
    `,
  });

  const formatters = {
    user: message => $.render.user(message),
    plain: message => $.render.plain(message),
    help: message => $.render.help(message),
  };

  return message => {
    const formatter = formatters[message.format];
    if (formatter) {
      return formatter(message);
    }
  };
})();
