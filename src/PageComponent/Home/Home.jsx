import BannerSection from "../BannerSection/BannerSection";
import PetsCategorySection from "../PetCategorySection/PetsCategorySection";
import AboutUs from "./ABoutUs/AboutUs";
import GivFavrite from "./GivFavorite home/GivFavrite";

const Home = () => {
    return (
        <div>
            <BannerSection> </BannerSection>
            <PetsCategorySection></PetsCategorySection>
            <GivFavrite></GivFavrite>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;