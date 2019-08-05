<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex md-12>
        <v-card v-for="todo in sortedTodos" :key="todo.id">
          <v-card-title>{{ todo.name }}</v-card-title>
          <v-card-text
            >期限: {{ todo.deadline.format('YYYY-MM-DD HH:mm') }}</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text>
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
import moment from 'moment';
import uuid from 'uuid/v4';

export default {
  computed: {
    sortedTodos() {
      return this.todos
        .slice()
        .sort((todo1, todo2) => todo1.deadline.diff(todo2.deadline));
    },
  },
  data() {
    return {
      todos: [
        {
          id: uuid(),
          name: 'PWAの調査',
          deadline: moment('2019-08-03 10:30'),
        },
        {
          id: uuid(),
          name: 'ローカルでPWAを動くか',
          deadline: moment('2019-08-03 11:00'),
        },
        {
          id: uuid(),
          name: 'Firebaseの通知ができなくなった',
          deadline: moment('2019-08-03 15:00'),
        },
        {
          id: uuid(),
          name: 'Firebaseの調査',
          deadline: moment('2019-08-03 14:00'),
        },
        {
          id: uuid(),
          name: 'サーバーからほしい情報をまとめる',
          deadline: moment('2019-08-03 13:30'),
        },
        {
          id: uuid(),
          name: 'Todoリストのアップデート',
          deadline: moment('2019-08-03 16:00'),
        },
        {
          id: uuid(),
          name: 'Vue.jsのpush通知の調査',
          deadline: moment('2019-08-03 10:00'),
        },
        {
          id: uuid(),
          name: '通知するTodoを決める',
          deadline: moment('2019-08-03 16:15'),
        },
        {
          id: uuid(),
          name: 'デプロイ環境でのパス問題の解決',
          deadline: moment('2019-08-03 15:45'),
        },
      ],
    };
  },
};
</script>
