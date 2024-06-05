import { Button } from "@material-tailwind/react";

const PetsCategorySection = () => {
    return (
        <div> 
        <div className="  text-center p-5">
            <Button className=" bg-blue-gray-400">Our Adoptions Category</Button>
        </div>
            <div className="grid justify-center md:grid-cols-4  items-center gap-5 m-auto text-center md:h-56">

                <div className=" border shadow-sm">
                    <img className="h-56 mx-auto" src="https://i.ibb.co/HxDDvYm/47062.png" alt="" />
                    <p>Dogs</p>

                </div>
                <div className="border   shadow-sm">
                    <img className="h-56 mx-auto" src="https://i.ibb.co/Cb024hc/47197.png" alt="" />
                    <p>Cats</p>
                </div>
                <div className=" border shadow-sm">
                    <img className="h-56 mx-auto" src="https://i.ibb.co/74X2S7P/rabbitpng-parspng-com-3.png" alt="" />
                    <p>Rabbits</p>
                </div>
                <div className="border shadow-sm">
                    <img className="h-56 mx-auto" src="https://i.ibb.co/92f0x37/ca54153dd944ab71f8f92fd72d3229ef.png" alt="" />
                    <p>Birds</p>
                </div>

            </div>
        </div>
    );
};

export default PetsCategorySection;