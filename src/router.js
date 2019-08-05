import Vue from 'vue';
import Router from 'vue-router';
import AddTodo from './views/TodoAdd';
import Todo from './views/Todo';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'todo',
      component: Todo,
    },
    {
      path: '/add',
      name: 'add',
      component: AddTodo,
    },
  ],
});
