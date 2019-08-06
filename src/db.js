// 顧客データがどのようなものかを示します
const customerData = [
    { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
    { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];

const dbName = "the_name";

var request = indexedDB.open(dbName);

request.onerror = function() {
    // エラー処理
};
request.onupgradeneeded = function(event) {
    var db = event.target.result;

    // 顧客の情報を保存する objectStore を作成します。
    // "ssn" は一意であることが保証されていますので、キーパスとして使用します。
    // あるいは少なくとも、キックオフミーティングで言われたことです。
    var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

    // 顧客を名前で検索するためのインデックスを作成します。
    // 重複する可能性がありますので、一意のインデックスとしては使用できません。
    objectStore.createIndex("name", "name", { unique: false });

    // 顧客をメールアドレスで検索するためのインデックスを作成します。2 人の顧客が同じメールアドレスを
    // 使用しないようにしたいので、一意のインデックスを使用します。
    objectStore.createIndex("email", "email", { unique: true });

    // データを追加する前に objectStore の作成を完了させるため、
    // transaction oncomplete を使用します。
    objectStore.transaction.oncomplete = function() {
        console.log("save data");
        // 新たに作成した objectStore に値を保存します。
        var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
        for (var i in customerData) {
            console.log("save data doing");
            customerObjectStore.add(customerData[i]);
        }
    };
    objectStore.getAll().onsuccess = function(event) {
        alert("Got all customers: " + event.target.result);
    };
};