// var state = {
//   taskList: [
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//   ],
// };

const state = {
  taskList: [],
};

// DOM operations
const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

// console.log(taskContents);
// console.log(taskModal);
// key=${id} on line 48

const htmlTaskContent = ({ id, title, description, type, url }) => `
  <div class="col-md-6 col-lg-4 mt-3" id=${id} >
    <div class='card shadow-sm task__card'>
      <div class='card-header d-flex justify-content-end task__card__header'>
        <button type='button' class='btn btn-outline-info mr-1.5' name=${id} onclick='editTask.apply(this, arguments)'>
          <i class='fas fa-pencil-alt name=${id}'></i>
        </button>
        <button type='button' class='btn btn-outline-danger mr-1.5' name=${id} onclick='deleteTask.apply(this, arguments)'>
          <i class='fas fa-trash-alt' name='${id}' ></i>
        </button>
      </div>
      <div class='card-body'>
        ${
          // url &&
          // `<img width="100%" src=${url} alt='Card' class='card-img-top md-3 rounded-lg' />`
          url
            ? `<img width="100%" src=${url} alt='Card' class='card-img-top md-3 rounded-lg' />`
            : `<img width="100%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAOVBMVEX///+hoaGampqdnZ2srKy0tLSoqKjZ2dnq6ur39/fAwMDt7e3g4OC7u7vw8PD6+vqTk5PS0tLIyMhAQKZNAAACjElEQVR4nO3a2XKqQBRAUXsCZGz4/4+9EhCQsS50FYeqvV41hm17Gkh8vQAAAAAAAAAAAAAAAAAAAAAAAAAACCIvXFB1dWNMo01I2iY3xqRGGR2KUcrmt8aYOksCyZ2+OUaH+/VlQUwwxGwRFJM3aXNtYxUTk7hIfRTvCy8mJSZxpm1Rxl2okRKTdi1K6QsXJEJiEvuNUfb80giJiaNvi9Ll6RcTElOrMSY7/WJCYnI7xJjHr0zpvjNzZTsTEjN+zvzueTPVqtl+VErM5y5Nt+vi472dufisnyk2HxYT8/rcjHjtdgcm9n+LV289Lifm9aoOTpel7z+KW/udpJgjw4YXbTzhQTGpHnbvjbF5Tkzu1Wh9bJ4TM21RanWjeExMZH5iVsfmKTHjwPTSlSc9JCbxsxZl4uWzHhKzaFFGLa/hZMZks9PibGA6bvFjImOs99H0fa/nA9NZXHJKjGlvoY0ar22WA9Ob/6TAmObvQLUbatbXpd2fZ2cbeTFxf6T+e5Z3awPTbQKzyxpxMeXwpw3fve/11odsOTbiYsZ16MYm22sx6ue+VFpMMzlUXVST6/71Gju9BxIWk6vpgPh4Z2D6munYyIqp7O+xm+agRf3cDciKKebHvrkrj73RODaiYurDQ1+rGU9IkmKS1Uuw45rhbkBQzPto2LdE37sBQTHpyZbP/tyPjZyYyX81/rumHxsxMYk9uzCtRlRMdXZguqXpxkZKTHN8xLs1LpMTE5/blSc17XWcjJjEHp/qD2LasZER00T2qsglMmKqMguglBATv0NJbo9RLg2liMy9MTrgdzS1uTemjsIqzn+L4Loqj4M6//UOAAAAAAAAAAAAAAAAAAAAAAAAAMBl/wCSoC7OdsS5KwAAAABJRU5ErkJggg==" alt='Card' class='card-img-top md-3 rounded-lg' />`
        }
        <h4 class='card-title task__card__title'>${title}</h4>
        <p class='description trim-3-lines text-muted'>${description}</p>
        <div class='tags text-white d-flex-wrap'>
          <span class='badge bg-primary m-1'>${type}</span>
        </div>
      </div>
      <div class='card-footer'>
        <button type='button' class='btn btn-outline-primary float-right' data-bs-toggle="modal" data-bs-target="#showTask" onclick='openTask.apply(this, arguments)' id=${id}>Open Task</button>
      </div>
    </div>
  </div>
`;

// model Body on >> click of open task
const htmlModalContent = ({ id, title, description, url }) => {
  const date = new Date(parseInt(id));
  return `
   <div id=${id}>
    ${
      // url &&
      // `<img width="100%" src=${url} alt='Card' class='img-fluid place__holder__image mb-3' />`
      url
        ? `<img width="100%" src=${url} alt='Card' class='card-img-top md-3 rounded-lg' />`
        : `<img width="100%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAOVBMVEX///+hoaGampqdnZ2srKy0tLSoqKjZ2dnq6ur39/fAwMDt7e3g4OC7u7vw8PD6+vqTk5PS0tLIyMhAQKZNAAACjElEQVR4nO3a2XKqQBRAUXsCZGz4/4+9EhCQsS50FYeqvV41hm17Gkh8vQAAAAAAAAAAAAAAAAAAAAAAAAAACCIvXFB1dWNMo01I2iY3xqRGGR2KUcrmt8aYOksCyZ2+OUaH+/VlQUwwxGwRFJM3aXNtYxUTk7hIfRTvCy8mJSZxpm1Rxl2okRKTdi1K6QsXJEJiEvuNUfb80giJiaNvi9Ll6RcTElOrMSY7/WJCYnI7xJjHr0zpvjNzZTsTEjN+zvzueTPVqtl+VErM5y5Nt+vi472dufisnyk2HxYT8/rcjHjtdgcm9n+LV289Lifm9aoOTpel7z+KW/udpJgjw4YXbTzhQTGpHnbvjbF5Tkzu1Wh9bJ4TM21RanWjeExMZH5iVsfmKTHjwPTSlSc9JCbxsxZl4uWzHhKzaFFGLa/hZMZks9PibGA6bvFjImOs99H0fa/nA9NZXHJKjGlvoY0ar22WA9Ob/6TAmObvQLUbatbXpd2fZ2cbeTFxf6T+e5Z3awPTbQKzyxpxMeXwpw3fve/11odsOTbiYsZ16MYm22sx6ue+VFpMMzlUXVST6/71Gju9BxIWk6vpgPh4Z2D6munYyIqp7O+xm+agRf3cDciKKebHvrkrj73RODaiYurDQ1+rGU9IkmKS1Uuw45rhbkBQzPto2LdE37sBQTHpyZbP/tyPjZyYyX81/rumHxsxMYk9uzCtRlRMdXZguqXpxkZKTHN8xLs1LpMTE5/blSc17XWcjJjEHp/qD2LasZER00T2qsglMmKqMguglBATv0NJbo9RLg2liMy9MTrgdzS1uTemjsIqzn+L4Loqj4M6//UOAAAAAAAAAAAAAAAAAAAAAAAAAMBl/wCSoC7OdsS5KwAAAABJRU5ErkJggg==" alt='Card' class='card-img-top md-3 rounded-lg' />`
    }
    <strong class='text-muted text-sm'>Created on: ${date.toString()}</strong>
    <h2 class='my-3'>${title}</h2>
    <p class='text-muted'>${description}</p>
   </div>
  `;
};

