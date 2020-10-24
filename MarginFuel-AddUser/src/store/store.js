import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        initialVal: 0,
        lastVal: 0,
        totalVal: 0,
        showInformation: "",
    },
    mutations: {
        set(state, [name, value]){
            state[name] = value
        },
        incriment(state, [name]){
            state[name] +=1
        }
    }
})