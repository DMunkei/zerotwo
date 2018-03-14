import { sortBy } from 'lodash';

export default {
  detectAndSetMALData({ commit }) {
    if (!this.state.myAnimeList.auth) {
      return Promise.resolve();
    }

    // eslint-disable-next-line no-underscore-dangle
    return this._vm.$http.getAnimeList(this.state.myAnimeList.auth.username)
      .then((data) => {
        const json = JSON.parse(data);

        commit('setMALData', sortBy(json.myanimelist.anime, item =>
          item.series_title.text.toLowerCase()));
      })
      .then(() => Promise.resolve());
  },
  login({ commit }, { username, password }) {
    // eslint-disable-next-line no-underscore-dangle
    return this._vm.$http.login({ username, password })
      .then(() => {
        commit('setLoginData', { username, password });
      })
      .then(() => Promise.resolve())
      .catch(() => Promise.reject());
  },
  logout({ commit }) {
    commit('setLoginData', null);
    commit('setMALData', null);
  },
};