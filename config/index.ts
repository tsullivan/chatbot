interface IConfig {
  env: string;
  session_secret: string;
  apm: {
    serviceName: string;
    active: boolean;
  };
}

function getEnvConfig(envString: string): IConfig {
  switch (envString) {
    case 'docker':
    case 'production':
    case 'test':
      return require(`./${envString}`);
    default:
      return require(`./development`);
  }
}

export const { env, session_secret, apm } = getEnvConfig(process.env.NODE_ENV);
