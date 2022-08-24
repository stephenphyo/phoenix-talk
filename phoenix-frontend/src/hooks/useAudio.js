import { useState, useEffect } from 'react';

const useAudio = (url) => {

    /* useState */
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    /* Functions */
    const toggle = () => {
        setPlaying(!playing);
    };

    /* useEffect */
    useEffect(() => {
        playing ? audio.play() : audio.pause()
    }, [playing]);

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        }
    }, []);

    return [playing, toggle];
};

export default useAudio;