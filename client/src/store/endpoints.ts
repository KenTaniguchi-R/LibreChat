import { atom, selector } from 'recoil';
import { TEndpointsConfig, EModelEndpoint } from 'librechat-data-provider';

const defaultConfig: TEndpointsConfig = {
  [EModelEndpoint.azureOpenAI]: null,
  [EModelEndpoint.assistant]: null,
  [EModelEndpoint.openAI]: null,
  [EModelEndpoint.bingAI]: null,
  [EModelEndpoint.chatGPTBrowser]: null,
  [EModelEndpoint.gptPlugins]: null,
  [EModelEndpoint.google]: null,
  [EModelEndpoint.anthropic]: null,
};

const endpointsConfig = atom<TEndpointsConfig>({
  key: 'endpointsConfig',
  default: defaultConfig,
});

const endpointsQueryEnabled = atom<boolean>({
  key: 'endpointsQueryEnabled',
  default: true,
});

const plugins = selector({
  key: 'plugins',
  get: ({ get }) => {
    const config = get(endpointsConfig) || {};
    return config?.gptPlugins?.plugins || {};
  },
});

const endpointsFilter = selector({
  key: 'endpointsFilter',
  get: ({ get }) => {
    const config = get(endpointsConfig) || {};

    const filter = {};
    for (const key of Object.keys(config)) {
      filter[key] = !!config[key];
    }
    return filter;
  },
});

const availableEndpoints = selector({
  key: 'availableEndpoints',
  get: ({ get }) => {
    const endpoints = [
      'azureOpenAI',
      'openAI',
      'chatGPTBrowser',
      'gptPlugins',
      'bingAI',
      'google',
      'anthropic',
    ];
    const f = get(endpointsFilter);
    return endpoints.filter((endpoint) => f[endpoint]);
  },
});
// const modelAvailable

export default {
  plugins,
  endpointsConfig,
  endpointsFilter,
  availableEndpoints,
  defaultConfig,
  endpointsQueryEnabled,
};
