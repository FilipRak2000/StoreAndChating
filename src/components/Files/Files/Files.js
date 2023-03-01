import AddFiles from "../AddFiles/AddFiles"
import File from "../File/File"
import style from '../Files/Files.module.css'

const Files = () =>{

    const files = [
        {
            id:1,
            name:'file1',
            img: 'skfnasfksaf'
        }, 
        {
            id:2,
            name:'file2',
            img: 'brrrrrrr'
        }, 
        {
            id:3,
            name:'file2',
            img: 'brrrrrrr'
        }
    ]

    return(
        <div className={`${style.filescontainer} container`}>
            <AddFiles/>
            <h1 className="text-center mt-3">My Files</h1>
            {files.map(file => (
                <File key={file.id} name={file.name}/>
            ))}
        </div>
    )
}

export default Files