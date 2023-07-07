import axios from "axios";

const opiniones = {
    namespaced: true,
    state: {
        opiniones: [],
        loading: false
    },
    mutations: {
        guardarOpiniones(state, opiniones) {
            state.opiniones = opiniones
        },
        setIsLoading(state, loading) {
            state.loading = loading
        }
    },
    actions: {
        async guardarOpinion({ dispatch }, opinion) {
            await axios
                .post("https://64a59fc700c3559aa9bffd7a.mockapi.io/opiniones", opinion)
                .then(() => {
                    dispatch("traerOpiniones")
                })
        },
        async traerOpiniones({ commit, dispatch }) {
            dispatch('setIsLoading', true)
            await axios
                .get("https://64a59fc700c3559aa9bffd7a.mockapi.io/opiniones")
                .then((res) => {
                    commit('guardarOpiniones', res.data)
                    dispatch('setIsLoading', false)
                })
        },
        setIsLoading({ commit }, loading) {
            commit('setIsLoading', loading)
        }
    },
    getters: {
        getOpiniones(state) {
            return state.opiniones;
        },
        isLoading(state) {
            return state.loading;
        }
    }
}

export default opiniones