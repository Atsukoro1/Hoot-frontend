import Follower from "./Follower"

const FollowingTab = ({ followers } : any) => {
  return (
    <div style={{ width: "fit-content", marginLeft: "auto", marginRight: "auto" }}>
      { followers && followers.map((el : any, idx : number) => {
        return <Follower key={idx} _id={el.to._id} username={el.to.username} createdAt={el.createdAt}/>
      }) }
    </div>
  )
}

export default FollowingTab