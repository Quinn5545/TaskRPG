import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  createCharacterThunk,
  editCharacterThunk,
} from "../../store/character";
import "./EditCharModal.css";

export default function EditCharModal() {
  const models = useSelector((state) => state.models.models);
  const characters = useSelector((state) => state.characters);
  const previousModel = models.find(
    (model) => model.id === characters.model_id
  );
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState(characters.name);
  const [selectedModel, setSelectedModel] = useState(previousModel);
  //   console.log(selectedModel);

  //   console.log(characters);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      editCharacterThunk(characters.creator_id, {
        name,
        model_id: selectedModel.id,
      })
    );

    closeModal();
  };

  return (
    <div className="EditCharModal">
      <h2 className="edit-char-title">Edit Your Character!</h2>
      <form className="edit-char-form" onSubmit={handleSubmit}>
        <label className="edit-char-label">
          Character Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="edit-char-input"
          />
        </label>

        <div>
          <p className="edit-select-char-text">Select a Character Model:</p>
          <div className="edit-icon-selection">
            {models.map((model) => (
              <div
                key={model.id}
                className={`model-item ${
                  selectedModel?.id === model.id ? "selected" : ""
                }`}
                onClick={() => setSelectedModel(model)}
              >
                <img
                  className="edit-model-img"
                  src={model.image_url}
                  alt={`Model ${model.id}`}
                />
                {/* <p className="edit-model-name">{model.name}</p> */}
              </div>
            ))}
          </div>
        </div>
        <div className="tabs-container">
          <button type="button" onClick={closeModal}>
            Cancel Edits
          </button>
          <button
            className="edit-char-submit-button"
            disabled={!name || !selectedModel}
            type="submit"
          >
            Save Edits
          </button>
        </div>
      </form>
    </div>
  );
}
