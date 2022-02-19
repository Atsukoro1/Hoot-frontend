import Hoot from "./Hoot"
import { IHoot } from "../interfaces/app.interfaces"
import { AuthorIdContext } from "../App"
import { useContext } from "react"

const HootsTab = (hoots : IHoot[] | any) => {
  const currentlyLoggedUserId : any = useContext(AuthorIdContext);

  return (
    <div>
        { hoots.hoots !== [] && hoots.hoots.map((el : IHoot, idx : number) => {
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