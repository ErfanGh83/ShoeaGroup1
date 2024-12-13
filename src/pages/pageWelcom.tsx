import BackgroundWelcome from "../components/backgroundWelcome";
interface WelcomePageProps {
  setPage: (value: number) => void;
}

const WelcomePage: React.FC<WelcomePageProps> = () => {

  return (
    <div className="">
      <BackgroundWelcome />
    </div>
  );
};
export default WelcomePage;
