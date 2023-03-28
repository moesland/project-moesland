import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Update = () => {
    const [editorHtml, setEditorHtml] = useState("");
    const [title, setTitle] = useState('');
    const quillRef = useRef(null);

    const { state } = useLocation();

    useEffect(() => {
        if (state) {
            setTitle(state.article.title);
            setEditorHtml(JSON.parse(state.article.content));
        }
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const delta = quillRef.current.getEditor().getContents();
        const content = JSON.stringify(delta);

        const urlRoot = process.env.REACT_APP_BACKEND_ROOT_URL;
        const path = '/api/news-article/update';
        const body = { title, content };
        const method = "POST";

        const url = urlRoot + path;
        const requestOptions = {
            method,
            body
        };

        await fetch(url, requestOptions)
            .catch(function (error) {
                console.log(error);
            });
        // Redirect to management page or homepage
    };

    return (
        <>
            <div className="container">
                <div className="h-100 d-flex align-items-center justify-content-center">
                    <form onSubmit={handleSubmit} className="col-6">
                        <div className="text-center">
                            <h1>
                                Nieuwsartikel bewerken
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
                                Inhoud:
                            </label>
                            {<ReactQuill ref={quillRef} value={editorHtml} onChange={handleEditorChange} modules={modules} />}
                        </div>
                        <br></br>
                        <div className="form-group text-left">
                            <div className="row">
                                <div className="col text-start">
                                    <input type="submit" value="Bijwerken" className="btn btn-success w-50" />
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

export default Update;