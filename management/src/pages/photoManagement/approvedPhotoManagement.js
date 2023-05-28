import React, { useEffect, useState } from "react";
import { Buffer } from 'buffer';

export default function ApprovedPhotoManagement() {
    const [images, setImages] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        fetchUserImages();
    }, []);

    useEffect(() => {
        refreshData();
    }, [fetched]);

    const refreshData = () => {
        const images = [];

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

        setImages(images);
    }

    const fetchUserImages = async () => {
        setFetched(false);

        const token = localStorage.getItem('token');
        const headers = new Headers({
            'Authorization': 'Bearer ' + token
        });

        await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + '/api/user-image?approvalStatus=approved', { method: 'GET', headers: headers })
            .then(response => response.json())
            .then(data => {
                setGalleryImages(data);
                setFetched(true);
            });
    }

    return (
        <>
            <div className="app mt-3">
                <h1 className="font-moesland text-center">Gebruikersfoto's</h1>

                {galleryImages.length > 0 &&
                    <div className="container">
                        {images.map(i => (
                            <div className="row">
                                <img src={i.original}
                                    alt={i.originalAlt}
                                    data-description={i.description} />
                            </div>
                        ))}
                    </div>
                }
            </div>
        </>
    );
}