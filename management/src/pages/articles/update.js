import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BackendClientRequest } from "../../services/ApiClient";

const Update = () => {
    const [editorHtml, setEditorHtml] = useState("");
    const [title, setTitle] = useState('');
    const quillRef = useRef(null);

    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        if (state) {
            setTitle(state.article.title);
            if (state.article.content) {
                setEditorHtml(JSON.parse(state.article.content));
            }
        }
    }, []);

    const handleEditorChange = (value) => {
        setEditorHtml(value);
    };

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }],
            [{ size: [] }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            [{ 'align': [] }],
        ],
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const delta = quillRef.current.getEditor().getContents();
        const content = JSON.stringify(delta);

        const headers = new Headers({
            'Content-Type':'application/json'
        });
        const path = '/api/news-article/update';
        const body = { id: state.article._id, title, content };
        const method = "POST";

        await BackendClientRequest(path, body, headers, method);
        // Redirect to management page or homepage
        navigate('/articles/');
    };

    const openOverview = () => {
        navigate('/articles');
    }

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
                                    <button onClick={openOverview} className="btn btn-danger w-50">Annuleren</button>
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