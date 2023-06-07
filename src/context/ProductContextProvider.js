import axios from "axios";
import React, { createContext, useContext, useReducer, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import confAxios from "../config/confAxios";
import { ACTIONS } from "../helpers/const";
export const productContext = createContext();
export const useProducts = () => useContext(productContext);
export const API = "http://34.125.87.211";

const ProductContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [songs, setSongs] = useState("");
  const [artists, setArtists] = useState("");
  const [albums, setAlbums] = useState("");
  console.log(filter);

  // ! Search
  const [searchParams, setSearchParams] = useSearchParams();

  async function search(query, endpoint, setData) {
    const url = `${API}/${endpoint}/?search=${query}`;
    try {
      const res = await axios.get(url);
      setData(res.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = () => {
    search(query, "songs", setSongs);
    search(query, "artists", setArtists);
    search(query, "albums", setAlbums);
  };


  async function getSongfilter(query) {
    const url = `${API}/songs/?genre=${query}`;
    try {
      const res = await axios.get(url);
      setFilter(res.data.results);
    } catch (error) {
      console.log("error");
    }
  }

  const values = {
    search,
    inputValue,
    setInputValue,
    setSearchParams,
    searchParams,
    setSelectedRating,
    title,
    setTitle,
    description,
    setDescription,
    filter,
    getSongfilter,
  };

  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;