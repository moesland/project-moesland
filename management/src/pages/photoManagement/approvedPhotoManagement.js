import React, { useEffect, useState } from "react";
import { Buffer } from 'buffer';
import JSZip from "jszip";

export default function ApprovedPhotoManagement() {
    const [images, setImages] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [fetched, setFetched] = useState(false);
    const selectedImages = [];

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
    };

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
    };

    const downloadAll = async () => {
        const zip = new JSZip();

        for (const image of images) {
            const data = image.original;
            const filename = `${image.originalAlt}.jpg`;

            const response = await fetch(data);
            const imageBlob = await response.blob();

            zip.file(filename, imageBlob);
        }

        zip.generateAsync({ type: 'blob' })
            .then(content => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(content);
                link.download = 'images.zip';
                link.click();
            });
    };

    const downloadSelected = async () => {
        if (selectedImages.length === 0) {
            return;
        }

        if (selectedImages.length === 1) {
            const index = images.findIndex(i => i.userImageId === selectedImages[0]);
            const image = images[index];
            const data = image.original;

            const link = document.createElement('a');
            link.href = data;
            link.download = `${image.originalAlt}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            return;
        }

        const zip = new JSZip();

        for (const selectedImage of selectedImages) {
            const index = images.findIndex(i => i.userImageId === selectedImage);
            const image = images[index];
            const data = image.original;
            const filename = `${image.originalAlt}.jpg`;

            const response = await fetch(data);
            const imageBlob = await response.blob();

            zip.file(filename, imageBlob);
        }

        zip.generateAsync({ type: 'blob' })
            .then(content => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(content);
                link.download = 'images.zip';
                link.click();
            });
    };

    const changeSelection = (id) => {
        if (selectedImages.includes(id)) {
            const index = selectedImages.indexOf(id);
            selectedImages.splice(index, 1);
        } else {
            selectedImages.push(id);
        }
    }

    return (
        <>
            <div className="app mt-3">
                <h1 className="font-moesland text-center">Goedgekeurde gebruikersfoto's</h1>

                {galleryImages.length > 0 &&
                    <div className="container">
                        <div className="row mb-3">
                            <div className="col">
                                <button className="btn btn-primary" onClick={downloadAll}>Download alle foto's</button>
                                <button className="btn btn-primary mx-2" onClick={downloadSelected}>Download geselecteerde foto's</button>
                            </div>
                        </div>

                        <table className="container">
                            {images.map(i => (
                                <tr className="row mb-2" key={i.userImageId}>
                                    <td className="col-1 d-flex justify-content-end">
                                        <input type="checkbox" className="form-check-input" onChange={() => changeSelection(i.userImageId)} />
                                    </td>
                                    <td className="col-8">
                                        <img className="w-25"
                                            src={i.original}
                                            alt={i.originalAlt}
                                            data-description={i.description} />
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </div>
                }
            </div>
        </>
    );
}