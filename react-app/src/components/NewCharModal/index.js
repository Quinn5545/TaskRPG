import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createCharacterThunk } from "../../store/character";
import "./NewCharModal.css";

export default function NewCharModal() {
  const models = useSelector((state) => state.models.models);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState("");
  const [selectedModel, setSelectedModel] = useState(null);

  //   console.log(models);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createCharacterThunk({ name, model_id: selectedModel.id }));

    closeModal();
  };

  return (
    <div className="NewCharModal">
      <h2 className="new-char-title">Create a New Character</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Character Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <div>
          <p>Select a Character Model:</p>
        </div>
        <div>
          <div className="new-icon-select">
            {models.map((model) => (
              <div
                key={model.id}
                className={`model-item ${
                  selectedModel?.id === model.id ? "selected" : ""
                }`}
                onClick={() => setSelectedModel(model)}
              >
                {/* <p>{model.name}</p> */}
                <img src={model.image_url} alt={`Model ${model.id}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="tabs-container">
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
          <button disabled={!name || !selectedModel} type="submit">
            Create Character
          </button>
        </div>
      </form>
    </div>
  );
}
