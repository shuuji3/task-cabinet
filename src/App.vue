<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline">
        <span>Task Cabinet</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
    <input type="text" v-model="taskText" id="todo-text" value="" placeholder="taskText" />
    <input type="text" v-model="estimate" id="estimate" value="" placeholder="estimate" />
    <input type="text" v-model="taskId" id="taskId" value="" placeholder="uuid" />
    <button v-on:click="addTask">Add</button>
    <button v-on:click="getAll">Greet</button>
    <button v-on:click="remove">Delete</button>
    <ul id="todo-list">
    </ul>
  </v-app>
</template>

<script>

  import uuid from 'uuid/v4';
  import moment from 'moment';

  // 顧客データがどのようなものかを示します
  const defaultTodoData = [
    {
      id: uuid(),
      name: 'PWAの調査',
      deadline: moment('2019-08-03 10:30').unix(),
      estimate: 10,
    },
    {
      id: uuid(),
      name: 'ローカルでPWAを動くか',
      deadline: moment('2019-08-03 11:00').unix(),
      estimate: 20,
    },
    {
      id: uuid(),
      name: 'Firebaseの通知ができなくなった',
      deadline: moment('2019-08-03 15:00').unix(),
      estimate: 30,
    },
    {
      id: uuid(),
      name: 'Firebaseの調査',
      deadline: moment('2019-08-03 14:00').unix(),
      estimate: 40,
    },
    {
      id: uuid(),
      name: 'サーバーからほしい情報をまとめる',
      deadline: moment('2019-08-03 13:30').unix(),
      estimate: 50,
    },
    {
      id: uuid(),
      name: 'Todoリストのアップデート',
      deadline: moment('2019-08-03 16:00').unix(),
      estimate: 15,
    },
    {
      id: uuid(),
      name: 'Vue.jsのpush通知の調査',
      deadline: moment('2019-08-03 10:00').unix(),
      estimate: 55,
    },
    {
      id: uuid(),
      name: '通知するTodoを決める',
      deadline: moment('2019-08-03 16:15').unix(),
      estimate: 70,
    },
    {
      id: uuid(),
      name: 'デプロイ環境でのパス問題の解決',
      deadline: moment('2019-08-03 15:45').unix(),
      estimate: 7,
    },
  ];

  const dbName = "task_cabinet";

  const request = indexedDB.open(dbName);

  request.onerror = function() {
    // エラー処理
  };
  request.onupgradeneeded = function(event) {
    var db = event.target.result;

    // 顧客の情報を保存する objectStore を作成します。
    // "ssn" は一意であることが保証されていますので、キーパスとして使用します。
    // あるいは少なくとも、キックオフミーティングで言われたことです。
    var objectStore = db.createObjectStore("task", { keyPath: "id" });

    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("deadline", "deadline", { unique: false });
    objectStore.createIndex("estimate", "estimate", { unique: false });

    // データを追加する前に objectStore の作成を完了させるため、
    // transaction oncomplete を使用します。
    objectStore.transaction.oncomplete = function() {
      console.log("save data");
      // 新たに作成した objectStore に値を保存します。
      var customerObjectStore = db.transaction("task", "readwrite").objectStore("task");
      for (var i in defaultTodoData) {
        console.log("save data doing");
        console.log(defaultTodoData[i]);
        customerObjectStore.add(defaultTodoData[i]);
      }
    };
    objectStore.getAll().onsuccess = function(event) {
      alert("Got all task: " + event.target.result);
    };
  };

  // request.onsuccess = function (event) {
  //   const db_instance = event.target.result;
  //   console.log(db_instance);
  //   const tx = db_instance.transaction(["customers"], "readwrite");
  //   console.log(tx);
  //   const store = tx.objectStore('customers');
  //   console.log(store);
  //   store.getAll().onsuccess = function(event) {
  //     // alert("Got all customers: " + event.target.result);
  //     event.target.result.forEach(customer => {
  //       console.log(customer);
  //     })
  //   };
  //   store.add(defaultTodoData[0]).onsuccess = function(event) {
  //     console.log("Add Success!!")
  //   };
  // };

export default {
  name: 'App',
  components: {},
  methods: {
    getAll: function() {
      // indexedDB を開きます。
      let request = indexedDB.open('task_cabinet', 3);
      console.log("getAll");
      request.onsuccess = function (event) {
        const db_instance = event.target.result;
        const tx = db_instance.transaction(["task"], "readwrite");
        const store = tx.objectStore('task');
        store.getAll().onsuccess = function(event) {
          event.target.result.forEach(customer => {
            console.log(customer);
          })
        };
      };
    },
    addTask: function () {
      const taskText = this.taskText;
      const estimate = this.estimate;
      const deadline = moment().add(1, 'days').unix();

      // indexedDB を開きます。
      let request = indexedDB.open('task_cabinet', 3);
      console.log("getAll");
      request.onsuccess = function (event) {
        const db_instance = event.target.result;
        const tx = db_instance.transaction(["task"], "readwrite");
        const store = tx.objectStore('task');
        store.add({id: uuid(), name: taskText, deadline: deadline, estimate: estimate}).onsuccess = function(event) {
          console.log("Seccess Save");
          console.log("SaveResult:" + JSON.stringify({uuid: event.target.result, name: taskText, deadline: deadline, estimate: estimate}))
        };
      };
    },
    remove: function () {
      const taskId = this.taskId;
      let request = indexedDB.open('task_cabinet', 3);
      request.onsuccess = function (event) {
        const db_instance = event.target.result;
        const tx = db_instance.transaction(["task"], "readwrite");
        const store = tx.objectStore('task');
        store.delete(taskId).onsuccess = function() {
          console.log("success Delete!!!!!!!!")
        };
      };
    }
  },
  data: () => ({
    taskText: "",
    taskId: "",
    estimate: 0,
   }),
};

</script>
