import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  NOWMUSIC: 'NOWMUSIC'
}

const rootStore = {
  state: {
    nowMusic: 0
  },
  getters: {
    getNowMusic: state => state.nowMusic
  },
  actions: {
    setNowMusic ({ commit }, id) {
      commit(types.NOWMUSIC, id)
    }
  },
  mutations: {
    /**
     *
     * 設定現在撥放音樂id
     * @param {Number} id
     */
    [types.NOWMUSIC] (state, id) {
      state.nowMusic = id
    }
  }
}

export default new Vuex.Store({
  ...rootStore,

  // 嚴格模式，禁止直接修改state
  strict: false
})
