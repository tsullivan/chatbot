function getEnvConfig(env) {
  switch (env) {
    case 'production':
    case 'test':
      return require(`./${env}`);
    default:
      return require(`./development`);
  }
}

module.exports = getEnvConfig(process.env.NODE_ENV);
