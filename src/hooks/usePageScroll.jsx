import { useState, useEffect } from "react";

const INITIAL_STATE = { prev: 0, isScrollingDown: false };

export default function usePageScroll() {
  const [pageOffsetY, setPageOffsetY] = useState(INITIAL_STATE);
  useEffect(() => {
    document.onscroll = () => {
      setPageOffsetY((pageOffsetY) => ({
        prev: window.scrollY,
        isScrollingDown: window.scrollY > pageOffsetY.prev,
      }));
    };
  }, []);

  return pageOffsetY.isScrollingDown;
}
