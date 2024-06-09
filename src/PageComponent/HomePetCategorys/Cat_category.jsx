import useCategory from "../../Hooks/useCategory";

const Cat_category = () => {
    const [category]=useCategory()
    const cat = category.filter(item=>item.category ==='cat')
    return (
        <div>
            cat{cat.length}
        </div>
    );
};

export default Cat_category;