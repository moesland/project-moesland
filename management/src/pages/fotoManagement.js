import React, { useEffect, useState } from "react";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

export default function Management() {
    const images = [
        {
            original: "https://live.staticflickr.com/65535/52771907979_964013db83_k.jpg",
            thumbnail: "https://live.staticflickr.com/65535/52771907979_964013db83_k.jpg",
            description: '1'

        },
        {
            original: "https://live.staticflickr.com/65535/52771650596_507e8a54d2_k.jpg",
            thumbnail: "https://live.staticflickr.com/65535/52771650596_507e8a54d2_k.jpg",
            description: '2'

        },
        {
            original: "https://live.staticflickr.com/65535/52771648561_1121158507_k.jpg",
            thumbnail: "https://live.staticflickr.com/65535/52771648561_1121158507_k.jpg",
            description: '3'

        },
        {
            original: "https://live.staticflickr.com/65535/52772136488_f4661a549f_k.jpg",
            thumbnail: "https://live.staticflickr.com/65535/52772136488_f4661a549f_k.jpg",
            description: '4'

        }
    ];
    const [galleryImages, setGalleryImages] = useState(images);
    const [successMessage, setSuccessMessage] = useState('');
    {
        successMessage && (
            <div className="alert alert-success" role="alert">
                {successMessage}
            </div>
        )
    }

    const handleSuccessMessage = () => {
        setSuccessMessage('Item approved successfully!');
    };

    // const handleKeyPress = (event) => {
    //     if (event.key === 'ArrowLeft') {
    //         approveItem(event.dataset);
    //         console.log("left")
    //         handleSuccessMessage();

    //     } else if (event.key === 'ArrowRight') {
    //         denyItem();
    //         console.log("right")
    //     }
    // };

    // useEffect(() => {
    //     document.addEventListener('keydown', handleKeyPress);
    //     return () => {
    //         document.removeEventListener('keydown', handleKeyPress);
    //     };
    // }, []);



    useEffect(() => {
        setGalleryImages(images);


        const fetchImagesData = async () => {
            await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + "/api/news-article/", { method: "GET" })
                .then(response => response.json())
                .then(data => { setArticles(data)});
        }

        fetchArticleData()

    }, [images]);

    const handleImageClick = (event) => {
        const description = event.target.dataset.description;
        console.log(description)
        const index = images.findIndex((item) => item.description === description);
        const newImages = images.filter((item, i) => i !== index);//wrm werkt niet??
        setGalleryImages(newImages);
    };

    const approveItem = (item) => {
        console.log(`Item approved: ${item}`);

        const description = item.description
        console.log(description)
        const index = images.findIndex((item) => item.description === description);
        const newImages = images.filter((item, i) => i !== index);//wrm werkt niet??
        setGalleryImages(newImages);
        
    };

    const denyItem = (item) => {
        console.log(`Item denied: ${item.description}`);

        
        const description = item.description
        console.log(description)
        const index = images.findIndex((item) => item.description === description);
        const newImages = images.filter((item, i) => i !== index);//wrm werkt niet??
        setGalleryImages(newImages);
    };

    const renderItem = (item) => {
        return (
            <>
                <div className="card">
                    <img className="image-gallery-image"
                        src={item.original}
                        alt={item.description}
                        data-description={item.description}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-danger btn-sq-responsive"
                    onClick={() => denyItem(item)}

                >
                    Afkeuren
                </button>
                <button
                    type="button"
                    className="btn btn-success btn-sq-responsive"
                    onClick={() => approveItem(item)}
                >
                    Goedkeuren
                </button>
            </>
        );
    };


    return (
        <>
            {successMessage && (
                <div className="alert alert-success " role="alert">
                    {successMessage}
                </div>
            )}

            <div className="app">
                <div className="image-gallery-wrapper">
                    <ImageGallery thumbnailPosition="top" items={images} renderItem={renderItem} disableKeyDown={true} disableSwipe={true} disableThumbnailScroll={true} />
                </div>
            </div>

        </>
    )
}
