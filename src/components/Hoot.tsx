import { hootProps } from "../interfaces/hoot.interfaces";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
  Chip
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
  hashtags,
  textContent,
  createdAt,
  favorite,
  bookmarked,
  onBookMark,
  onReaction,
}: hootProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <Card sx={{ width: 330, marginBottom: 2 }}>
      <CardHeader
        onClick={() => { window.location.href = "/profile?id=" + author._id }}
        avatar={
          <Avatar sx={{ bgcolor: "lightpurple", "&:hover": { "cursor": "pointer" } }} aria-label="recipe">
            {author?.username.slice(0, 1)}
          </Avatar>
        }
        action={
          <IconButton
            onClick={(event: React.SyntheticEvent<HTMLButtonElement>) => {
              setAnchorEl(event.currentTarget);
            }}
            aria-label="settings"
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={author?.username.toString()}
        subheader={new Date(createdAt).toLocaleString("en-US")}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {textContent}
          <br />
          {hashtags.map((el : string, idx : number) => {
            return <Chip key={idx} label={el} onClick={() => {}}></Chip>
          })}
        </Typography>
      </CardContent>
      <CardActions>

        <Tooltip title="Favorite">
          <IconButton
            onClick={() => { onReaction(_id); }}
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
        </Tooltip>

        <Tooltip title="Bookmark">
          <IconButton
            onClick={() => { onBookMark(_id); }}
            color="primary"
            aria-label="Bookmark post">
              {bookmarked ? <BookMarkAddIcon /> : <BookmarkAddOutlinedIcon />}
          </IconButton>
        </Tooltip>

        <Tooltip title="View">
          <IconButton color="primary" aria-label="View this post">
            <VisibilityIcon />
          </IconButton>
        </Tooltip>

      </CardActions>

      <Menu
        id="options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => { setAnchorEl(null); }}
      >
        <MenuItem onClick={() => { setAnchorEl(null); }}>
          Report
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default Hoot;
