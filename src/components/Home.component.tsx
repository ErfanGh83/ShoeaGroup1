import HomeHeader from "./HomeComponents/homeHeader.component";
import HomeSearchBar from "./HomeComponents/searchbar/homeSearchBar.component";
import HomeContainer from "./HomeComponents/homeContainer.component";
import HomeFooter from "./HomeComponents/homeFooter.component";

const Home = () => {
    return (
        <div className="h-fit">
            <HomeHeader />
            <HomeSearchBar />
            <HomeContainer />
            <HomeFooter />
        </div>
    )
}

export default Home;