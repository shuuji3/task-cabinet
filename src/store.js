import Vue from 'vue';
import Vuex from 'vuex';
import uuid from 'uuid/v4';
import moment from 'moment';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const notifyIteration = 30; // 通知間隔(分)
const initialState = {
  notifyIteration,
  todos: [
    {
      id: uuid(),
      name: '「Task Cabinet」へようこそ',
      deadline: moment('2019-08-01 00:00'),
      estimate: 25,
    },
    {
      id: uuid(),
      name: 'まずは右下の「➕」ボタンを押して、新しいタスクを登録しましょう！',
      deadline: moment('2019-08-01 12:00'),
      estimate: 50,
    },
    {
      id: uuid(),
      name: `${notifyIteration}分ごとに、今するべきタスクをおすすめします`,
      deadline: moment('2019-08-01 12:00'),
      estimate: 75,
    },
  ],
};

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: initialState,
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
