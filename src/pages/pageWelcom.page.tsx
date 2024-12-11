import BackgroundWelcome from "../components/backgroundWelcome";
interface WelcomePageProps {
  setPage: (value: number) => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ setPage }) => {
  setTimeout(() => {
    setPage(2);
  }, 3000);

  return (
    <div className="">
      <BackgroundWelcome />
    </div>
  );
};
export default WelcomePage;
