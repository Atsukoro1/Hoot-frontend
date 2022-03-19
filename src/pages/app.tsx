// MUI library components
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

// Other libraries
import { useState, useEffect } from "react";
import axios from "axios";

// Interfaces
import { IUserResponse, IHoot, IHootResponse } from "../interfaces/app.interfaces";

// Self-made components
import HootSkeleton from "../components/HootSkeleton";
import Hoot from "../components/Hoot";
import PostInput from "../components/PostInput";

// Redux things
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../slices/user.slice";
import { setHoots, remove, add, editContent, react, bookmark } from "slices/hoots.slice";

// Create a new axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

const AppPage = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [backdropOpened, setBackdropOpened] = useState<boolean>(false);

  const user = useSelector((state : any) => state.user);
  const hoots = useSelector((state : any) => state.hoots);
  const dispatch = useDispatch();

  // Fetch new page and push to hoots when "Fetch new hoots button is clicked"
  const fetchNewPage = () => {
    setPage(page + 1);
    fetchPosts(page);
  };

  // Fetch the posts from api based on the page
  const fetchPosts = async (toSetPage: number): Promise<void> => {
    setBackdropOpened(true);

    const req: IHootResponse = await axiosInstance.get("/api/user/@me/feed?page=" + toSetPage);
    if (req.data?.success && page !== 1) {
      const arrayCopy = [...hoots];
      req.data.data.docs.map((el : IHoot) => {
        return arrayCopy.push(el);
      });

      dispatch(setHoots(arrayCopy));
      setTotalPages(req.data.data.totalPages);
    } else {
      dispatch(setHoots(req.data?.data.docs));
      setTotalPages(req.data?.data.totalPages);
    }

    setBackdropOpened(false);
  };

  // Fetch currently logged user from api
  const fetchUser = async (): Promise<void> => {
    const req: IUserResponse = await axiosInstance.get("/api/user/@me/");
    if (req.data?.success) dispatch(setUser(req.data?.data));
    document.cookie = "id=" + req.data?.data?._id;
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
      <PostInput onPostCreate={(post : any) => dispatch(add(post))}/>
      
      <div style={{ width: "fit-content", marginLeft: "auto", marginRight: "auto", marginBottom: 10 }}>
        {hoots.length === 0 && HootSkeleton}

        {hoots.length > 0 &&
          hoots.map((element : IHoot, idx : number) => {
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
                onReaction={(id) => { dispatch(react({ hootId: id, userId: user._id })) }}
                onBookMark={(id) => { dispatch(bookmark(id)) }}
                onDelete={(id) => { dispatch(remove(id)) }}
                onEdit={(id : any, content: any) => { dispatch(editContent({ id: id, content: content })) }}
              />
            );
          })}

          { page !== totalPages && <Button onClick={fetchNewPage} sx={{ width: "100%" }}>Load more posts</Button> }
      </div>

      <Backdrop sx={{ zIndex: 3 }} onClick={() => { setBackdropOpened(false) }} open={backdropOpened}>
        <CircularProgress/>
      </Backdrop>
    </div>
  );
};

export default AppPage;
