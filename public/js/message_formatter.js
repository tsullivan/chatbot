/* global $ */

window.messageFormatter = (() => {
  $.templates({
    user: (`
      <p>➥ {{:message}}</p>
    `),
    plain: (`
      <blockquote>
        <p>{{:message}}</p>
        <footer>{{:name}}, {{:time}}</footer>
      </blockquote>
    `)
  });

  const formatters = {
    user: message => $.render.user(message),
    plain: message => $.render.plain(message),
  };

  return message => {
    const formatter = formatters[message.format];
    return formatter(message);
  };
})();
