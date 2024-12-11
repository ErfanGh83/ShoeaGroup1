import Loading from "../components/loadingLogo.component";
import SiteTitle from "../components/siteTitle.component";
import SiteLogo from "../components/siteLogo.component";

interface LoadingProps {
  setPage: (value: number) => void;
}

const LoadingPage: React.FC<LoadingProps> = ({ setPage }) => {
  setTimeout(() => {
    setPage(1);
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
