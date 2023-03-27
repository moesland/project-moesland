import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useState, useRef } from "react";

const Create = () => {
    const [editorHtml, setEditorHtml] = useState("");
    const [title, setTitle] = useState('');
    const [bannerImage, setBannerImage] = useState('');
    const quillRef = useRef(null);
  
    const handleEditorChange = (value) => {
        setEditorHtml(value);
    };

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline'],
            ['link', 'image', 'video'],
            [{ 'align': [] }],
        ],
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setBannerImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const delta = quillRef.current.getEditor().getContents();
        const content = JSON.stringify(delta);
    
        const imageFile = document.querySelector('input[name="image"]').files[0];
        const imageContentType = imageFile.type;
    
        const image = {
            name: 'banner',
            data: Buffer.from(bannerImage.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
            contentType: imageContentType
        };
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('bannerImage', imageFile);
    
        try {
            const response = await fetch('http://localhost:5000/api/newsArticle/create', {
                method: 'POST',
                body: formData
            });
            console.log('News article created successfully');
            // Redirect to management page or homepage
        } catch (error) {
            console.error(error);
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
                            <input type="text" name="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="form-group mt-3">
                            <label className="mb-2">
                                Afbeelding:
                            </label>
                            <input type="file" name="image" accept="image/*" class="form-control" onChange={handleImageChange} />
                        </div>
                        <div className="form-group mt-3">
                            <label className="mb-2">
                                Inhoud:
                            </label>
                            {/* <ReactQuill value={editorHtml} onChange={handleEditorChange} modules={modules}/> */}
                        </div>
                        <br></br>
                        <div className="form-group text-left">
                            <div className="row">
                                <div className="col text-start">
                                    <input type="submit" value="Aanmaken" className="btn btn-success w-50"/>
                                </div>
                                <div className="col text-end">
                                    <a href="#" class="btn btn-danger w-50">Annuleren</a>
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