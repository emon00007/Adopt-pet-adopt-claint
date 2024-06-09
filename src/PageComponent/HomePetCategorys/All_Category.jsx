import useCategory from "../../Hooks/useCategory";

const All_Category = () => {
    const [category]=useCategory()
    
    return (
        <div>
            category{category.length}
        </div>
    );
};

export default All_Category;