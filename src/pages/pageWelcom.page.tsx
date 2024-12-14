import BackgroundWelcome from "../components/backgroundWelcome";
import { useNavigate } from "react-router-dom";


const WelcomePage: React.FC = () => {
  const navigate=useNavigate()
  setTimeout(() => {
    navigate("/onboarding")
     }, 6000);
  return (
    <div className="">
      <BackgroundWelcome />
    </div>
  );
};
export default WelcomePage;
