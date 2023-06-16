import React, { useEffect, useState } from "react";
import { Buffer } from 'buffer';
import JSZip from "jszip";
import { getUserImages } from "../../services/userImage";
import ModalDelete from '../../modules/userImage/modalDelete';

export default function ApprovedPhotoManagement() {
    const [images, setImages] = useState([]);
    const [galleryImages, setGalleryImages] = useState(undefined);
    const [fetched, setFetched] = useState(false);
    const selectedImages = [];
    const [selectedItem, setSelectedItem] = useState(undefined);
    const [modalDeleteShow, setModalDeleteShow] = useState(false);

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

        await getUserImages('?approvalStatus=approved')
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
            downloadSingle(image);

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

    const downloadSingle = async (image) => {
        const data = image.original;
        const link = document.createElement('a');
        link.href = data;
        link.download = `${image.originalAlt}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const changeSelection = (id) => {
        if (selectedImages.includes(id)) {
            const index = selectedImages.indexOf(id);
            selectedImages.splice(index, 1);
        } else {
            selectedImages.push(id);
        }
    };

    const toggleShowModalDelete = (image) => {
        setModalDeleteShow(!modalDeleteShow);
        setSelectedItem(image);
    };

    return (
        <>
            <div className="app mt-3">
                <h1 className="font-moesland text-center">Goedgekeurde gebruikersfoto's</h1>

                {galleryImages ? (galleryImages.length > 0 ? (
                    <div className="container">
                        <div className="row mb-3">
                            <div className="col">
                                <button className="btn btn-primary" onClick={downloadAll}>Download alle foto's</button>
                                <button className="btn btn-primary mx-2" onClick={downloadSelected}>Download geselecteerde foto's</button>
                            </div>
                        </div>

                        <table className="container">
                            <tbody>
                                {images.map(image => (
                                    <tr className="row mb-2" key={image.userImageId}>
                                        <td className="col-1 d-flex justify-content-end">
                                            <input type="checkbox" className="form-check-input" onChange={() => changeSelection(image.userImageId)} />
                                        </td>
                                        <td className="col-2 p-0">
                                            <img className="w-100"
                                                src={image.original}
                                                alt={image.originalAlt}
                                                data-description={image.description} />
                                        </td>
                                        <td className="col-4">
                                            <button className="btn btn-primary" onClick={() => downloadSingle(image)}>Download</button>
                                            <button className="btn btn-danger mx-2" onClick={() => toggleShowModalDelete(image)}>Verwijderen</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="container">
                        <p className="text-center">Er zijn geen goedgekeurde foto's.</p>
                    </div>
                )) : (
                    <p className="text-center">Gebruikersfoto's laden...</p>
                )
                }
            </div>

            {modalDeleteShow && <ModalDelete toggleModal={toggleShowModalDelete} selectedItem={selectedItem} refreshOverview={fetchUserImages} />}
        </>
    );
}