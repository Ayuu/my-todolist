myTodos = [];

function indexOf(id) {
  for (var i = 0; i < myTodos.length; i++) {
    if (myTodos[i].id === id) {
      return i;
    }
  }

  return -1;
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  var inputValue = document.getElementById("todo").value;
  createElement(inputValue, false, true);
}

function createElement(inputValue, checked = false, setStorage = false) {
  var li = document.createElement("li");
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("list").appendChild(li);
  }
  document.getElementById("todo").value = "";
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");
  var id = `${myTodos.length}-todo`;
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  li.id = id;
  li.onclick = function() {
    var index = indexOf(id);
    if (index > -1) {
      myTodos[index].checked = !myTodos[index].checked;
      localStorage.setItem('storedTodos', JSON.stringify(myTodos));
      li.classList.toggle('checked');
    }
  }
  span.onclick = function() {
    document.getElementById(id).remove();
    myTodos.splice(indexOf(id), 1)
    localStorage.setItem('storedTodos', JSON.stringify(myTodos));
  }
  if (checked) {
    li.classList.toggle('checked');
  }
  myTodos.push({ id, todo: inputValue, checked });

  if (setStorage) {
    localStorage.setItem('storedTodos', JSON.stringify(myTodos));
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  if (typeof(Storage) !== "undefined") {
    if (!localStorage.getItem('storedTodos')) {
      localStorage.setItem('storedTodos', []);
    } else {
      var tmp = JSON.parse(localStorage.getItem('storedTodos'));
      tmp.forEach(elt => {
        createElement(elt.todo, elt.checked);
      });
    }
  } else {
    document.getElementById("container").innerHTML = "Sorry, your browser does not support web storage...";
  }
});