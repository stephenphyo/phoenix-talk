import React, { useState } from 'react';

/* TEMP IMPORTS */
import def_img from 'assets/images/logo.png';
import useImageUpload from 'hooks/useImageUpload';
import UploadImageCloudinary from 'services/Cloudinary/UploadImageCloudinary';
import song1 from 'assets/audios/THE CRADLE OF YOUR SOUL.mp3';
import useAudio from 'hooks/useAudio';

function ChatRoomInfo({ open, setOpen }) {

    /* Testing */
    const [image, imagePreview, setImage] = useImageUpload();
    const [playing, toggle] = useAudio(song1);

    const upload = async () => {
        const res = await UploadImageCloudinary(image);
        if (res.status === 200) {
            console.log(res.data.url)
        } else {
            console.log(res.error);
        }
    }

    return (
        <section className={`chat_room_info ${open ? 'show' : ''}`}>
            Chat Info Blade
            <button onClick={() => setOpen(false)}>close temp</button>

            <img src={imagePreview || def_img} alt='' />
            <input type='file' onChange={(e) => setImage(e)} />
            <button onClick={() => upload()}>Upload</button>
            <button onClick={() => toggle()}>{playing ? 'Pause' : 'Play'}</button>
        </section>
    );
}

export default ChatRoomInfo;