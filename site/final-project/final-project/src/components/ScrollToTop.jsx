import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scroll up fonction for each page
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If no anchor is present, scroll up
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
