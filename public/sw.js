'use strict';


let sessionId = null;
const INTERVAL_TIME = 10000;

// self.addEventListener('install', async function() {
//     console.log('install now!!');
//     if (sessionId !== null) {
//         clearInterval(sessionId);
//         sessionId = null;
//     }
//     await pushNotification(INTERVAL_TIME, 'install');
//     // loopSayHello(INTERVAL_TIME, 'install');
// });

self.addEventListener('update', async function() {
    console.log('update now!!');
    if (sessionId !== null) {
        clearInterval(sessionId);
        sessionId = null;
    }
    await pushNotification(INTERVAL_TIME, 'update');
    // loopSayHello(INTERVAL_TIME, 'update');
});

// self.addEventListener('fetch', async function() {
//     console.log('fetch now!!');
//     if (sessionId !== null) {
//         clearInterval(sessionId);
//         sessionId = null;
//     }
//     await pushNotification(INTERVAL_TIME, 'fetch');
//     // loopSayHello(INTERVAL_TIME, 'fetch');
// });

self.addEventListener('activate', async function() {
    console.log('activate now!!');
    if (sessionId !== null) {
        clearInterval(sessionId);
        sessionId = null;
    }
    await pushNotification(INTERVAL_TIME, 'activate');
    // loopSayHello(INTERVAL_TIME, 'activate');
});

const loopSayHello = (time, message) => {
    sessionId = setInterval(() => {
        console.log(`hello time:${time} message:${message}`);
        // self.registration.showNotification(message, {
        //     body: "Push通知本文"
        // });
    }, time);
};

const pushNotification = async (time, message) => {
    let res = await getAll ();
    console.log(findRecommendedTodo(res));
    const pushTodo = findRecommendedTodo(res);
    sessionId = setInterval(() => {
        console.log(`pushNotification time:${time} message:${message}`);
        self.registration.showNotification(pushTodo.name, {
            body: unixTime2ymd(pushTodo.deadline)
        });
    }, time);
};

async function loadDB(storeName, id) {
    return new Promise (
        function (resolve, reject) {
            var request = indexedDB.open (storeName, id);
            request.onerror = (event) => {
                console.log (event);
                reject ("error");
            };
            request.onupgradeneeded = (event) => {
                console.log ("!!!!!!!!!!! not found")
                console.log (event);
                event.target.transaction.abort ();
                reject ("not found");
            };
            request.onsuccess = (event) => {
                // console.log ("loaded");
                var  database = event.target.result;
                // console.log (database);
                resolve (database)
            }
        }
    )
}

async function getAll() {
    // indexedDB を開きます。
    let request = await loadDB ("task_cabinet");  // indexedDB.open('task_cabinet', 3);
    // console.log ('Here is the database!')
    // console.log (request);
    let tx = request.transaction (["task"], "readwrite");
    let store = tx.objectStore ("task");
    let dbarray = await store.getAll ();
    let result = new Promise ((onSuccess) => {
        // console.log ("state", dbarray.readyState)
        dbarray.onsuccess = function (e) {
            // console.log ("GET success");
            result = e.target.result;
            onSuccess (result);
        }
    });
    let result2 = await result;
    return result2
}

function findRecommendedTodo(todos) {
    if (todos.length === 0) {
        return null;
    }
    const sorted = todos
        .sort((todo1, todo2) => {
            return ((todo1.deadline - todo2.deadline) !== 0
                ? (todo1.deadline - todo2.deadline) : (todo2.estimate  - todo1.estimate));
        });
    return (Math.random()<0.5)
        ? sorted[0] : sorted[Math.floor(Math.random()*sorted.length)];
}


function unixTime2ymd(intTime){
    var datetime = new Date( intTime * 1000);
    var year  = datetime.getFullYear();
    var month = datetime.getMonth() + 1;
    var day  = datetime.getDate();
    var hour = ( '0' + datetime.getHours() ).slice(-2);
    var min  = ( '0' + datetime.getMinutes() ).slice(-2);

    return( year + '-' + month + '-' + day + ' ' + hour + ':' + min);

}