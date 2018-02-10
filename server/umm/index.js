function umm(fn) {
  return () => `Ummm... ${fn()}?`;
}

module.exports = { umm };
