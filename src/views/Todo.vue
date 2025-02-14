<template>
  <v-container>
    <v-btn to="/add" fixed dark fab bottom right color="pink">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-layout wrap>
      <v-flex md-12>
        <div v-if="sortedTodos.length === 0" class="headline text-center my-12">
          <v-icon>mdi-anchor</v-icon>
          <span class="pl-2 pr-2">[タスク]は空です</span>
          <v-icon>mdi-watch</v-icon>
        </div>
        <v-card v-for="todo in sortedTodos" :key="todo.id" class="mb-2">
          <v-card-title>{{ todo.name }}</v-card-title>
          <v-card-text>
            <v-simple-table class="todo-datails text-center">
              <tbody>
                <tr>
                  <th>期限</th>
                  <td>
                    {{ todo.deadline | formatDateTime }}
                  </td>
                </tr>
                <tr>
                  <th>見積もり時間</th>
                  <td>
                    <div class="estimate_time__input">
                      <span class="v-label theme--light">短い</span>
                      <div class="estimate-time__slider px-2">
                        <v-progress-linear
                          :value="todo.estimate"
                          height="10"
                          color="light-blue"
                          rounded
                          readonly
                        ></v-progress-linear>
                      </div>
                      <span class="v-label theme--light">長い</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
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

<style>
.container {
  margin-bottom: 5em;
}

.todo-datails tr {
  background: none !important;
}

.estimate_time__input {
  align-items: center;
  display: flex;
}

.estimate-time__slider {
  flex: 1;
}

.estimate-time__slider .v-input__slot {
  margin-bottom: 0;
}

.estimate-time__slider .v-messages {
  display: none;
}
</style>

<script>
import moment from 'moment';
import push from 'push.js';

export default {
  filters: {
    formatDateTime(str) {
      return moment(str).format('YYYY-MM-DD HH:mm');
    },
  },

  computed: {
    sortedTodos() {
      return this.$store.state.todos
        .slice()
        .sort((todo1, todo2) =>
          moment(todo1.deadline).diff(moment(todo2.deadline))
        );
    },
  },
  data() {
    return {};
  },
  methods: {
    doneTodo(todo) {
      this.$store.commit('removeTodo', todo);
    },
    findRecommendedTodo() {
      const todos = this.$store.state.todos.slice();
      if (todos.length === 0) {
        return null;
      }

      const sorted = todos.sort((todo1, todo2) => {
        return moment(todo1.deadline).diff(moment(todo2.deadline)) !== 0
          ? moment(todo1.deadline).diff(moment(todo2.deadline))
          : todo2.estimate - todo1.estimate;
      });
      return Math.random() < 0.5
        ? sorted[0]
        : sorted[Math.floor(Math.random() * sorted.length)];
    },
  },
  mounted() {
    this.intervalId = setInterval(() => {
      const todo = this.findRecommendedTodo();
      if (todo === null) {
        return;
      }

      push.create(todo.name, {
        body: moment(todo.deadline).format('YYYY-MM-DD HH:mm'),
        requireInteraction: true,
        onClick: () => {
          window.focus();
          this.close();
        },
      });
    }, this.$store.state.notifyIteration * 60 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>
