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
        <button type='button' class='btn btn-outline-info mr-1.5' name=${id}>
          <i class='fas fa-pencil-alt name=${id}'></i>
        </button>
        <button type='button' class='btn btn-outline-danger mr-1.5' name=${id}>
          <i class='fas fa-trash name=${id}'></i>
        </button>
      </div>
      <div class='card-body'>
        ${
          url &&
          `<img width="100%" src=${url} alt='Card' class='card-img-top md-3 rounded-lg' />`
        }
        <h4 class='card-title task__card__title'>${title}</h4>
        <p class='description trim-3-lines text-muted'>${description}</p>
        <div class='tags text-white d-flex-wrap'>
          <span class='badge bg-primary m-1'>${type}</span>
        </div>
      </div>
      <div class='card-footer'>
        <button type='button' class='btn btn-outline-primary float-right data-bs-toggle="modal" data-bs-target="#showTask"'>Open Task</button>
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
      url &&
      `<img width="100%" src=${url} alt='Card' class='img-fluid place__holder__image mb-3' />`
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
