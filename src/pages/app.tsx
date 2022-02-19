// MUI library components
import Pagination from "@mui/material/Pagination";

// Other libraries
import React, { useState, useEffect } from "react";
import axios from "axios";

// Interfaces
import { IUser, IUserResponse, IHoot, IHootResponse } from "../interfaces/app.interfaces";

// Self-made components
import HootSkeleton from "../components/HootSkeleton";
import Hoot from "../components/Hoot";
import PostInput from "../components/PostInput";

// Create a new axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

const AppPage = () => {
  const [user, setUser] = useState<IUser>();
  const [hoots, setHoots] = useState<IHoot[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Change the page and fetch the posts depending on it
  const handlePage = async (event: React.SyntheticEvent<unknown>, pageNumber: number): Promise<void> => {
    setPage(pageNumber);
    fetchPosts(pageNumber);
  };

  // Fetch the posts from api based on the page
  const fetchPosts = async (toSetPage: number): Promise<void> => {
    const req: IHootResponse = await axiosInstance.get("/api/user/@me/feed?page=" + toSetPage);
    if (req.data?.success) {
      setHoots(req.data.data?.docs);
      setTotalPages(req.data.data.totalPages);
    }
  };

  // Fetch currently logged user from api
  const fetchUser = async (): Promise<void> => {
    const req: IUserResponse = await axiosInstance.get("/api/user/@me/");
    if (req.data?.success) setUser(req.data.data);
    document.cookie = "id=" + req.data?.data?._id;
  };

  // React, or remove reaction from posts
  const react = async (id: string): Promise<void> => {
    const method = hoots.find((el) => el._id === id.toString())?.hearts?.find((he) => he === user?._id.toString()) ? "DELETE" : "PUT";
    const req = await axiosInstance({
      method: method, 
      url: "/api/hoots/reactions",
      data: { id } 
    });
    if (!req.data.success) return;

    const arrayCopy = [...hoots];
    const element : any = arrayCopy.find(specHoot => specHoot._id === id.toString());
    const elementIndex = arrayCopy.indexOf(element);

    if(method === "PUT") {
      element?.hearts?.push(user?._id || "");
    } else {
      const uIndex : number | any = element?.hearts?.indexOf(user?._id || "");
      if(uIndex !== -1) element?.hearts?.splice(uIndex, 1);
    };

    arrayCopy[elementIndex] = element;
    setHoots(arrayCopy);
  };

  // Remove post
  const remove = async (id: string): Promise<void> => {
    const arrayCopy = [...hoots];
    const removePost : any = arrayCopy.find(el => el._id === id);
    const index = arrayCopy.indexOf(removePost);
    arrayCopy.splice(index, 1);
    setHoots(arrayCopy);
  };

  // Edit post content
  const edit = async (id: string, content: string): Promise<void> => {
    const arrayCopy = [...hoots];
    let postToEdit : any = arrayCopy.find(el => el._id === id);
    const postIndex : any = arrayCopy.indexOf(postToEdit);
    postToEdit.textContent = content;
    arrayCopy[postIndex] = postToEdit;
    setHoots(arrayCopy);
  }

  // Bookmark post
  const bookmark = async (id: string): Promise<void> => {
    const req = await axiosInstance.post("/api/user/@me/bookmarks?id=" + id);
    console.log(req);
  };

  // Display new post to user when currently logged user posts something
  const displayNewPost = (hootContent : IHoot) => {
    const arrayCopy = [...hoots];

    // Push the new hoot to array and remove the last to keep length of 10
    arrayCopy.unshift(hootContent);
    arrayCopy.pop();

    setHoots(arrayCopy);
  }

  // Runs on the page load
  // Loads user data and user feed
  useEffect(() => {
    async function load() {
      await fetchUser();
      await fetchPosts(page);
    }

    load();
  }, [page]);

  return (
    <div>
      <PostInput onPostCreate={displayNewPost}/>
      
      <div style={{ width: "fit-content", marginLeft: "auto", marginRight: "auto" }}>
        {hoots.length === 0 && HootSkeleton}

        {hoots.length > 0 &&
          hoots.map((element, idx) => {
            return (
              <Hoot
                key={idx}
                _id={element._id}
                textContent={element.textContent}
                author={element.author}
                hashtags={element.hashtags}
                createdAt={element.createdAt}
                hearts={element.hearts}
                favorite={element.hearts?.includes(user?._id ? user?._id : "")}
                bookmarked={false}
                onReaction={react}
                onBookMark={bookmark}
                onDelete={remove}
                onEdit={edit}
              />
            );
          })}

        {hoots.length > 0 && (
          <div style={{ width: "fit-content", margin: "auto" }}>
            <Pagination page={page} onChange={handlePage} count={totalPages} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AppPage;
