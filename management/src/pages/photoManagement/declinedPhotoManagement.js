import React, { useEffect, useState } from "react";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Buffer } from 'buffer';
import { deleteUserImage, getUserImages, restoreUserImage } from "../../services/userImage";

export default function DeclinedPhotoManagement() {
    const images = [];
    const [galleryImages, setGalleryImages] = useState();
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
    };

    const fetchUserImages = async () => {
        setFetched(false);

        await getUserImages('?approvalStatus=declined')
            .then(data => {
                setGalleryImages(data);
                setFetched(true);
            });
    };

    const deleteItem = async (item) => {
        await deleteUserImage(item)
            .then(async () => {
                await fetchUserImages();
            });
    };

    const restoreItem = async (item) => {
        await restoreUserImage(item)
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
                    {galleryImages ? (galleryImages.length > 0 ? (
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
                    )) : (
                        <p className="text-center">Gebruikersfoto's laden...</p>
                    )}
                </div>
            </div>
        </>
    );
}