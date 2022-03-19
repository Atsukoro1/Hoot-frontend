// React dependencies
import { useEffect, useContext } from "react";

// Context, interfaces and components
import Hoot from "./Hoot";
import { IHoot } from "../interfaces/app.interfaces";
import { AuthorIdContext } from "../App";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setHoots, remove, add, editContent, react, bookmark } from "slices/hoots.slice";

const HootsTab = (hoots : IHoot[] | any) => {
  const hoot = useSelector((state : any) => state.hoots);
  const dispatch = useDispatch();

  const currentlyLoggedUserId : any = useContext(AuthorIdContext);

  useEffect(() => {
    dispatch(setHoots(hoots.hoots));
  }, []);

  return (
    <div style={{ width: "fit-content", marginLeft: "auto", marginRight: "auto" }}>
        { hoot !== [] && hoot.map((el : IHoot, idx : number) => {
            return <Hoot 
                key={idx}
                _id={el._id}
                textContent={el.textContent}
                author={el.author}
                hashtags={el.hashtags}
                createdAt={el.createdAt}
                hearts={el.hearts}
                favorite={el.hearts?.includes(currentlyLoggedUserId)}
                onBookMark={() => {}}
                onReaction={() => {}}
                onDelete={() => {}}
                onEdit={() => {}}
            />
        }) }
    </div>
  )
}

export default HootsTab