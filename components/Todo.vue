<template>
  <div class="todos">
    <h1>{{ title }}</h1>
    <input class="todo-add" v-model="newTodo" v-on:keyup.enter="addTodo" placeholder="Hinzufügen">
    <div class="todo-list">
      <div v-for="todo in todos" class="todo-item">
        <div class="label" v-bind:class="{ done: todo.done }" v-on:click="toggleTodo(todo)">{{ todo.text }}</div>
        <button v-on:click="removeTodo(todo)">&#x2717;</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        newTodo: ''
      }
    },
    props: {
      title: {
        type: String,
        required: true,
        twoWay: true
      }
    },
    computed: {
      todos () {
        return this.$store.state.todos.todos || [ { text: 'Add some todos', done: false } ]
      }
    },
    methods: {
      addTodo: function () {
        var newTodoText = this.newTodo.trim()
        if (newTodoText) {
          this.$store.dispatch('todos/addTodo', newTodoText)
          this.newTodo = ''
        }
      },
      removeTodo: function (todo) {
        this.$store.dispatch('todos/removeTodo', todo)
      },
      toggleTodo: function (todo) {
        this.$store.dispatch('todos/toggleTodo', todo)
      }
    }
  }
</script>

<style lang="sass?outputStyle=expanded" scoped>

  :root {
    --color-blue: rgba(154, 207, 234, .85);
  }

  .todos {
    border: 1px solid #2b542c;
    box-sizing: border-box;
  }
  h1 {
    margin: .5rem;
  }
  .todo-add {
    margin: 0 1rem;
    width: calc(100% - 2rem);
  }
  .todo-list {
    padding: .5rem;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    box-sizing: border-box;
  }
  .todo-item {
    flex: 1;
    flex-basis: 20%;
    box-sizing: border-box;
    background: rgba(154, 207, 234, .85);
    // background-color: var(--color-blue);
    margin: .5rem;
    padding: .5rem;
    word-break: break-all;
    word-break: break-word;
    word-wrap: break-word;
    /* stylelint-disable */
    -ms-word-break: break-all;
    /* stylelint-enable */
  }
  .label {
    color: black;
    cursor: pointer;
    margin-right: .3rem;
  }
  .done {
    background-color: red;
    color: white;

    &::before {
      content: "✓"; // &#x2713;
      margin-right: .3rem;
    }
  }
</style>
