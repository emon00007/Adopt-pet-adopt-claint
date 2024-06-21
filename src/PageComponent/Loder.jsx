import { Hourglass } from "react-loader-spinner";


const Loder = () => {
    return (
        <div className="flex justify-center">
            <Hourglass 
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#306cce', '#72a1ed']}
            />
        </div>
    );
};

export default Loder;