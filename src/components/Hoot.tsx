// Import MUI library components and icons
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Import interfaces
import { hootProps } from "../interfaces/hoot.interfaces";

// Import self-made components
import EditPostModal from "./EditPostModal";

// Import content
import { AuthorIdContext } from "../App";

// Import from other libraries
import React, { useState, useContext } from "react";
import axios from "axios";

// Create a new Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

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
  onDelete,
  onEdit
}: hootProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editModalOpened, setEditModalOpened] = useState<boolean>(false);
  const currentlyLoggedUserId = useContext(AuthorIdContext);
  const open = Boolean(anchorEl);

  // When user clicks on hoot's author avatar or name, 
  // he will be redirected to the author's profile
  const redirectToProfile = () => {
    window.location.href = "/profile?id=" + author._id
  };

  // Delete a post when user clicks the "Delete" item in post menu
  const deletePost = async() => {
    const request = await axiosInstance.delete("/api/hoots?id=" + _id);
    setAnchorEl(null);

    if(!request.data.success) return;

    onDelete(_id);
  }

  // Edit the post when user clicks the edit button in edit modal
  const editPost = async(content:string) => {
    const request = await axiosInstance.patch("/api/hoots", {
      textContent: content,
      id: _id
    });

    if(!request.data.success) return;

    onEdit(_id, content);
    setEditModalOpened(false);
  };

  // Open edit modal when user clicks the edit button
  const openEditModal = () => {
    setEditModalOpened(true);
    setAnchorEl(null);
  }

  // Close edit modal when user clicks the close button on edit modal
  const closeEditModal = () => {
    setEditModalOpened(false);
  }

  return (
    <div>
      <Card sx={{ width: 330, marginBottom: 2 }}>
      <CardHeader

        avatar={
          <Avatar onClick={redirectToProfile} sx={{ bgcolor: "lightpurple", "&:hover": { "cursor": "pointer" } }} aria-label="recipe">
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
        title={
          <label onClick={redirectToProfile}>
            { author?.username.toString() }
          </label>
        }
        subheader={new Date(createdAt).toLocaleString("en-US")}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          { textContent }
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
              { bookmarked ? <BookmarkAddIcon /> : <BookmarkAddOutlinedIcon /> }
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
        { currentlyLoggedUserId !== author._id &&
          <MenuItem onClick={() => { setAnchorEl(null); }}>
            Report
          </MenuItem>
        }

        { currentlyLoggedUserId === author._id &&
          <MenuItem onClick={openEditModal}>
            Edit
          </MenuItem>
        }

        { currentlyLoggedUserId === author._id &&
          <MenuItem onClick={deletePost}>
            Delete
          </MenuItem>
        }
      </Menu>
    </Card>

    <Dialog onClose={closeEditModal} open={editModalOpened}>
      <EditPostModal onEdit={(content:string) => editPost(content)} onClose={closeEditModal}></EditPostModal>
    </Dialog>
    </div>
  );
};

export default Hoot;
