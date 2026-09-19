import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router doesn't reset scroll position on route changes by
// default (unlike a traditional multi-page site, where every new page
// load starts at the top). Without this, clicking any link — footer,
// navbar, or otherwise — while scrolled down leaves you at the same
// scroll position on the new page instead of starting at the top.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // renders nothing — only has the side effect above
}
