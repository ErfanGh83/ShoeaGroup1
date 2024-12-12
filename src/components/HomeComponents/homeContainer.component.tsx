import HomeContainerCategories from "./homeContainer/homeContainerCategories.component"

const HomeContainer = () => {

    return(
        <div className="w-11/12 h-full my-4 border-2 border-black mx-auto flex flex-col">
            <HomeContainerCategories />
        </div>
    )
}

export default HomeContainer