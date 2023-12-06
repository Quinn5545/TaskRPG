const GET_CHARACTER = "characters/getCharacter";
const CREATE_NEW_CHARACTER = "characters/newCharacter";
const EDIT_CHARACTER = "characters/editCharacter";
const DELETE_CHARACTER = "characters/deleteCharacter";

// Action Creator
const getCharacter = (character) => {
  return {
    type: GET_CHARACTER,
    character,
  };
};

const newCharacter = (character) => {
  return {
    type: CREATE_NEW_CHARACTER,
    character,
  };
};

const editCharacter = (character) => {
  return {
    type: EDIT_CHARACTER,
    character,
  };
};

const deleteCharacter = (creator_id) => {
  return {
    type: DELETE_CHARACTER,
    creator_id,
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

export const createCharacterThunk = (character_data) => async (dispatch) => {
  try {
    const res = await fetch(`/api/character/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(character_data),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("dataaaaaaaaaa=====>", data);
      dispatch(newCharacter(data));
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const editCharacterThunk =
  (creator_id, character_data) => async (dispatch) => {
    try {
      const res = await fetch(`/api/character/${creator_id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(character_data),
      });
      if (res.ok) {
        const updatedSpot = await res.json();
        dispatch(editCharacter(updatedSpot));
        return updatedSpot;
      }
    } catch (error) {
      console.error(error);
    }
  };

export const deleteCharacterThunk = (creator_id) => async (dispatch) => {
  //   console.log(creator_id);
  try {
    const res = await fetch(`/api/character/${creator_id}/delete`, {
      method: "DELETE",
    });

    if (res.ok) {
      const data = await res.json();
      await dispatch(deleteCharacter(data));
      await dispatch(getCharacter());
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

// Reducer
const characterReducer = (state = {}, action) => {
  const charAfterChange = { ...state };
  switch (action.type) {
    case GET_CHARACTER: {
      const newState = { ...state, ...action.character };
      //   console.log("action ====>", action);
      return newState;
    }
    case CREATE_NEW_CHARACTER: {
      return { ...state, ...action.character };
    }
    case EDIT_CHARACTER: {
      return { ...state, ...action.character };
    }
    case DELETE_CHARACTER:
      return {};
    default:
      return state;
  }
};

export default characterReducer;
