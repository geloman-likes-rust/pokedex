export default function Observe(element, setOffset) {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const handleIntersection = (setOffset) => (entries) => {
    if (entries[0].isIntersecting) {
      setOffset((offset) => offset + 1);
    }
  };
  const observer = new IntersectionObserver(
    handleIntersection(setOffset),
    options
  );
  observer.observe(element);
}
