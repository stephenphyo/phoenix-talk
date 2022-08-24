import { useState, useEffect } from "react";

const useImageUpload = () => {

    /* useState */
    const [inputFile, setInputFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);

    /* useEffect */
    useEffect(() => {
        const file = inputFile?.target?.files[0];
        if (file) {
            if (file.size > 1000000) {
                return alert("Max file size is 1MB");
            } else {
                setImagePreview(URL.createObjectURL(file));
                setImage(file);
            }
        }
    }, [inputFile]);

    return [image, imagePreview, setInputFile];
};

export default useImageUpload;