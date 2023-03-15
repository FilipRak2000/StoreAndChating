import style from "../AddFiles/AddFiles.module.css";
import { storage } from "../../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";



const AddFiles = (props) => {
  const [file, setFile] = useState("");
  const [auth] = useAuth()

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
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      const shortname = uploadTask.snapshot.ref.name.substring(0, 5) + '...' + uploadTask.snapshot.ref.name.substring(uploadTask.snapshot.ref.name.length - 5)
      const name = uploadTask.snapshot.ref.name
      props.setFilesList((prev) => [...prev, {url:downloadURL, shortname: shortname, name: name}])
    });
  }
  
);
setFile('')
document.getElementById('file').value = '';
    }
  

  return (
    <div className="container mt-1 text-center">
      
      <form className="uploader">
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </form>
      {file && <button className="mt-2" onClick={() => uploadFile()}>Add</button> }
    </div>
  );
};

export default AddFiles;
