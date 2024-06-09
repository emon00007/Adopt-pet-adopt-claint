import useCategory from "../../Hooks/useCategory";

const Catagory_dog = () => {
    const [category]=useCategory()
        const dogs = category.filter(item=>item.category ==='dog')
    return (
        
        <div>
            <h1> dog{dogs.length}</h1>
        </div>
    );
};

export default Catagory_dog;