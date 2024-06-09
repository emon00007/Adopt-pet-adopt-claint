import useCategory from "../../Hooks/useCategory";

const Bird_category = () => {
    const [category]=useCategory()
    const bird = category.filter(item=>item.category ==='bird')
    return (
        <div>
            bird{bird.length}
        </div>
    );
};

export default Bird_category;