import { useRef } from "react";
import { useKey } from "../hooks/useKey";

export default // Search focus
function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  // useEffect(
  //   function () {
  //     function callback(e) {
  //       // avoid cleaninig the search bar when pressed enter
  //       if (document.activeElement === inputEl.current) return;
  //       if (e.code === "Enter") {
  //         inputEl.current.focus();
  //         setQuery("");
  //       }
  //     }
  //     document.addEventListener("keydown", callback);
  //     // Clean up
  //     return () => document.addEventListener("keydown", callback);
  //   },
  //   [setQuery]
  // );

  // useEffect(
  //   function () {
  //     const el = document.querySelector(".search");
  //     el.focus();
  //   },
  //   [query]
  // );
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
