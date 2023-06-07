import React from "react";
import { ToastContainer, toast } from "react-toastify";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthContextProvider from "./context/AuthContextProvider";
import ProductContextProvider from "./context/ProductContextProvider";
import DownloadContextProvider from "./context/DownloadContexProvider";
import PlayerContextProvider from "./context/PlayerContextProvider";
import PlaylistsContextProvider from "./context/PlaylistsContextProvider";
import FeedContextProvider from "./context/FeedContextProvider/FeedContextProvider";

import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <FeedContextProvider>
      <PlayerContextProvider>
          <PlaylistsContextProvider>
            <DownloadContextProvider>
              <ProductContextProvider>
                <AuthContextProvider>
                  <ToastContainer />
                  <App />
                </AuthContextProvider>
              </ProductContextProvider>
            </DownloadContextProvider>
          </PlaylistsContextProvider>
      </PlayerContextProvider>
    </FeedContextProvider>
  </BrowserRouter>
);
