import { useEffect, useState } from "react";
import AddFiles from "../AddFiles/AddFiles";
import File from "../File/File";
import style from "../Files/Files.module.css";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { storage } from "../../../firebase";
import useAuth from "../../../hooks/useAuth";
import { deleteObject } from "firebase/storage";
import Pagination from "../../Pagination/Pagination";

const Files = () => {
  const [auth] = useAuth();
  const filesListRef = ref(storage, "usersfiles/" + `${auth.userId}/`);
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

  const deleteFile = (name) => {
    const storage = getStorage();
    const fileRef = ref(storage, `usersfiles/${auth.userId}/${name}`);
    deleteObject(fileRef)
      .then(() => {
        console.log("success");
        setFilesList((prev) => prev.filter((file) => file.name !== name));
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(fileRef);
  };

  const lastfileIndex = currentPage * filesPerPage;
  const firstFilesIndex = lastfileIndex - filesPerPage;
  const currentFiles = filesList.slice(
    firstFilesIndex,
    lastfileIndex
  );

  return (
    <div className={`${style.filescontainer} container`}>
      <AddFiles setFilesList={setFilesList} />
      <h1 className="text-center mt-3">My Files</h1>

      {currentFiles.map((filesList) => {
        return (
          <File
            key={filesList.url}
            src={filesList.url}
            shortname={filesList.shortname}
            name={filesList.name}
            delete={deleteFile}
            userId={auth.userId}
          />
        );
      })}
      <Pagination totalItems={filesList.length}
            itemsPerPage={filesPerPage}
            setCurrentPage={setCurrentPage}/>
    </div>
  );
};

export default Files;
