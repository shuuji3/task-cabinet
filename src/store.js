import Vue from 'vue';
import Vuex from 'vuex';
import uuid from 'uuid/v4';
import moment from 'moment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [
      {
        id: uuid(),
        name: 'PWAの調査',
        deadline: moment('2019-08-03 10:30'),
        estimate: 10,
      },
      {
        id: uuid(),
        name: 'ローカルでPWAを動くか',
        deadline: moment('2019-08-03 11:00'),
        estimate: 20,
      },
      {
        id: uuid(),
        name: 'Firebaseの通知ができなくなった',
        deadline: moment('2019-08-03 15:00'),
        estimate: 30,
      },
      {
        id: uuid(),
        name: 'Firebaseの調査',
        deadline: moment('2019-08-03 14:00'),
        estimate: 40,
      },
      {
        id: uuid(),
        name: 'サーバーからほしい情報をまとめる',
        deadline: moment('2019-08-03 13:30'),
        estimate: 50,
      },
      {
        id: uuid(),
        name: 'Todoリストのアップデート',
        deadline: moment('2019-08-03 16:00'),
        estimate: 15,
      },
      {
        id: uuid(),
        name: 'Vue.jsのpush通知の調査',
        deadline: moment('2019-08-03 10:00'),
        estimate: 55,
      },
      {
        id: uuid(),
        name: '通知するTodoを決める',
        deadline: moment('2019-08-03 16:15'),
        estimate: 70,
      },
      {
        id: uuid(),
        name: 'デプロイ環境でのパス問題の解決',
        deadline: moment('2019-08-03 15:45'),
        estimate: 7,
      },
    ],
  },
  mutations: {
    addTodo(state, newTodo) {
      state.todos.push(newTodo);
    },
    removeTodo(state, todo) {
      const idx = state.todos.findIndex(v => v.id === todo.id);
      if (idx !== undefined) {
        state.todos.splice(idx, 1);
      }
    },
  },
  actions: {},
});
