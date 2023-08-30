import { useEffect, useState } from "react";

const KEY = "87bc0d86";
// Use the fetch the data -> renders on mount(initially)
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      // handleCloseMovie
      //callback?.();
      // Data fetching optimizing -> takes the last typed seach term from middle seaches
      // middle search term will be cancelled
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            // Search optimization
            { signal: controller.signal }
          );
          if (!res.ok) {
            throw new Error("Something went wrong!");
          }
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          // Ignore the generated middle search term by cancelling the request
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      // Movie disappered from list
      //handleCloseMovie();
      // Lexical Scoping
      fetchMovies();
      // clean up function -> each key stroke will cancelled the previous request
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
