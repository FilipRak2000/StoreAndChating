import element from "../../../assets/executable_gear-0.png";
import style from '../File/File.module.css'

const File = (props) => {
  return (
    <div className={`${style.element}`}>
      <h1>{props.name}</h1>
      <h1 className="text-center">
        <img src={element} alt="?"/>
      </h1>
      <button>download</button>
    </div>
  );
};

export default File;
