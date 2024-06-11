import { Button } from "@material-tailwind/react";
import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
const SocialLogin = () => {
    const axiosPublic =useAxiosPublic()
    const {googleSignIn,githubSignIn}=useContext(AuthContext)
    const handelGoogleLogin =()=>{
        googleSignIn()
        .then ((result)=>{
            console.log(result.user)
            const userInfo ={
                email:result.user?.email,
                name:result.user?.displayName
            }
            console.log(userInfo)
            axiosPublic.post('/userAdded',userInfo)
            .then(res=>{
                console.log(res.data)
            })
        })
        .catch((error)=>{
            console.error(error)
        })
    }

    const handelgithubLogin =()=>{
        githubSignIn()
        .then (result=>{
            console.log(result.user)
            const userInfo ={
                email:result.user?.email,
                name:result.user?.displayName
            }
            console.log(userInfo)
            axiosPublic.post('/userAdded',userInfo)
            .then(res=>{
                console.log(res.data)
            })
        })
        .catch((error)=>{
            console.error(error)
        })
        

        
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