import { useParams } from "react-router-dom"
import { getDownloadURL, listAll, ref } from "firebase/storage"
import { storage } from "../../firebase";
import { useState, useEffect } from "react";
import File from "../Files/File/File";
import style from '../FriendFiles/FriendFiles.module.css'






const FriendFiles = () =>{
    const {id, email} = useParams()
    const filesListRef = ref(storage, "usersfiles/" + `${id}/`);
    const [filesList, setFilesList] = useState([]);

    useEffect(() => {
        listAll(filesListRef).then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              setFilesList((prev) => [...prev, url]);
            });
          });
        });
      }, []);

    

    return(
        <div className="container text-center mt-3">
            <div className={`${style.userfilesinfo} container`}><h1>{email} files</h1></div>
            {filesList.map((url) => {
            return <File key={url} src={url} />;
      })}
        </div>
    )
}

export default FriendFiles