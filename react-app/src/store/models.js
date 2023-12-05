const GET_MODELS = "models/getModels";

// Action Creator
const getModels = (models) => {
  return {
    type: GET_MODELS,
    models,
  };
};

// Thunk
export const getModelsThunk = () => async (dispatch) => {
  try {
    const res = await fetch(`/api/models/all`);

    // console.log(res);
    if (res.ok) {
      const data = await res.json();
      dispatch(getModels(data));
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

// Reducer
const modelsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MODELS: {
      const newState = { ...state, models: action.models };
      //   console.log("action ====>", action);
      return newState;
    }
    default:
      return state;
  }
};

export default modelsReducer;
