import Follower from "./Follower"

const FollowingTab = ({ followers } : any) => {
  return (
    <div>
      { followers && followers.map((el : any, idx : number) => {
        return <Follower key={idx} _id={el.to._id} username={el.to.username} createdAt={el.createdAt}/>
      }) }
    </div>
  )
}

export default FollowingTab