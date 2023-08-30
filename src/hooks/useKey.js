import { useEffect } from "react";

// Escape key to go back action -> onCloseMovie
export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callback);

      // Clean up function -> to clear multiple calls for escape key
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
