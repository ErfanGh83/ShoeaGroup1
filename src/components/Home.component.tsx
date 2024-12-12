import HomeHeader from "./HomeComponents/homeHeader.component";
import HomeSearchBar from "./HomeComponents/homeSearchBar.component";
import HomeContainer from "./HomeComponents/homeContainer.component";

const Home = () => {
    return (
        <div className="h-screen">
            <HomeHeader />
            <HomeSearchBar />
            <HomeContainer />
        </div>
    )
}

export default Home;