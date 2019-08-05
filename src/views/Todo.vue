<template>
  <v-container>
    <v-btn to="/add">タスクを追加</v-btn>
    <v-layout text-center wrap>
      <v-flex md-12>
        <div v-if="sortedTodos.length === 0" class="headline">
          <v-icon>mdi-anchor</v-icon>
          <span class="pl-2 pr-2">[タスク]は空です</span>
          <v-icon>mdi-watch</v-icon>
        </div>
        <v-card v-for="todo in sortedTodos" :key="todo.id">
          <v-card-title>{{ todo.name }}</v-card-title>
          <v-card-text
            >期限: {{ todo.deadline.format('YYYY-MM-DD HH:mm') }}</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="doneTodo(todo)">
              <v-icon>mdi-check</v-icon>
              <span class="ml-2">完了</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import push from 'push.js';

export default {
  computed: {
    sortedTodos() {
      return this.$store.state.todos
        .slice()
        .sort((todo1, todo2) => todo1.deadline.diff(todo2.deadline));
    },
  },
  data() {
    return {};
  },
  methods: {
    doneTodo(todo) {
      this.$store.commit('removeTodo', todo);
    }
  },
  mounted() {
    this.intervalId = setInterval(() => {
      const todo = this.sortedTodos[0];
      if (todo === undefined) {
        return;
      }

      push.create(todo.name, {
        body: todo.deadline.format('YYYY-MM-DD HH:mm'),
        onClick: () => {
          window.focus();
          this.close();
        },
      });
    }, 10 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>
