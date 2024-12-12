import HomeContainerCategories from "./homeContainer/homeContainerCategories.component"
import HomeContainerProductsComponent from "./homeContainer/homeContainerProducts.component"

const HomeContainer = () => {

    return(
        <div className="w-11/12 h-full my-4 border-2 mx-auto flex flex-col">
            <HomeContainerCategories />
            <HomeContainerProductsComponent />
        </div>
    )
}

export default HomeContainer