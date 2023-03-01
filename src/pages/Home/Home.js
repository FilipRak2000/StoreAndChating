import About from "../../components/About/About";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";

const Home = () => {
  useWebsiteTitle("Home");
  return <About />;
};

export default Home;
