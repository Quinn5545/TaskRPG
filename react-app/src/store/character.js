const GET_CHARACTER = "characters/getCharacter";

// Action Creator
const getCharacter = (character) => {
  return {
    type: GET_CHARACTER,
    character,
  };
};

// Thunk
export const getCharacterThunk = (creator_id) => async (dispatch) => {
  //   console.log("character_id ======>", character_id);
  try {
    const res = await fetch(`/api/character/${creator_id}`);

    if (res.ok) {
      const data = await res.json();
      dispatch(getCharacter(data));
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

// Reducer
const characterReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CHARACTER: {
      const newState = { ...state, ...action.character };
      //   console.log("action ====>", action);
      return newState;
    }
    default:
      return state;
  }
};

export default characterReducer;
