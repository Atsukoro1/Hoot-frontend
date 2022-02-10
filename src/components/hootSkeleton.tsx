import { Skeleton } from "@mui/material";

const HootSkeleton = () => {
  return (
    <div>
        <div style={{ display: "flex" }}>
            <Skeleton variant="circular" width={50} height={50}/>
            <div>
                <Skeleton sx={{ marginLeft: 1 }} variant="text" height={30} width={270}/>
                <Skeleton sx={{ marginLeft: 1, marginTop: 0 }} variant="text" height={15} width={270}/>
            </div>
        </div>

        <Skeleton sx={{ marginTop: 1, marginBottom: 5, borderRadius: 2 }} variant="rectangular" width={330} height={148}/>
    </div>
  )
}

const HootSkeletonContainer : any = [];
for (let i = 0; i < 6; i++) {
    HootSkeletonContainer.push(<HootSkeleton key={i}/>)
}

export default HootSkeletonContainer;
