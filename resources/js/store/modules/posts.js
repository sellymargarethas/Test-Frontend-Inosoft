import axios from 'axios';

const posts = {
    namespaced: true,
    state: {
        forms: [],
        posts: []
    },
    actions: {
        loadForms ({commit}) {
            axios
                .get('http://localhost:3000/form')
                .then(res => {
                    let forms = res.data
                    commit('SET_FORMS', forms)
                })
                .catch(error => console.error(error))
        },
        loadPosts ({commit}) {
            axios
                .get('http://localhost:3000/data')
                .then(res => {
                    let posts = res.data
                    commit('SET_POSTS', posts)
                })
                .catch(error => console.error(error))
        },
    },
    mutations: {
        SET_FORMS(state, forms) {
            state.forms = forms
        },
        SET_POSTS(state, posts) {
            state.posts = posts
        }
    }
}

export default posts;