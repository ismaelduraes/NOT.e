import axios from "axios";
import { React, useState, useEffect } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { getImagesByQuery } from "../Functions/ImageManager";

function ImageSearch(props) {
    const [images, setImages] = useState([]);
    const [queryString, setQueryString] = useState("Nature");

    useEffect(() => {
        getImagesByQuery(queryString).then((r) => setImages(r));
    }, [queryString]);

    return (
        <div className="image_search_container">
            <div className="results">
                <header className="header">
                    <h1 className="title">Encontrar imagens</h1>
                    <CloseRoundedIcon
                        className="prompt_close"
                        onClick={() => {
                            props.setImageSearchVisible(false);
                        }}
                    />
                </header>
                <div className="searchbar_container">
                    <div className="searchbar">
                        <SearchRoundedIcon className="icon" />
                        <input
                            placeholder="Pesquisar"
                            onChange={(e) => {
                                if (e.target.value == "") {
                                    setQueryString("Nature");
                                } else {
                                    setQueryString(e.target.value);
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="img_grid">
                    {images
                        ? images.map((item) => {
                              return (
                                  <img
                                      key={item.id}
                                      src={item.largeImageURL}
                                      alt=""
                                      className="img_search_item"
                                      onClick={() => {
                                          props.setImageId(item.id);
                                          props.setImageSearchVisible(false);
                                      }}
                                  />
                              );
                          })
                        : null}
                </div>
            </div>
        </div>
    );
}

export default ImageSearch;
