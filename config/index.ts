import * as configDevelopment from './development';
import * as configDocker from './docker';
import * as configProduction from './production';
import * as configTest from './test';

import { defaultsDeep } from 'lodash';

interface Config {
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

const configMap = {
  development: configDevelopment,
  docker: configDocker,
  production: configProduction,
  test: configTest,
};

function getEnvConfig(envString: string): Config {
  const envDependencies = [ 'SESSION_SECRET', 'APM_TOKEN', 'APM_URL', 'SLACK_BOT_TOKEN', 'NODE_ENV' ];

  for (const envDep of envDependencies) {
    if (!Boolean(process.env[envDep])) {
      throw new Error('Missing env dependency: ' + envDep);
    }
  }

  if (envString in configMap) {
    return defaultsDeep(baseConfig, configMap[envString]);
  } else {
    throw new Error('Invalid NODE_ENV'); // don't log it, might be weird
  }
}

export const { apm, env, port, sessionSecret, slack } = getEnvConfig(
  process.env.NODE_ENV,
);
