import { useEffect, useState } from "react";
import AddFiles from "../AddFiles/AddFiles";
import File from "../File/File";
import style from "../Files/Files.module.css";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../../firebase";
import useAuth from "../../../hooks/useAuth";


const Files = () => {
  const [auth] = useAuth();
  const filesListRef = ref(storage, "usersfiles/" + `${auth.userId}/`);
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

  return (
    <div className={`${style.filescontainer} container`}>
      <AddFiles />
      <h1 className="text-center mt-3">My Files</h1>

      {filesList.map((url) => {
        return <File key={url} src={url} />;
      })}
    </div>
  );
};

export default Files;
