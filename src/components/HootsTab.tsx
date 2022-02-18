import Hoot from "./Hoot"
import { IHoot } from "../interfaces/app.interfaces"

const HootsTab = (hoots : IHoot[] | any) => {
  return (
    <div>
        { hoots.hoots !== [] && hoots.hoots.map((el : any, idx : any) => {
            return <Hoot 
                key={idx}
                _id={el._id}
                textContent={el.textContent}
                author={el.author}
                hashtags={el.hashtags}
                createdAt={el.createdAt}
                hearts={el.hearts}
                favorite={true}
                onBookMark={() => {}}
                onReaction={() => {}}
            />
        }) }
    </div>
  )
}

export default HootsTab