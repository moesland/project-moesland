//import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
import React, { useState } from "react";

const Create = () => {
    const [editorHtml, setEditorHtml] = useState("");
  
    const handleEditorChange = (value) => {
        setEditorHtml(value);
    };

    const modules = {
        toolbar: [
          [{ 'header': '1'}, {'header': '2'}, {'font': []}],
          [{size: []}],
          ['bold', 'italic', 'underline'],
          ['link', 'image', 'video'],
          [{ 'align': [] }],
        ],
      };
      
    const handleSubmit = async (elem) => {
        // TODO -> Moesland-39
    }

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
                            <input type="text" name="title" className="form-control"/> 
                        </div>  
                        <div className="form-group mt-3">         
                            <label className="mb-2">
                                Afbeelding:
                            </label>
                            <input type="file" name="image" accept="image/*" class="form-control"/> 
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