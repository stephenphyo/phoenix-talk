import { useState, useEffect } from 'react';
const useWindowSize = () => {

    /* useState */
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    /* Functions */
    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    /* useEffect */
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

  return windowSize;
}

export default useWindowSize;