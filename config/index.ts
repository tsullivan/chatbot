import { defaultsDeep } from 'lodash';

interface IConfig {
  env: string;
  sessionSecret: string;
  apm: {
    serviceName: string;
    active: boolean;
  };
  slack: {
    token: string;
  };
  port: number;
}

const baseConfig = {
  port: 8080,
};

function getEnvConfig(envString: string): IConfig {
  const envDependencies = [
    'SESSION_SECRET',
    'APM_TOKEN',
    'SLACK_BOT_TOKEN',
    'NODE_ENV',
  ];

  for (const envDep of envDependencies) {
    if (!Boolean(process.env[envDep])) {
      throw new Error('Missing env dependency: ' + envDep);
    }
  }

  switch (envString) {
    case 'docker':
    case 'production':
    case 'test':
    case 'development':
      return defaultsDeep(baseConfig, require(`./${envString}`));
    default:
      throw new Error('Invalid NODE_ENV'); // don't log it, might be weird
  }
}

export const { apm, env, port, sessionSecret, slack } = getEnvConfig(
  process.env.NODE_ENV,
);
