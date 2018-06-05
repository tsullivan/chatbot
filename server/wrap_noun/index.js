function definitive(fn) {
  return () => `Definitely a ${fn()}!`;
}
function neutral(fn) {
  return () => `Probably a ${fn()}.`;
}
function umm(fn) {
  return () => `Ummm... a ${fn()}?`;
}

module.exports = {
  definitive,
  neutral,
  umm,
};
