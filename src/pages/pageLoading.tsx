import Loading from "../components/loadingLogo";
import SiteTitle from "../components/siteTitle";
import SiteLogo from "../components/siteLogo";

interface LoadingProps {
  setPage: (value: number) => void;
}

const LoadingPage: React.FC<LoadingProps> = () => {


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
