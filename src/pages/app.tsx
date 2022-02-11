import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import {
  IUser,
  IUserResponse,
  IHoot,
  IHootResponse,
} from "../interfaces/app.interfaces";
import HootSkeleton from "../components/hootSkeleton";
import Hoot from "../components/hoot";
import SelectMenu from "../components/selectMenu";
import Navbar from "../components/navbar";
import PostInput from "../components/postInput";

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

  // Bookmark post
  const bookmark = async (id: string): Promise<void> => {
    const req = await axiosInstance.post("/api/user/@me/bookmarks?id=" + id);
    console.log(req);
  };

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
      <Navbar/>
      <PostInput/>
      
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
                createdAt={element.createdAt}
                hearts={element.hearts}
                favorite={element.hearts?.includes(user?._id ? user?._id : "")}
                bookmarked={false}
                onReaction={react}
                onBookMark={bookmark}
              />
            );
          })}

        {hoots.length > 0 && (
          <div style={{ width: "fit-content", margin: "auto" }}>
            <Pagination page={page} onChange={handlePage} count={totalPages} />
          </div>
        )}

        <SelectMenu />
      </div>
    </div>
  );
};

export default AppPage;
