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
          autofocus
        ></v-text-field>
      </v-flex>
      <!--日付の選択-->
      <v-flex xs12 sm12 mb-2>
        <v-layout justify-center>
          <v-date-picker v-model="date"></v-date-picker>
        </v-layout>
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
      <!--見積もり時間の登録-->
      <v-flex xs12 sm12 mt-10 mb-4>
        <v-layout column :align-center="true">
          <div class="estimate-time">
            <label
              class="v-label theme--light mb-2"
              for="estimate-time">見積もり時間</label>
            <div class="estimate_time__input">
              <span class="v-label theme--light">短い</span>
              <div class="estimate-time__slider">
                <v-slider
                  v-model="estimate"
                  id="estimate-time"
                  min="1"
                  max="100"
                ></v-slider>
              </div>
              <span class="v-label theme--light">長い</span>
            </div>
          </div>
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

<style>
  .estimate-time {
    max-width: 290px;
    width: 100%;
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
      estimate: 50,
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
        estimate: this.estimate,
      };
      this.$store.commit('addTodo', newTodo);
      this.$router.push('/');
    },
  },
};
</script>
