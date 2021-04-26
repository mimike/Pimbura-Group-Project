// sunday with junaid
import React, { useEffect, useState } from "react";
//import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { photoUpload } from "../../store/session"  // may change name of this function and store location! curly braces from export const


function PhotoUploadPage() {

  const [ caption, setCaption ] = useState("")
  const [ photoUrl, setPhotoUrl ] = useState("")

  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submission = { caption, photoUrl }
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
            name = "photo_url"
            type = "file"
            placeholder = "Upload"
            onChange = { (e) => setPhotoUrl(e.target.files[0])} // only accepts ONE photo if they try and upload multiple files
          />
        </div>
      </form>
    </>
  );
}

export default PhotoUploadPage;
