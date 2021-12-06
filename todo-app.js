(function () {
    let mainTitle;
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        mainTitle = title;
        return appTitle;
    }

    function createToDoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWraper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название для новой задачи';
        buttonWraper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить задачу';
        if (!input.value) {
            button.disabled = true;
        }
        input.addEventListener('input', function () {
            if (!input.value) {
                button.disabled = true;
            }
            else {
                button.disabled = false;
            }
        })

        buttonWraper.append(button);
        form.append(input);
        form.append(buttonWraper);

        return { form, input, button };
    }

    function createToDoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createToDoItem(name) {
        let item = document.createElement('li');

        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Задача выполнена';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);
        return { item, doneButton, deleteButton };
    }

    function updateLocalStorage(todoList) {
        // запишем все в локал стораге
        localStorage.removeItem(mainTitle);
        todoListStorage = [];
        if (todoList) {
            for (currentTask of todoList.children) {
                todoListStorage.push({ name: currentTask.textContent.replace('Задача выполненаУдалить', ''), done: currentTask.classList.contains('list-group-item-success') });
            }
        }
        localStorage.setItem(mainTitle, JSON.stringify(todoListStorage));

    }

    function createToDoApp(container, title = 'Список дел', taskListPre = []) {

        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createToDoItemForm();
        let todoList = createToDoList();


        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
        if (taskListPre) {
            for (taskPre of taskListPre) {
                let todoItem = createToDoItem(taskPre.name, taskPre.done);
                if (taskPre.done) {
                    todoItem.item.classList.add('list-group-item-success');
                };
                todoItem.doneButton.addEventListener('click', function () {
                    todoItem.item.classList.toggle('list-group-item-success');
                    updateLocalStorage(todoItem.item.parentNode);
                })

                todoItem.deleteButton.addEventListener('click', function () {
                    if (confirm('Вы уверены?')) {
                        parent = todoItem.item.parentNode;
                        todoItem.item.remove();                        
                        updateLocalStorage(parent);
                    }
                })

                todoList.append(todoItem.item);
            }
        }

        todoItemForm.form.addEventListener('submit', function (event) {
            event.preventDefault();

            if (!todoItemForm.input.value) {
                return;
            }

            // todoList.append(createToDoItem(todoItemForm.input.value).item);

            let todoItem = createToDoItem(todoItemForm.input.value);            
            todoItem.doneButton.addEventListener('click', function () {
                todoItem.item.classList.toggle('list-group-item-success');
                updateLocalStorage(todoItem.item.parentNode);
            })

            todoItem.deleteButton.addEventListener('click', function () {
                if (confirm('Вы уверены?')) {
                    parent = todoItem.item.parentNode;
                    todoItem.item.remove();                    
                    updateLocalStorage(parent);
                }

            })

            todoList.append(todoItem.item);

            todoItemForm.input.value = '';
            todoItemForm.button.disabled = true;

            // запишем все в локал стораге
            updateLocalStorage(todoList);
        });
    }
    window.сreateToDoApp = createToDoApp;
})();