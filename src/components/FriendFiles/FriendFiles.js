import { useParams } from "react-router-dom"
import { getDownloadURL, listAll, ref } from "firebase/storage"
import { storage } from "../../firebase";
import { useState, useEffect } from "react";
import File from "../Files/File/File";
import style from '../FriendFiles/FriendFiles.module.css'
import Pagination from "../Pagination/Pagination";






const FriendFiles = () =>{
    const {id, email} = useParams()
    const filesListRef = ref(storage, "usersfiles/" + `${id}/`);
    const [filesList, setFilesList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filesPerPage, setFilesPerPage] = useState(5);

    useEffect(() => {
      listAll(filesListRef).then((response) => {
        response.items.map((item) => {
          getDownloadURL(item).then((url) => {
            const fileName =
              item.name.substring(0, 10) +
              "..." +
              item.name.substring(item.name.length - 5);
            const name = item.name;
            setFilesList((prev) => [
              ...prev,
              { shortname: fileName, url: url, name: name },
            ]);
          });
        });
      });
    }, []);

    const lastfileIndex = currentPage * filesPerPage;
    const firstFilesIndex = lastfileIndex - filesPerPage;
    const currentFiles = filesList.slice(
      firstFilesIndex,
      lastfileIndex
    );

    

    return(
        <div className={`${style.filescontainer} container`}>
            <div className={`${style.userfilesinfo} container text-center`}><h1>{email} files</h1></div>
            {currentFiles.map((file) => {
            return <File key={file.url} src={file.url} shortname={file.shortname}
            name={file.name} />;
      })}
      <Pagination totalItems={filesList.length}
            itemsPerPage={filesPerPage}
            setCurrentPage={setCurrentPage}/>
        </div>
    )
}

export default FriendFiles