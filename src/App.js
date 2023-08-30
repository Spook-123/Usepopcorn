import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import Box from "./components/Box";
import Loader from "./components/Loader";
import MovieList from "./components/MovieList";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // Use of custom hook
  const { movies, isLoading, error } = useMovies(query);
  // Use of custom hook
  const [watched, setWatched] = useLocalStorageState([], "watched");

  /**const [watched, setWatched] = useState(function () {
    const storeValue = localStorage.getItem("watched");
    return JSON.parse(storeValue);
  });**/

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    //localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
  }

  return (
    <>
      <NavBar>
        {/* Example of component composition (props drilling) */}
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        {/* Way 2 */}
        {/* Example of component composition (explicit prop drilling) */}
        {/* <Box element={<MovieList movies={movies} />} /> */}
        {/* Example of component composition (explicit prop drilling) */}
        {/* <Box
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          }
        /> */}
        {/* Way 1 -> preferred way*/}
        {/* Example of component composition (implicit prop drilling) */}
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        {/* Example of component composition (reusing the components)  */}
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

//
/* Example of component composition (reusing the components) */
/*
function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  );
}
*/
