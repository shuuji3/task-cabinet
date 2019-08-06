<template>
  <v-container>
    <h1>タスクの追加</h1>
    <v-layout text-center wrap>
      <!--タスク名-->
      <v-flex xs12 sm12>
        <v-text-field
          v-model="name"
          label="タスク名"
          outlined
          shaped
        ></v-text-field>
      </v-flex>
      <!--日付の選択-->
      <v-flex xs12 sm12>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="日付を選択"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-menu>
      </v-flex>
      <!--時刻の選択-->
      <v-flex xs12 sm12>
        <v-layout column :align-center="true">
          <v-time-picker
            v-model="time"
            class="mt-2"
            format="24hr"
          ></v-time-picker>
        </v-layout>
      </v-flex>
      <!--登録ボタン-->
      <v-flex xs12 sm12>
        <div class="my-4">
          <v-btn color="primary" @click="addTodo">登録</v-btn>
        </div>
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
    let jst = new Date();
    jst.setTime(jst.getTime()+1000*60*60*9);
    return {
      name: '',
      date: jst.toISOString().substr(0, 10),
      time: jst.toISOString().substr(11, 5),
      menu: false,
      modal: false,
    };
  },
  methods: {
    addTodo() {
      const newTodo = {
        id: uuid(),
        name: this.name,
        deadline: moment(`${this.date} ${this.time}`),
      };
      this.$store.commit('addTodo', newTodo);
      this.$router.push('/');
    },
  },
};
</script>
