const matchWhitespace = /\s*\n\s*/g;

function strap(str: string) {
  return str.replace(matchWhitespace, ' ');
}

export function snl(strangs: TemplateStringsArray, ...values: Array<string | number>) {
  let result = strap(strangs[0]);
  const len = values.length;

  for (let i = 0; i < len; ++i) {
    result += values[i] + strap(strangs[i + 1]);
  }

  return result.trim();
}
