import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isNavSelected: 1,
        isLogin: false,
        userInfo: {},
    },
    mutations: {
        changeIsNavSelected(state, newval) {
            state.isNavSelected = newval;
        },
        changeIsLogin(state, newval) {
            state.isLogin = newval;
        },
        changeUserInfo(state, newval) {
            state.userInfo = newval;
        }
    }
})

export default store