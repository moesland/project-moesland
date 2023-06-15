import React, { useEffect, useState } from "react";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Buffer } from 'buffer';
import { approveUserImage, declineUserImage, getUserImages } from "../../services/userImage";

export default function PhotoManagement() {
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

        await getUserImages('?approvalStatus=pending')
            .then(response => response.json())
            .then(data => {
                setGalleryImages(data);
                setFetched(true);
            });
    }

    const approveItem = async (item) => {
        const index = images.findIndex(i => i.userImageId === item.userImageId);
        const data = images[index].original;
        const link = document.createElement('a');
        link.href = data;
        link.download = `${images[index].originalAlt}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        await approveUserImage(item)
            .then(async () => {
                await fetchUserImages();
            });
    };

    const denyItem = async (item) => {
        await declineUserImage(item)
            .then(async () => {
                await fetchUserImages();
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
                <div className="m-2">
                    <button
                        type="button"
                        className="btn btn-danger btn-sq-responsive mx-1"
                        onClick={() => denyItem(item)}>
                        Afkeuren
                    </button>
                    <button
                        type="button"
                        className="btn btn-success btn-sq-responsive mx-1"
                        onClick={() => approveItem(item)}>
                        Goedkeuren
                    </button>
                </div>
            </>
        );
    };

    return (
        <>
            <div className="app mt-3">
                <h1 className="font-moesland text-center">Gebruikersfoto's</h1>

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