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
  };
  port: number;
}

function getEnvConfig(envString: string): IConfig {
  const envDependencies = [
    'SESSION_SECRET',
    'SLACK_BOT_TOKEN',
    'SLACK_BOT_TOKEN',
  ];

  for (const envDep of envDependencies) {
    if (!Boolean(process.env[envDep])) {
      throw new Error('missing env dependency: ' + envDep);
    }
  }

  switch (envString) {
    case 'docker':
    case 'production':
    case 'test':
      return require(`./${envString}`);
    default:
      return require(`./development`);
  }
}

export const port = 8080;
export const { env, session_secret, apm, slack } = getEnvConfig(process.env.NODE_ENV);
