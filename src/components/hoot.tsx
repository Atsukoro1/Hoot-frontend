import { hootProps } from "../interfaces/hoot.interfaces";

import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Badge,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  Visibility as VisibilityIcon,
  MoreVert as MoreVertIcon,
  BookmarkAdd as BookMarkAddIcon,
  BookmarkAddOutlined as BookmarkAddOutlinedIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";

const Hoot = ({
  _id,
  author,
  hearts,
  textContent,
  createdAt,
  favorite,
  bookmarked,
  onBookMark,
  onReaction,
}: hootProps) => {
  return (
    <Card sx={{ width: 330, marginBottom: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "lightpurple" }} aria-label="recipe">
            {author?.username.slice(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={author?.username.toString()}
        subheader={new Date(createdAt).toLocaleString("en-US")}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {textContent}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          onClick={() => {
            onReaction(_id);
          }}
          color="primary"
          aria-label="Add this post to favorites"
        >
          {favorite ? (
            <Badge badgeContent={hearts.length} max={999} color="primary">
              <FavoriteIcon />
            </Badge>
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <IconButton
          onClick={() => {
            onBookMark(_id);
          }}
          color="primary"
          aria-label="Bookmark post"
        >
          {bookmarked ? <BookMarkAddIcon /> : <BookmarkAddOutlinedIcon />}
        </IconButton>
        <IconButton color="primary" aria-label="View this post">
          <VisibilityIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Hoot;
