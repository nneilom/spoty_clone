import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import classes from "../style/Main.module.css";
import { useProducts } from "../context/ProductContextProvider";
import { useFeedDataLists } from "../context/FeedContextProvider/FeedContextProvider";
import deleteBtn from "../assets/Delete_icon.svg";
import FilterBlock from "./FilterBlock";
import play_btn from "../assets/Play.svg";

const SearchPage = () => {
  const {
    inputValue,
    searchParams,
    search,
    songs,
    setSongs,
    setArtists,
    setAlbumsSearch,
    filter,
  } = useProducts();
  const navigate = useNavigate();

  const { artists, albums } = useFeedDataLists();

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      search(query, "songs", setSongs);
      search(query, "artists", setArtists);
      search(query, "albums", setAlbumsSearch);
    }
  }, [searchParams]);

  const handleSearch = () => {
    search(inputValue, "songs", setSongs);
    search(inputValue, "artists", setArtists);
    search(inputValue, "albums", setAlbumsSearch);

    navigate(`?query=${encodeURIComponent(inputValue)}`);
  };

  return (
    <MainLayout>
      <div className={classes.container}>
        <div className={classes.contentWrapper}>
          <div className={classes.genreComponent}>
            <div className={classes.genreBox}></div>
          </div>

          <div>
            {songs?.length > 0 && (
              <div>
                <h2>Songs</h2>
                <ul>
                  {songs
                    .filter(
                      (song) =>
                        song.artist[1] &&
                        song.title
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                    )
                    .map((song) => (
                      <li key={song.id}>{song.title}</li>
                    ))}
                </ul>
              </div>
            )}
            {artists.length > 0 && (
              <div>
                <FilterBlock />
                {filter.length
                  ? filter.map((elem, index) => {
                      return (
                        <div key={elem.id}>
                          <div
                            className={classes.track_line}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "80%",
                              margin: "5vh auto",
                              border: "white 1px solid",
                              borderRadius: "15px",
                            }}
                          >
                            <div
                              className={classes.track_line_section}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                margin: "5vh ",
                              }}
                            >
                              <div className={classes.favorites}>
                                <img
                                  src={play_btn}
                                  alt=""
                                  style={{
                                    margin: "5vh ",
                                  }}
                                />
                              </div>
                              <img src={elem.cover_photo} width={48} alt="" />
                              <div
                                className={classes.track_line_section_name}
                                style={{
                                  margin: "5vh ",
                                }}
                              >
                                <h4> {elem.title} </h4>
                                <h5> {elem.artist[1]} </h5>
                              </div>
                            </div>
                            <div className={classes.album}>{elem.album[0]}</div>
                            <div className={classes.dateAdd}>1 day ago</div>
                            <div className={classes.time}>3:22</div>
                            <div className={classes.favorites}>
                              <img src={deleteBtn} alt="" />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : null}
                <h2>Artists</h2>
                <div className={classes.artistBox}>
                  {artists
                    .filter((artist) =>
                      artist.full_name
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    )
                    .map((artist) => (
                      <div
                        style={{ margin: "5vh" }}
                        className={classes.preview}
                        key={artist.id}
                        onClick={() => navigate(`/artist-page/${artist.id}`)}
                      >
                        <div className={classes.cardPreview}>
                          <img src={artist.photo} alt="" />
                          <p>{artist.full_name}</p>
                          <div className={classes.icon_play}>
                            <div className={classes.circle_play}>
                              <div className={classes.triangle_play}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {albums.length > 0 && (
              <div className={classes.ablumsSectio}>
                <h2>Albums</h2>

                <div className={classes.artistBox}>
                  {albums
                    .filter((album) =>
                      album.title
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    )
                    .map((album) => (
                      <div
                        style={{ margin: "5vh" }}
                        className={classes.playlist}
                        key={album.id}
                        onClick={() => navigate(`/album-page/${album.id}`)}
                      >
                        <div className={classes.card}>
                          <div className={classes.mg_holder}>
                            <img src={album.cover_photo} alt="image" />
                          </div>
                          <div className={classes.text}>
                            <h2>{album.title}</h2>
                            <p>{album.release}</p>
                          </div>
                          <div className={classes.play_icon}>
                            <div className={classes.circle}>
                              <div className={classes.triangle}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchPage;
