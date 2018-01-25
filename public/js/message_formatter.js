/* global $ */

window.messageFormatter = (() => {
  $.templates({
    user: (`
      <div class="panel panel-default">
        <div class="panel-body" style="text-align: right;">{{:message}}</div>
      </div>
    `),
    plain: (`
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h3 class="panel-title">{{:name}}, {{:time}}</h3>
        </div>
        <div class="panel-body">{{:message}}</div>
      </div>
    `)
  });

  const formatters = {
    user: message => $.render.user(message),
    plain: message => $.render.plain(message),
  };

  return message => {
    const formatter = formatters[message.format];
    if (formatter) {
      return formatter(message);
    }
  };
})();
