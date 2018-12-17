interface IConfig {
  env: string;
  session_secret: string;
  apm: {
    serviceName: string;
    active: boolean;
  };
  slack: {
    name: string;
    token: string;
    hangoutRoom: string;
  };
  port: number;
}

const baseConfig = {
  port: 8080,
};

function getEnvConfig(envString: string): IConfig {
  const envDependencies = ['SESSION_SECRET', 'SLACK_BOT_NAME', 'SLACK_BOT_TOKEN'];

  for (const envDep of envDependencies) {
    if (!Boolean(process.env[envDep])) {
      throw new Error('missing env dependency: ' + envDep);
    }
  }

  switch (envString) {
    case 'docker':
    case 'production':
    case 'test':
      return {
        ...baseConfig,
        ...require(`./${envString}`),
      };
    default:
      return {
        ...baseConfig,
        ...require(`./development`),
      };
  }
}

export const { apm, env, port, session_secret, slack } = getEnvConfig(
  process.env.NODE_ENV
);
