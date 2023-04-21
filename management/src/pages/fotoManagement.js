import React, { useEffect, useState } from "react";
import ImageGallery from 'react-image-gallery';

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

    useEffect(() => {
        setGalleryImages(images);
    }, [images]);

    const handleImageClick = (event) => {
        const description = event.target.dataset.description;
        console.log(description)
        const index = images.findIndex((item) => item.description === description);
        const newImages = images.filter((item, i) => i !== index);//wrm werkt niet??
        setGalleryImages(newImages);
    };

    const handleSwipe = (swipeDirection) => {
        if (swipeDirection === 'left') {
            // handle swipe left
            console.log("denied")
        } else if (swipeDirection === 'right') {
            // handle swipe right
            console.log("approved")
        }
    };

    const approveItem = (item) => {
        console.log(`Item approved: ${item.description}`);
    };

    const denyItem = (item) => {
        console.log(`Item denied: ${item.description}`);
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
                    onClick={denyItem(item)}
                    className="btn btn-danger"
                >
                    Afkeuren
                </button>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={approveItem(item)}
                >
                    Goedkeuren
                </button>
            </>
        );
    };

    return (
        <>
            <div className="app">
                <div className="image-gallery-wrapper">
                    <ImageGallery items={galleryImages} onClick={handleImageClick} onSwipe={handleSwipe} renderItem={renderItem} />
                </div>
            </div>
        </>
    )
}

