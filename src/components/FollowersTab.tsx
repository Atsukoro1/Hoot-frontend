import Follower from "./Follower"

const FollowersTab = ({ followers } : any) => {
  return (
    <div>
      { followers && followers.map((el : any, idx : number) => {
        return <Follower key={idx} _id={el._id} username={el.username}/>
      }) }
    </div>
  )
}

export default FollowersTab