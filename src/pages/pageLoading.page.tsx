import Loading from "../components/loadingLogo";
import SiteTitle from "../components/siteTitle";
import SiteLogo from "../components/siteLogo";
import { useNavigate } from "react-router-dom";

const LoadingPage: React.FC= () => {
const navigate=useNavigate()
  setTimeout(() => {
   navigate("/welcomepage")
    }, 6000);
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-row justify-center items-center gap-2 ">
        <SiteLogo />
        <SiteTitle />
      </div>

      <Loading />
    </div>
  );
};
export default LoadingPage;
