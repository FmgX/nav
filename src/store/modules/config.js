import loader from '@/utils/config';

export default {
  namespaced: true,
state: () => ({
    url: import.meta.env.VITE_DEFAULT_CONFIG_URL,
    config: {},
  }),
  getters: {
    baseUrl: state => state.url.match(/^.*\//),
  },
  mutations: {
    url: function(state, url) {
      state.url = url;
    },
    config: function(state, conf) {
      state.config = conf;
    },
  },
  actions: {
    update: function({commit}) {
      let url = import.meta.env.VITE_DEFAULT_CONFIG_URL
      loader.loadFromUrl(url)
        .then(config => {
          commit('config', config)
          commit('url', url)
        })
        .catch(error => console.error(error))
    }
  }
}
