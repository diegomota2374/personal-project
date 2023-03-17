import Login from "../../@core/components/Login";
import { useRouter } from "next/router"
import Register from "../../@core/components/Register";

const Auth = () => {
    const router = useRouter();
    const {index} = router.query;
    return(
        index === "Login" || !index ? (
            <Login/>
        ) :  index === "Register" ?(
            <Register/>
        ):(
            <Login/>
        )
            
    )}
export default Auth