// where we convert local json > string
const updateLocalStorage = () => {
  localStorage.setItem(
    "task",
    JSON.stringify({
      tasks: state.taskList,
    })
  );
};

// where we convert str > json
const loadInitialData = () => {
  const localStorageCopy = JSON.parse(localStorage.task);

  if (localStorageCopy) state.taskList = localStorageCopy.tasks;

  state.taskList.map((cardDate) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
  });
};

// when we update or when we edit we need to save
const handleSubmit = (event) => {
  const id = `${Date.now()}`;
  const input = {
    url: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("tags").value,
    description: document.getElementById("taskDescription").value,
  };
  if (input.title === "" || input.type === "" || input.description === "") {
    return alert("Please Fill All The Fields");
  }
  taskContents.insertAdjacentHTML(
    "beforeend",
    htmlTaskContent({
      ...input,
      id,
    })
  );

  // updated task list - for 1st go
  state.taskList.push({ ...input, id });

  // update the same on localStorage too
  updateLocalStorage();
};

// openTask
const openTask = (e) => {
  if (!e) e = window.event;
  const getTask = state.taskList.find(({ id }) => id === e.target.id);
  taskModal.innerHTML = htmlModalContent(getTask);
};

// delete task
const deleteTask = (e) => {
  const targetId = e.target.getAttribute("name");
  // console.log(targetId);
  const type = e.target.tagName;
  const removeTask = state.taskList.filter(({ id }) => id !== targetId);
  updateLocalStorage();
  if (type === "BUTTON") {
    // console.log(e.target.parentNode.parentNode.parentNode.parentNode);
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    );
  } else if (type === "I") {
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode.parentNode
    );
  }
};

// edit task
const editTask = (e) => {
  if (!e) e = window.event;
  const targetId = e.target.id;
  const type = e.target.tagName;
  let parentNode;
  let taskTitle;
  let taskDescription;
  let taskType;
  let submitButton;

  if (type === "BUTTON") {
    parentNode = e.target.parentNode.parentNode;
  } else {
    parentNode = e.target.parentNode.parentNode.parentNode;
  }
  // taskTitle = parentNode.childNodes[3].childNodes[7].childNodes;
  // console.log(taskTitle);
  taskTitle = parentNode.childNodes[3].childNodes[3];
  taskDescription = parentNode.childNodes[3].childNodes[5];
  taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
  submitButton = parentNode.childNodes[5].childNodes[1];
  // console.log(taskTitle, taskDescription, taskType, submitButton);
  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");

  submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
  // data-bs-toggle="modal" data-bs-target="#showTask"
  submitButton.removeAttribute("data-bs-toggle");
  submitButton.removeAttribute("data-bs-target");
  submitButton.innerHTML = "Save Changes";
};

// save edit
const saveEdit = (e) => {
  if (!e) e = window.event;
  const targetId = e.target.id;
  const parentNode = e.target.parentNode.parentNode;
  // console.log(parentNode.childNodes);
  const taskTitle = parentNode.childNodes[3].childNodes[3];
  const taskDescription = parentNode.childNodes[3].childNodes[5];
  const taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
  const submitButton = parentNode.childNodes[5].childNodes[1];

  const updatedData = {
    taskTitle: taskTitle.innerHTML,
    taskDescription: taskDescription.innerHTML,
    taskType: taskType.innerHTML,
  };
  let stateCopy = state.taskList;
  stateCopy = stateCopy.map((task) =>
    task.id === targetId
      ? {
          id: task.id,
          title: updatedData.taskTitle,
          description: updatedData.taskDescription,
          type: updatedData.taskType,
          url: task.url,
        }
      : task
  );
  state.taskList = stateCopy;
  updateLocalStorage();

  taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");

  submitButton.setAttribute("onclick", "openTask.apply(this, arguments)");
  submitButton.setAttribute("data-bs-toggle", "modal");
  submitButton.setAttribute("data-bs-target", "#showTask");
  submitButton.innerHTML = "Open Task";
};

// search
const searchTask = (e) => {
  if (!e) e = window.event;

  while (taskContents.firstChild) {
    taskContents.removeChild(taskContents.firstChild);
  }
  const resultData = state.taskList.filter(({ title }) => {
    title.toLowerCase().includes(e.target.value.toLowerCase());
  });

  // console.log(resultData);

  resultData.map((cardData) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
  });
};
