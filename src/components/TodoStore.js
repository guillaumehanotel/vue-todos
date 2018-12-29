import Vuex from 'vuex'

const state = {
    todos: [{
        name: 'Aller chez le coiffeur',
        completed: false
    }]
}

const getters = {
    todos: state => state.todos,
    completedTodos: state => state.todos.filter(todo => todo.completed),
    remainingTodos: state => state.todos.filter(todo => !todo.completed),
    remainingTodosCount: state => getters.remainingTodos(state).length,
    completedTodosCount: state => getters.completedTodos(state).length,
}

// prend un state en paramètre et changer qqchose
const mutations = {
    ADD_TODO: (state, name) => {
        state.todos.push({
            name: name,
            completed: false
        })
    },
    EDIT_TODO: (state, todo) => {
        state
    },
    DELETE_TODO: (state, todo) => {
        state.todos.filter(item => item !== todo)
    },
}


const actions = {
    addTodo: (store, name) => {
        store.commit('ADD_TODO', name);
    },
    editTodo: (store, todo) => {

    },
    deleteTodo: (store, todo) => {
        store.commit('DELETE_TODO', todo);
    }
}

let store =  new Vuex.Store({

    state: state,

    // Fonctions qui permettent de muter notre état
    mutations: mutations,

    getters: getters,

    actions: actions,

    strict: true

})

global.store = store

export default store