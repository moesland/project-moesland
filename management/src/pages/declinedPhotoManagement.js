import React, { useEffect, useState } from "react";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Buffer } from 'buffer';

export default function DeclinedPhotoManagement() {
    const images = [];
    const [galleryImages, setGalleryImages] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        fetchUserImages();
    }, []);

    useEffect(() => {
        refreshData();
    }, [fetched]);

    const refreshData = () => {
        if (galleryImages && galleryImages.length !== 0) {
            galleryImages.forEach(i => {
                const data = `data:${i.image.contentType};base64,${Buffer.from(i.image.data)}`;
                images.push({
                    original: data,
                    thumbnail: data,
                    srcSet: data,
                    originalAlt: i.image?.name,
                    thumbnailAlt: i.image?.name,
                    userImageId: i._id
                });
            });
        }
    }

    const fetchUserImages = async () => {
        setFetched(false);

        const token = localStorage.getItem('token');
        const headers = new Headers({
            'Authorization': 'Bearer ' + token
        });

        await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + '/api/user-image?isDeclined=true', { method: 'GET', headers: headers })
            .then(response => response.json())
            .then(data => {
                setGalleryImages(data);
                setFetched(true);
            });
    }

    const restoreItem = async (item) => {
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

        fetchUserImages();
    };

    const deleteItem = async (item) => {
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

        fetchUserImages();
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
                <div className="m-2">
                    <button
                        type="button"
                        className="btn btn-danger btn-sq-responsive mx-1"
                        onClick={() => deleteItem(item)}>
                        Verwijderen
                    </button>
                    <button
                        type="button"
                        className="btn btn-success btn-sq-responsive mx-1"
                        onClick={() => restoreItem(item)}>
                        Herstellen
                    </button>
                </div>
            </>
        );
    };

    return (
        <>
            <div className="app mt-3">
                <h1 className="font-moesland text-center">Afgekeurde gebruikersfoto's</h1>

                <div className="image-gallery-wrapper mt-2">
                    {galleryImages.length > 0 ? (
                        <ImageGallery
                            thumbnailPosition="top"
                            items={images}
                            renderItem={renderItem}
                            disableKeyDown={true}
                            disableSwipe={true}
                            disableThumbnailScroll={true}
                        />
                    ) : (
                        <p className="text-center">Geen gebruikersfoto's gevonden.</p>
                    )}
                </div>
            </div>
        </>
    );
}