import HomeHeader from "./HomeComponents/homeHeader.component";
import HomeContainer from "./HomeComponents/homeContainer.component";
import HomeFooter from "./HomeComponents/homeFooter.component";
import HomeSearchBar from "./HomeComponents/searchbar/homeSearchBar";
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