import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import React, { useState } from "react";

const Create = () => {
    const [content, setContent] = useState("");
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [bannerImage, setBannerImage] = useState('');

    const modules = {
        toolbar: [
          [{ 'header': '1'}, {'header': '2'}, {'font': []}],
          [{size: []}],
          ['bold', 'italic', 'underline'],
          ['link', 'image', 'video'],
          [{ 'align': [] }],
        ],
      };
      
    const handleSubmit = async (e) => {
            e.preventDefault();
            const response = await fetch('http://localhost:3000/api/newsArticle/create', {  
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                content,
                title,
                bannerImage
              })
            });
            return handleSubmit;
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
                            <input type="text" name="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}/> 
                        </div>  
                        <div className="form-group mt-3">         
                            <label className="mb-2">
                                Afbeelding:
                            </label>
                            <input type="file" name="image" accept="image/*" class="form-control" value={bannerImage} onChange={(e) => setBannerImage(e.target.value)}/> 
                        </div>
                        <div className="form-group mt-3">
                            <label className="mb-2">
                                Inhoud:
                            </label>
                            <input type="text" name="content" value={content} onChange={(e) => setContent(e.target.value)}/>
                            {/* <ReactQuill value={content} onChange={(e) => setContent(e.target.value)} modules={modules}/> */}
                        </div>
                        <br></br>
                        <div className="form-group text-left">
                            <div className="row">
                                <div className="col text-start">
                                    <button type="submit" className="btn btn-success w-50">Aanmaken</button>
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