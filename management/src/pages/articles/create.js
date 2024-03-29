import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useState, useRef } from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import { createNewsArticle } from "../../services/newsArticle";

export default function Create() {
    const [bannerImage, setBannerImage] = useState('');
    const quillRef = useRef(null);
    const navigate = useNavigate();

    const quillModules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }],
            [{ size: [] }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            [{ 'align': [] }],
        ],
    };

    const schema = yup.object().shape({
        title: yup.string().min(3, "De titel moet minimaal drie karakters bevatten.").required("Dit veld mag niet leeg zijn.")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setBannerImage(reader.result);
            console.log(bannerImage);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = (data) => {
        addNewsArticle(data.title);
    };

    async function addNewsArticle(title) {
        const delta = quillRef.current.getEditor().getContents();
        const content = JSON.stringify(delta);

        const imageFile = document.querySelector('input[name="image"]').files[0];

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('bannerImage', imageFile);

        await createNewsArticle(formData)
            .then(() => {
                window.alert('Nieuwsartikel is aangemaakt!');
                navigate('/articles/');
            })
            .catch(() => {
                window.alert('Fout bij het aanmaken');
            });
    }

    return (
        <>
            <div className="container mb-4">
                <div className="h-100 d-flex align-items-center justify-content-center">
                    <form onSubmit={handleSubmit(onSubmit)} className="col-6">
                        <div className="text-center">
                            <h1>
                                Nieuwsartikel aanmaken
                            </h1>
                        </div>
                        <div className="form-group mt-3">
                            <label className="mb-2">
                                Titel:
                            </label>
                            <input type="text" id="title" name="title" className="form-control" placeholder="Titel" {...register("title")} />
                            <small id="addNewsArticleTitleError" className="form-text text-danger addNewsArticleTitleError">{errors.title?.message}</small>
                        </div>
                        <div className="form-group mt-3">
                            <label className="mb-2">
                                Afbeelding:
                            </label>
                            <input type="file" id="image" name="image" accept="image/*" className="form-control" onChange={handleImageChange} required />
                        </div>
                        <div className="form-group mt-3">
                            <label className="mb-2">
                                Inhoud:
                            </label>
                            <ReactQuill ref={quillRef} name="conent" modules={quillModules} />
                        </div>
                        <br></br>
                        <div className="form-group text-left">
                            <div className="row">
                                <div className="col text-start">
                                    <input type="submit" value="Aanmaken" className="btn btn-moesland w-50" />
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
    );
}