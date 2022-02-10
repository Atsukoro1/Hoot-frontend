import React, { useState, useEffect } from "react";
import axios from "axios";

import { Pagination } from "@mui/material";

import { IUser, IUserResponse, IHoot, IHootResponse } from "../interfaces/app.interfaces";

import HootSkeleton from "../components/hootSkeleton";
import Hoot from "../components/hoot";
import SelectMenu from "../components/selectMenu";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true
});

const AppPage = () => {
    const [user, setUser] = useState<IUser>();
    const [hoots, setHoots] = useState<IHoot[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const handlePage = async (event: React.SyntheticEvent<unknown>, pageNumber: number) : Promise<void> => {
        setPage(pageNumber);
        fetchPosts(pageNumber);
    }

    const fetchPosts = async (toSetPage: number) : Promise<void> => {
        const req : IHootResponse = await axiosInstance.get("/api/user/@me/feed?page=" + toSetPage);
        if(req.data?.success) {
            setHoots(req.data.data?.docs);
            setTotalPages(req.data.data.totalPages);
        }
    }

    const fetchUser = async () : Promise<void> => {
        const req : IUserResponse = await axiosInstance.get("/api/user/@me/");
        if(req.data?.success) setUser(req.data.data);
    }

    const react = async (id: string) : Promise<void> => {
        const method = hoots.find(el => el._id === id.toString())?.hearts?.find(he => he === user?._id.toString()) ? "DELETE" : "PUT";
        const req = await axiosInstance({
            method: method,
            url: "/api/hoots/reactions",
            data: {
                id
            }
        });
        if(!req.data.success) return;

        switch (method) {
            case "DELETE":
                break;

            case "PUT":
                const copiedArray : IHoot[] = hoots; 
                copiedArray.find(el => el._id === id.toString())?.hearts?.push(user?._id.toString() || "");
                setHoots(copiedArray);
                break;
        }
    }

    const bookmark = async (id: string) : Promise<void> => {
        console.log("Bookmark post " + id);
    }

    useEffect(() => {
        async function load() {
            await fetchUser();
            await fetchPosts(page);
        }

        load();
    }, [page]);

    return (
        <div>
            <div style={{ width: "fit-content", marginLeft: "auto", marginRight: "auto" }}>
                {hoots.length === 0 && HootSkeleton}
                {hoots.length > 0 && hoots.map((element, idx) => {
                    return <Hoot key={idx} _id={element._id} textContent={element.textContent} author={element.author} createdAt={element.createdAt} hearts={element.hearts} favorite={element.hearts?.includes(user?._id ? user?._id : "")} bookmarked={false} onReaction={react} onBookMark={bookmark} />
                })}
                {hoots.length > 0 && <div style={{ width: "fit-content", margin: "auto" }}><Pagination page={page} onChange={handlePage} count={totalPages}/></div>}

                <SelectMenu/>
            </div>
        </div>
    )
};

export default AppPage;
