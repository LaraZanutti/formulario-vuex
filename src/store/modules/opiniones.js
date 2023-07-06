import axios from "axios";

const opiniones = {
    namespaced: true,
    state: {
        opiniones: []
    },
    mutations: {
        guardarOpiniones(state, opiniones) {
            state.opiniones = opiniones
        }
    },
    actions: {
        async guardarOpinion({ commit, dispatch }, opinion) {
            await axios
                .post("https://64a59fc700c3559aa9bffd7a.mockapi.io/opiniones", opinion)
                .then(() => {
                    commit('guardarOpinion', opinion)
                    dispatch("traerOpiniones")
                })
        },
        async traerOpiniones({ commit }) {
            await axios
                .get("https://64a59fc700c3559aa9bffd7a.mockapi.io/opiniones")
                .then((res) => {
                    commit('guardarOpiniones', res.data)

                })
        }
    },
    getters: {
        getOpiniones(state) {
            return state.opiniones;
        }
    }
}

export default opiniones