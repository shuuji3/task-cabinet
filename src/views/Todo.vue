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
          name: 'スプリントレビューの練習',
          deadline: moment('2019-08-01 16:30'),
        },
        {
          id: uuid(),
          name: 'Todoリストのレイアウト相談',
          deadline: moment('2019-08-01 15:30'),
        },
        {
          id: uuid(),
          name: 'データの追加',
          deadline: moment('2019-08-01 16:00'),
        },
        {
          id: uuid(),
          name: '開発環境の構築',
          deadline: moment('2019-08-01 10:30'),
        },
        { id: uuid(), name: '昼食', deadline: moment('2019-08-01 11:40') },
        {
          id: uuid(),
          name: 'タピオカミルクティーを飲む',
          deadline: moment('2019-08-03 14:30'),
        },
        {
          id: uuid(),
          name: 'ボタンの作成',
          deadline: moment('2019-08-02 10:30'),
        },
        {
          id: uuid(),
          name: 'チーム決定',
          deadline: moment('2019-07-07 15:30'),
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
