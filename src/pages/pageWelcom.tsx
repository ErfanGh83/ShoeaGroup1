import BackgroundWelcome from "../components/backgroundWelcome";
import { useNavigate } from "react-router-dom";

interface WelcomePageProps {
  setPage: (value: number) => void;
}

const WelcomePage: React.FC<WelcomePageProps> = () => {
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
