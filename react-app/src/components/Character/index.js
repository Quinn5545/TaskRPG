import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { getCharacterThunk } from "../../store/character";
import { getModelsThunk } from "../../store/models";
import OpenModalButton from "../OpenModalButton";
import NewCharModal from "../NewCharModal";
import EditCharModal from "../EditCharModal";
import DeleteCharModal from "../DeleteCharModal";
import "./character.css";

export default function Character() {
  const { creator_id } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const characters = useSelector((state) => state.characters);
  const models = useSelector((state) => state.models.models);
  const history = useHistory();

  const specificModel = models?.filter(
    (model) => model?.id == characters?.model_id
  );

  useEffect(() => {
    dispatch(getCharacterThunk(creator_id));
    dispatch(getModelsThunk());
  }, [dispatch, sessionUser, creator_id]);

  if (!sessionUser) {
    history.push("/");
    return null;
  }

  if (sessionUser.id != creator_id) {
    history.push(`/character/${sessionUser.id}`);
  }

  return (
    <div className="character-container">
      {specificModel && Object.keys(characters).length > 0 ? (
        <>
          <OpenModalButton
            className="edit-button"
            buttonText="Edit Character"
            modalComponent={<EditCharModal />}
          />
          <h1>{characters?.name}</h1>
          <img
            className="model-img"
            src={specificModel[0]?.image_url}
            alt="Character Model"
          />
          <div>
            <div className="characters-level">
              Character Level: {characters.level}
            </div>
            <div className="characters-xp">XP: {characters.xp}/10</div>
            <div className="delete-button-box">
              <OpenModalButton
                className="delete-button"
                buttonText="Delete Character"
                modalComponent={<DeleteCharModal />}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="new-character-section">
          <div className="newCharTitle">
            You Don't Have a Character Yet! Create One to Start Your Journey!
          </div>
          <OpenModalButton
            className="new-char-modal-button"
            buttonText="Create New Character!"
            modalComponent={<NewCharModal />}
          />
        </div>
      )}
    </div>
  );
}
