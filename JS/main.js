console.log("Try hard!")

var $ = function (id) {
    return document.getElementById(id)
}

console.log(1)

//hàm validate
function validate() {
    var name = document.querySelector("#info").value;
    if (name.length == 0) {
        $("mesage_error").classList.add("invalid");
        $("info").classList.add("valid_border")
        $("mesage_error").innerHTML = "Bắt buộc nhập trường này!"
    } else if (name.length < 6) {
        $("mesage_error").classList.add("invalid");
        $("info").classList.add("valid_border")
        $("mesage_error").innerHTML = "Bạn phải nhập tối thiểu 6 ký tự!"
    } else {
        $("info").classList.remove("valid_border")
        $("mesage_error").innerHTML = ""
    }
}

var input_todo = $("info");
var input_time = $("time");
var btn_add = $("btn_add");
var list = $("list_todo");

const storageName = "todo_list";

var storage = {
    listName: storageName,
    save: function (data) {
        localStorage.setItem(this.listName, JSON.stringify(data))
    },
    read: function () {
        let dataString = localStorage.getItem(this.listName);
        return JSON.parse(dataString);
    }
}

var todo_list = storage.read() || []
//Khai báo 1 todo có những gì?
class TodoItem {
    constructor(todo, time) {
        this.todo = todo;
        this.time = time;
    }
}


//Hàm check trùng lặp todo
function check(todo, time) {
    const todo_obj = new TodoItem(todo, time);

    var check = true;
    for (var i in todo_list) {
        if (todo_list[i].todo == todo) {
            todo_list[i].time = parseInt(todo_list[i].time) + parseInt(time)
            // alert(typeof parseInt(time))
            // alert(typeof parseInt(todo_list[i].time))
            // alert(todo_list[i].time);
            check = false;
        }
    }
    return check;
}

function addTodo(todo, time) {
    const todo_obj = new TodoItem(todo, time);

    var vl = check(todo, time)
    if (todo_list.length != 0) {
        if (vl == false) {
            alert("Todo bị trùng!");
            storage.save(todo_list);
        } else {
            todo_list.push(todo_obj);
            storage.save(todo_list);
        }
    } else {
        todo_list.push(todo_obj);
        storage.save(todo_list);
    }
}

show_todo();

function show_todo() {
    var html = "";
    var html2 = "";
    var a = [],b = 0;
    html = html + "<tr><th>TODO</th><th>Time (hour)</th><th>Task</th></tr>"
    for (var i in todo_list) {
        html = html + "<tr><td>" + todo_list[i].todo + "</td><td>" + todo_list[i].time +
            "</td><td><button href='' id='delete' onclick = 'removeTodo(" + i + ")'>Done!</button></td></tr>"
        a.push(" " + todo_list[i].todo);
        b += parseFloat(todo_list[i].time);
    }
    html2 = html2 + `<p> Tổng thời gian <span class="note_item"> ${a} </span> phải sử dụng  <span class="note_item">${b}</span> giờ </p>`
    list.innerHTML = html;
    $("note").innerHTML = html2
}


function removeTodo(position) {
    todo_list.splice(position, 1);
    storage.save(todo_list);
    show_todo();
}

function add_todo() {
    if (input_todo.value != "") {
        addTodo(input_todo.value, input_time.value);
        input_todo.value = "";
        input_time.value = "";
    } else {
        validate()
    }

}