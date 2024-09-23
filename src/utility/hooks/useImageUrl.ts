import {ChangeEvent, useEffect, useState} from "react";

const useImageUrl = (defaultImage: string|null) => {
    const [imageUrl, setImageUrl] = useState(defaultImage)

    useEffect(() => {
        setImageUrl(defaultImage || null)
    }, [defaultImage]);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const url = URL.createObjectURL(file);
            setImageUrl(url);
        }
    };

    return {imageUrl, handleImageChange};
}

export default useImageUrl;