import { Button } from "@material-tailwind/react";
import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthProvider";
const SocialLogin = () => {
    const {googleSignIn,githubSignIn}=useContext(AuthContext)
    const handelGoogleLogin =()=>{
        googleSignIn()
        .then ((result)=>{
            console.log(result.user)
        })

        
    }

    const handelgithubLogin =()=>{
        githubSignIn()
        .then (result=>{
            console.log(result.user)
        })
        .catch((error)=>{
            console.error(error)
        })
        console.log('alhamdulillah');

        
    }
    return (
        <div>
            <div className="grid gap-3 md:grid-cols-2">
                <Button onClick={handelGoogleLogin} className="rounded bg-[#333333] flex gap-5 p-4   w-full hover:shadow-[#333333]/20 focus:shadow-[#333333]/20 active:shadow-[#333333]/10">
                    <FaGoogle></FaGoogle>Google
                </Button>
                <Button onClick={handelgithubLogin} className="rounded bg-[#333333] flex gap-5 p-4  w-full hover:shadow-[#333333]/20 focus:shadow-[#333333]/20 active:shadow-[#333333]/10">
                    <FaGithub className="text-xl"></FaGithub>Github
                </Button>
            </div>
        </div>
    );
};

export default SocialLogin;