// sunday with junaid
import React, { useEffect, useState } from "react";
//import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";
import { photoUpload } from "../store/posts"  // may change name of this function and store location! curly braces from export const


function PhotoUploadPage() {

  const [ caption, setCaption ] = useState("")
  const [ image, setImage ] = useState(null)

  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submission = { caption, image }
    let createdPhoto = await dispatch(photoUpload(submission)) // line ~42 of session.js data return
    if(createdPhoto){            // if photo created, modal, redirect, etc.
      // redirect to (/feed)
    }
  }


  return (
    <>
      <h1>Your Photo here</h1>
      <form onSubmit={handleSubmit} enctype="multipart/form">
        <div>
          <textarea
            type="text"
            value = {caption}
            placeholder = "Write what u want to say"
            onChange={ (e) => setCaption(e.target.value)}
          />
        </div>

        <div>
          <input
            name = "image"
            type = "file"
            placeholder = "Upload"
            onChange = { (e) => setImage(e.target.files[0])} // only accepts ONE photo if they try and upload multiple files
          />
        </div>

        <div>
          <button
            type="submit"

          >SUBMIT
          </button>
        </div>
      </form>
    </>
  );
}

export default PhotoUploadPage;
