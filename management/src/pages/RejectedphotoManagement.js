import React, { useEffect, useState } from "react";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Buffer } from 'buffer';

export default function RejectedPhotoManagement() {
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

        refreshData();
    }, [galleryImages]);

    const refreshData = () => 
    {
        if (galleryImages) {
            galleryImages.forEach(i => {
                if (i.approvalStatus === 'declined') {
                    const data = `data:${i.image.contentType};base64,${Buffer.from(i.image.data)}`;
                    images.push({
                        original: data,
                        thumbnail: data,
                        srcSet: data,
                        originalAlt: i.image.name,
                        thumbnailAlt: i.image.name,
                        userImageId: i._id
                    });
                }
            });
        }
        console.log()
    }

    const fetchUserImages = async () => {
        const token = localStorage.getItem('token');
        const headers = new Headers({
            'Authorization': 'Bearer ' + token
        });

        await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + '/api/user-image', { method: 'GET', headers: headers })
            .then(response => response.json())
            .then(data => setGalleryImages(data));
    }
    

    const approveItem = async (item) => {
        const token = localStorage.getItem("token");
        const headers = new Headers({
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        });
        const body = JSON.stringify({ id: item.userImageId });

        await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + "/api/user-image/restore", {
            method: "POST",
            body: body,
            headers: headers,
        });

        const index = images.findIndex(i => i.userImageId === item.userImageId);
        const newImages = images.filter((_, i) => i !== index);
        setGalleryImages(newImages);
    };

    const denyItem = async (item) => {
        const token = localStorage.getItem('token');
        const headers = new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        });
        const body = JSON.stringify({ id: item.userImageId });

        await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + '/api/user-image/delete', {
            method: 'POST',
            body: body,
            headers: headers
        });

        const index = images.findIndex(i => i.description === item.userImageId);
        const newImages = images.filter((_, i) => i !== index);
        setGalleryImages(newImages);
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
                    Verwijderen
                </button>
                <button
                    type="button"
                    className="btn btn-success btn-sq-responsive"
                    onClick={() => approveItem(item)}>
                    Herstellen
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
                {galleryImages.length > 0 ? (
                    <div className="image-gallery-wrapper">
                    
                    <ImageGallery thumbnailPosition="top" items={images} renderItem={renderItem} disableKeyDown={true} disableSwipe={true} disableThumbnailScroll={true} />
                </div>
                ) : (
                    <p>Geen afbeeldingen die hersteld kunnen worden.</p>
                )}
            </div>
        </>
    );
}
