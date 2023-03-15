import { useEffect, useState } from "react";
import AddFiles from "../AddFiles/AddFiles";
import File from "../File/File";
import style from "../Files/Files.module.css";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { storage } from "../../../firebase";
import useAuth from "../../../hooks/useAuth";
import { deleteObject } from "firebase/storage";



const Files = () => {
  const [auth] = useAuth();
  const filesListRef = ref(storage, "usersfiles/" + `${auth.userId}/`);
  const [filesList, setFilesList] = useState([]);
 

  useEffect(() => {
    listAll(filesListRef).then((response) => {
      response.items.map((item) => {
        getDownloadURL(item).then((url) => {
            const fileName = item.name.substring(0, 5) + '...' + item.name.substring(item.name.length - 5)
            const name = item.name
            setFilesList((prev) => [...prev, { shortname: fileName, url: url, name:name }]);
        });
      });
    });
  }, []);





  const deleteFile = (name) =>{
    const storage = getStorage()
    const fileRef = ref(storage, `usersfiles/${auth.userId}/${name}`)
    deleteObject(fileRef).then(() => {
        console.log('success')
        setFilesList(prev => prev.filter(file => file.name !== name));
      }).catch((error) => {
      console.log(error)
      });
    console.log(fileRef)
  }


 

  return (
    <div className={`${style.filescontainer} container`}>
      <AddFiles setFilesList={setFilesList}/>
      <h1 className="text-center mt-3">My Files</h1>

      {filesList.map((filesList) => {
        return <File key={filesList.url} src={filesList.url} shortname={filesList.shortname} name={filesList.name} delete={deleteFile} userId={auth.userId} />;
      })}
    </div>
  );
};

export default Files;
