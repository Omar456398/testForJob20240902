import { useEffect, useMemo, useRef, useState } from "react";

const Gallery = ({ images: imagesPre, autoScrollInterval = 3000 }) => {
  const images = useMemo(() => [...imagesPre, imagesPre[0]], [imagesPre]);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const mouseStartRef = useRef(null);
  const [smooth, setSmooth] = useState(true);
  const trackRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleTransitionEnd = () => {
      startAutoScroll();
    };
    const track = trackRef.current;
    track?.addEventListener("transitionend", handleTransitionEnd);
    return () => {
      track?.removeEventListener("transitionend", handleTransitionEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    const mouseDown = (e) => {
      mouseStartRef.current = e.pageX - trackRef.current?.offsetLeft;
    };
    const mouseUp = () => {
      mouseStartRef.current = null;
      setIndex((prev) => Number(prev.toFixed(0)) % images.length);
    };
    const mouseMove = (e) => {
      if (mouseStartRef.current === null) return;
      e.preventDefault();
      const walkX =
        (e.pageX - trackRef.current?.offsetLeft - mouseStartRef.current) /
        ((320 * 12) / 16);
      mouseStartRef.current = e.pageX - trackRef.current?.offsetLeft;
      setIndex((prev) => (prev + imagesPre.length - walkX) % imagesPre.length);
    };
    trackRef.current?.addEventListener("mousedown", mouseDown);
    trackRef.current?.addEventListener("mouseleave", mouseUp);

    trackRef.current?.addEventListener("mouseup", mouseUp);

    trackRef.current?.addEventListener("mousemove", mouseMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackRef.current]);

  const startAutoScroll = (now = false, reverse = false) => {
    stopAutoScroll();
    const intervalFunc = (reverse = false, preOnly = false) => {
      if (mouseStartRef.current === null) {
        setIndex((prevIndex) => {
          indexRef.current =
            (prevIndex +
              (preOnly ? imagesPre.length : images.length) +
              (reverse ? -1 : 1)) %
            (preOnly ? imagesPre.length : images.length);
          return indexRef.current;
        });
        setTimeout(() => {
          console.log(indexRef.current, imagesPre.length);
          if (indexRef.current === imagesPre.length) {
            setSmooth(false);
            indexRef.current = 0;
            setIndex(0);
            setTimeout(() => setSmooth(true), 10);
          }
        }, 320);
      }
    };
    if (now) {
      intervalFunc(reverse, true);
    }
    intervalRef.current = setInterval(intervalFunc, autoScrollInterval);
  };
  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const moveCarousel = () => {
    const offset = -index * 30;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${offset}rem)`;
    }
    onSnap(index);
  };

  const onSnap = (currentIndex) => {
    console.log("Snapped to image", (currentIndex % imagesPre.length) + 1);
  };

  useEffect(() => {
    moveCarousel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div className="flex" data-testid="product-gallery">
      {imagesPre.length > 1 ? (
        <>
          <div className="mr-8">
            {imagesPre.map((image, i) => (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                src={image}
                style={{
                  minWidth: `${30 / imagesPre.length - 0.25}rem`,
                  height: `${30 / imagesPre.length - 0.25}rem`,
                }}
                alt={`Image ${(i % imagesPre.length) + 1}`}
                className="object-contain mb-1 cursor-pointer"
                onClick={() => setIndex(i)}
                key={i}
              />
            ))}
          </div>
          <div style={{ width: "30rem" }}>
            <div
              style={{
                width: "30rem",
                height: "30rem",
                display: "flex",
                position: "relative",
              }}
            >
              <div
                className="overflow-hidden"
                style={{ width: "30rem", height: "30rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    ...(!smooth || mouseStartRef.current !== null
                      ? {}
                      : {
                          transition: "transform 0.3s ease-in-out",
                        }),
                    willChange: "transform",
                    width: "fit-content",
                    userSelect: "none",
                  }}
                  ref={trackRef}
                >
                  {images.map((image, i) => (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img
                      src={image}
                      style={{ minWidth: "30rem", height: "30rem" }}
                      alt={`Image ${(i % imagesPre.length) + 1}`}
                      className="pointer-events-none object-contain"
                      key={i}
                    />
                  ))}
                </div>
              </div>
              <button
                className="absolute text-3xl self-center right-3 h-7 w-7 bg-black text-white"
                onClick={() => {
                  startAutoScroll(true, false);
                }}
              >
                <div style={{ marginTop: "-0.35rem" }}>{">"}</div>
              </button>
              <button
                className="absolute text-3xl self-center left-3 h-7 w-7 bg-black text-white"
                onClick={() => {
                  startAutoScroll(true, true);
                }}
              >
                <div style={{ marginTop: "-0.35rem" }}>{"<"}</div>
              </button>
            </div>
          </div>
        </>
      ) : (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img
          src={images[0]}
          style={{ minWidth: "30rem", height: "30rem" }}
          alt={`Image 1`}
          className="pointer-events-none object-contain"
        />
      )}
    </div>
  );
};

export default Gallery;
