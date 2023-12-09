const GET_TASK = "tasks/getTasks";
const CREATE_TASK = "tasks/createTasks";
const EDIT_TASK = "tasks/editTasks";
const DELETE_TASK = "tasks/deleteTasks";

// Action Creator
const getTasks = (tasks) => {
  return {
    type: GET_TASK,
    tasks,
  };
};

const createTasks = (tasks) => {
  return {
    type: CREATE_TASK,
    tasks,
  };
};

const editTasks = (tasks) => {
  return {
    type: EDIT_TASK,
    tasks,
  };
};

const deleteTasks = (tasks) => {
  return {
    type: DELETE_TASK,
    tasks,
  };
};

// Thunk
export const getTasksThunk = (character_id) => async (dispatch) => {
  try {
    const res = await fetch(`/api/tasks/${character_id}`);

    if (res.ok) {
      const data = await res.json();
      //   console.log("data", data);
      dispatch(getTasks(data));
      return data;
    }
  } catch (error) {
    console.error("Error ---->", error);
  }
};

export const createTasksThunk = (taskData) => async (dispatch) => {
  try {
    const res = await fetch(`/api/tasks/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (res.ok) {
      const data = await res.json();
      //   console.log("data------>", data);
      dispatch(createTasks(data));
      return data;
    }
  } catch (error) {
    console.error("Error ---->", error);
  }
};

export const editTasksThunk = (task_id, task_data) => async (dispatch) => {
  try {
    const res = await fetch(`/api/tasks/${task_id}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task_data),
    });

    if (res.ok) {
      const data = await res.json();
      //   console.log("store---->", data);
      dispatch(editTasks(data));
      return data;
    }
  } catch (error) {
    console.error("Error ---->", error);
  }
};

export const deleteTasksThunk = (task_id) => async (dispatch) => {
  try {
    const res = await fetch(`/api/tasks/${task_id}/delete`, {
      method: "DELETE",
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(deleteTasks(data));
      return data;
    }
  } catch (error) {
    console.error("Error ---->", error);
  }
};

// Reducer
const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TASK: {
      const newState = {};
      action.tasks.forEach((task) => {
        newState[task.id] = task;
      });
      return newState;
    }

    case CREATE_TASK:
      return {
        ...state,
        [action.tasks.id]: action.tasks,
      };

    case EDIT_TASK:
      return {
        ...state,
        [action.tasks.id]: action.tasks,
      };

    case DELETE_TASK:
      const newState = { ...state };
      console.log("action------>", action);
      delete newState[action.tasks.id];
      return newState;

    default:
      return state;
  }
};

export default tasksReducer;
