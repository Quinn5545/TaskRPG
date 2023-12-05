import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacterThunk } from "../../store/character";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { getModelsThunk } from "../../store/models";

export default function Character() {
  const { creator_id } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const characters = useSelector((state) => state.characters);
  const models = useSelector((state) => state.models.models);
  const history = useHistory();

  //   console.log(creator_id);
  console.log(characters);
  //   console.log(models);
  //   console.log(sessionUser.id);
  const specificModel = models?.filter(
    (model) => model?.id == characters?.model_id
  );

  //   console.log(specificModel[0]?.image_url);

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
    <div>
      {specificModel && Object.keys(characters).length > 0 && (
        <>
          <h1>{characters?.name}</h1>
          <img
            className="model-img"
            src={specificModel[0]?.image_url}
            alt="Character Model"
          />
          <div>
            <div className="characters-level">{characters.level}</div>
            <div className="characters-xp">{characters.xp}</div>
          </div>
        </>
      )}

      {/* //todo make new character form */}
      <div>No character found</div>
    </div>
  );
}
