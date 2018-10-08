/* global $ */

window.messageFormatter = (() => {
  const md = window.markdownit();

  $.templates({
    user: `<p class="userMessageBody" data-template-type="user">{{>message}}</p>`,
    plain: `
      <div class="messageBody messagePlain" data-template-type="plain">
        <p>{{>message}}</p>
      </div>`,
    markdown: `<div class=" messageBody messageMarkdown" data-template-type="markdown">
        {{:message}}
      </div>`,
  });

  const formatters = {
    user: message => $.render.user(message),
    plain: message => $.render.plain(message),
    help: message => $.render.help(message),
    markdown: message =>
      $.render.markdown({
        format: message.format,
        message: md.render(message.message),
      }),
  };

  return message => {
    const formatter = formatters[message.format];
    if (formatter) {
      return formatter(message);
    }
  };
})();
