import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('');
    const [bannerImage, setBannerImage] = useState('');
    const quillRef = useRef(null);
  
    const navigate = useNavigate();

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }],
            [{ size: [] }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            [{ 'align': [] }],
        ],
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setBannerImage(reader.result);
            console.log(bannerImage);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const delta = quillRef.current.getEditor().getContents();
        const content = JSON.stringify(delta);

        const imageFile = document.querySelector('input[name="image"]').files[0];
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('bannerImage', imageFile);
    
        const token = localStorage.getItem('token');
        const urlRoot = process.env.REACT_APP_BACKEND_ROOT_URL;
        const response = await fetch(urlRoot + '/api/news-article/create', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    
        if (response.ok) {
            window.alert('Nieuwsartikel is aangemaakt!');
            navigate('/articles/');
        } else {
            window.alert('Fout bij het aanmaken');
        }
    };

    return (
        <>
            <div className="container">
                <div className="h-100 d-flex align-items-center justify-content-center">
                    <form onSubmit={handleSubmit} className="col-6">
                        <div className="text-center">
                            <h1>
                                Nieuwsartikel aanmaken
                            </h1>
                        </div>
                        <div className="form-group mt-3">
                            <label className="mb-2">
                                Titel:
                            </label>
                            <input type="text" name="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                        </div>
                        <div className="form-group mt-3">
                            <label className="mb-2">
                                Afbeelding:
                            </label>
                            <input type="file" name="image" accept="image/*" className="form-control" onChange={handleImageChange} required/>
                        </div>
                        <div className="form-group mt-3">
                            <label className="mb-2">
                                Inhoud:
                            </label>
                            <ReactQuill ref={quillRef} name="conent" modules={modules}/>
                        </div>
                        <br></br>   
                        <div className="form-group text-left">
                            <div className="row">
                                <div className="col text-start">
                                    <input type="submit" value="Aanmaken" className="btn btn-success w-50"/>
                                </div>
                                <div className="col text-end">
                                    <a href="/articles/" className="btn btn-danger w-50">Annuleren</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
    }
    
export default Create;