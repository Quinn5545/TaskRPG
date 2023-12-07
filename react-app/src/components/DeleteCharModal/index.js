import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  createCharacterThunk,
  deleteCharacterThunk,
  editCharacterThunk,
  getCharacterThunk,
} from "../../store/character";
import "./DeleteCharModal.css";

export default function DeleteCharModal() {
  const models = useSelector((state) => state.models.models);
  const characters = useSelector((state) => state.characters);
  const currentModel = models.find((model) => model.id === characters.model_id);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const creator_id = characters.creator_id;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteCharacterThunk(creator_id));
    dispatch(getCharacterThunk(creator_id));
    closeModal();
  };

  // useEffect(() => {
  //   dispatch(getCharacterThunk(creator_id));
  // }, [dispatch]);
  return (
    <>
      <div className="delete-modal-box">
        <div className="delete-text-box">
          <h2 className="delete-title">Delete Character</h2>
          <p className="delete-message">
            Are you sure you want to delete {characters.name}?
          </p>
        </div>
        <div className="delete-char-img-box">
          <img className="delete-char-img" src={currentModel.image_url} />
        </div>
        <div className="warning-del-char">Warning!</div>
        <div className="warning-del-char">
          This will delete all tasks associated with this character!
        </div>
        <div className="del-button-box">
          <button className="delete-button" onClick={handleSubmit}>
            Delete
          </button>
          <button className="delete-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
