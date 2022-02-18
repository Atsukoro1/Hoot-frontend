import Follower from "./Follower"

const FollowersTab = ({ followers } : any) => {
  return (
    <div>
      { followers && followers.map((el : any, idx : number) => {
        return <Follower key={idx} _id={el.from._id} username={el.from.username} createdAt={el.createdAt}/>
      }) }
    </div>
  )
}

export default FollowersTab