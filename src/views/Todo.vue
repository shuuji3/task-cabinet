<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex md-12>
        <v-card v-for="todo in sortedTodos" :key="todo.id">
          <v-card-title>{{ todo.name }}</v-card-title>
          <v-card-text>期限: {{ todo.deadline.format('YYYY-MM-DD HH:mm') }}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment';
import uuid from 'uuid/v4';

export default {
  computed: {
    sortedTodos() {
      return this.todos.slice().sort((todo1, todo2) => todo1.deadline.diff(todo2.deadline));
    },
  },
  data() {
    return {
      todos: [
        {
          id: uuid(),
          name: 'Task Cabinet をデプロイする',
          deadline: moment('2019-08-01 18:00'),
        },
        {
          id: uuid(),
          name: 'データベースを作成する',
          deadline: moment('2019-08-02 18:00'),
        },
        {
          id: uuid(),
          name: '紙飛行機を飛ばす',
          deadline: moment('2019-07-31 10:00'),
        },
      ],
    };
  },
};
</script>
