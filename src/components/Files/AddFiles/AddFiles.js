import style from "../AddFiles/AddFiles.module.css";
import { storage } from "../../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";



const AddFiles = () => {
  const [file, setFile] = useState("");
  const [auth] = useAuth()

  console.log(auth.userId)

  useEffect(() =>{
    const uploadFile = () =>{
      const name = new Date().getDate() + file.name
      const storageRef = ref(storage, 'usersfiles/' + `${auth.userId}/` + name);


      const uploadTask = uploadBytesResumable(storageRef, file);
uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    console.log(error)
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);
    }
    file && uploadFile()
  }, [file])

  return (
    <div className="container mt-1">
      <form className="uploader">
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </form>
    </div>
  );
};

export default AddFiles;
