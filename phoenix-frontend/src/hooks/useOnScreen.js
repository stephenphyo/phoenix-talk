const { useRef, useState, useEffect } = require("react");

const useOnScreen = () => {
    const componentRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const observerFunction = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    }
    const options = { threshold: 1 }

    useEffect(() => {
        const observer = new IntersectionObserver(observerFunction, options);
        if (componentRef.current) observer.observe(componentRef.current);

        return () => {
            if (componentRef.current) observer.unobserve(componentRef.current);
        }
    }, [componentRef]);

    return [componentRef, isVisible];
}

export default useOnScreen;