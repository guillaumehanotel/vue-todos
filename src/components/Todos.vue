<template>
    <section class="todoapp">
        <header class="header">
            <h1>Todos</h1>
            <input type="text" class="new-todo" placeholder="Ajouter une tâche" v-model="newTodo" @keyup.enter="addTodo">
        </header>
        <div class="main">
            <input type="checkbox" class="toggle-all" v-model="allDone" id="toggle-all">
            <label for="toggle-all"></label>
            <ul class="todo-list">
                <li class="todo" v-for="todo in filtered_todos" :class="{ completed: todo.completed, editing: todo === editing }">
                    <div class="view">
                        <input type="checkbox" class="toggle" v-model="todo.completed">
                        <label @dblclick="editTodo(todo)">{{ todo.name }}</label>
                        <button class="destroy" @click.prevent="deleteTodo(todo)"></button>
                    </div>
                    <input type="text" class="edit" v-model="todo.name" @keyup.enter="doneEdit" @blur="doneEdit" @keyup.esc="cancelEdit" v-focus="todo === editing">
                </li>
            </ul>
        </div>
        <footer class="footer" v-show="todos.length > 0">
            <span class="todo-count"><strong>{{ remainingTodosCount }}</strong> Tâches à faire</span>
            <ul class="filters">
                <li><a href="#" :class="{selected: filter ==='all'}" @click.prevent="filter = 'all'">Toutes</a></li>
                <li><a href="#" :class="{selected: filter ==='todo'}" @click.prevent="filter = 'todo'">À Faire</a></li>
                <li><a href="#" :class="{selected: filter ==='done'}" @click.prevent="filter = 'done'">Faites</a></li>
            </ul>
            <button class="clear-completed" v-show="completedTodosCount" @click.prevent="deleteCompleted">Supprimer les tâches finies</button>
        </footer>
    </section>
</template>

<script>
    import Vue from 'vue'
    import store from './TodoStore'
    import Vuex from 'vuex'

    export default {
        store: store,
        name: "Todos",
        data () {
            return {
                newTodo: '',
                filter: 'all',
                editing: null,
                oldTodo: ''
            }
        },
        computed: {
            ...Vuex.mapGetters([
                'todos',
                'remainingTodosCount',
                'completedTodosCount',
                'remainingTodos',
                'completedTodos',
            ]),
            allDone: {
                get() {
                    return this.remainingTodosCount === 0
                },
                set(value) {
                    this.todos.forEach(todo => {
                        todo.completed = value
                    })
                }
            },
            filtered_todos: function () {
                if (this.filter === 'todo') {
                    return remainingTodos
                } else if (this.filter === 'done') {
                    return completedTodos
                } else {
                    return this.todos
                }
            }
        },
        methods: {
            ...Vuex.mapActions({
                addTodoStore: 'addTodo',
                editTodoStore: 'editTodo',
                deleteTodo: 'deleteTodo',
            }),
            addTodo(){
                this.addTodoStore(this.newTodo)
                this.newTodo = ''
            },
            editTodo: function(todo){
                this.editing = todo
                this.oldTodo = todo.name
            },
            deleteCompleted: function () {
                this.todos = this.todos.filter(todo => !todo.completed)
            },
            doneEdit: function () {
                this.editing = null
            },
            cancelEdit: function () {
                this.editing.name = this.oldTodo
                this.doneEdit()
            }
        },
        directives: {
            focus: function (el, value) {
                if(value){
                    Vue.nextTick(_ => {
                        el.focus()
                    })
                }
            }
        }
    }
</script>

<style scoped src="./todos.css">

</style>
