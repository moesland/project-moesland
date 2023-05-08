import React, { useEffect, useState } from "react";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Buffer } from 'buffer';

export default function Management() {
    const images = [];
    const [galleryImages, setGalleryImages] = useState(images);
    const [successMessage, setSuccessMessage] = useState('');
    {
        successMessage && (
            <div className="alert alert-success" role="alert">
                {successMessage}
            </div>
        )
    }

    useEffect(() => {
        fetchUserImages();
    }, []);

    useEffect(() => {
        if (galleryImages) {
            galleryImages.forEach(i => {
                const data = `data:${i.image.contentType};base64,${Buffer.from(i.image.data)}`;
                images.push({
                    original: data,
                    thumbnail: data,
                    srcSet: data,
                    originalAlt: i.image.name,
                    thumbnailAlt: i.image.name,
                    userImageId: i._id
                });
            });
        }
    }, [galleryImages]);

    const fetchUserImages = async () => {
        const token = localStorage.getItem('token');
        const headers = new Headers({
            'Authorization': 'Bearer ' + token
        });

        await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + '/api/user-image', { method: 'GET', headers: headers })
            .then(response => response.json())
            .then(data => setGalleryImages(data));
    }

    const handleImageClick = (event) => {
        const description = event.target.dataset.description;
        console.log(description)
        const index = images.findIndex((item) => item.description === description);
        const newImages = images.filter((item, i) => i !== index); // Waarom werkt dit niet?
        setGalleryImages(newImages);
    };

    const approveItem = async (item) => {
        const token = localStorage.getItem("token");
        const headers = new Headers({
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        });
        const body = JSON.stringify({ id: item.userImageId });

        await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + "/api/user-image/approve", {
            method: "POST",
            body: body,
            headers: headers,
        });

        console.log(item.userImageId);
        const newGalleryImages = galleryImages.filter((galleryItem) => galleryItem.userImageId !== item.userImageId);
        setGalleryImages(newGalleryImages);
    };

    const denyItem = async (item) => {
        const token = localStorage.getItem('token');
        const headers = new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        });
        const body = JSON.stringify({ id: item.userImageId });

        await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + '/api/user-image/decline', {
            method: 'POST',
            body: body,
            headers: headers
        });
    };

    const renderItem = (item) => {
        return (
            <>
                <div className="card">
                    <img className="image-gallery-image"
                        src={item.original}
                        alt={item.description}
                        data-description={item.description} />
                </div>
                <button
                    type="button"
                    className="btn btn-danger btn-sq-responsive"
                    onClick={() => denyItem(item)}>
                    Afkeuren
                </button>
                <button
                    type="button"
                    className="btn btn-success btn-sq-responsive"
                    onClick={() => approveItem(item)}>
                    Goedkeuren
                </button>
            </>
        );
    };

    return (
        <>
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            <div className="app">
                <div className="image-gallery-wrapper">
                    <ImageGallery thumbnailPosition="top" items={images} renderItem={renderItem} disableKeyDown={true} disableSwipe={true} disableThumbnailScroll={true} />
                </div>
            </div>
        </>
    );
}
