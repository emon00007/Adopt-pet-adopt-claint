import useCategory from "../../Hooks/useCategory";

const Rabbit_category = () => {
    const [category]=useCategory()
    const rabbit = category.filter(item=>item.category ==='rabbit')
    return (
        <div>
           rabbit {rabbit.length}
        </div>
    );
};

export default Rabbit_category;