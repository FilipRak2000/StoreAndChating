import element from "../../../assets/executable_gear-0.png";
import style from '../File/File.module.css'

const File = (props) => {
  return (
    <div className={`${style.element}`}>
     
        <img className="img-fluid" src={props.src} alt="?"/>
        <div className="text-center mt-2">
      <button><a href={props.src}>download</a></button>
      </div>
    </div>
  );
};

export default File;
