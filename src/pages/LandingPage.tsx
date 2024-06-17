import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../features/auth/authSlice";

import Home from "./Home";
import { LoginForm } from "../components/organisms/LoginForm";

const LandingPage = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return <>{isAuthenticated ? <Home /> : <LoginForm />}</>;
};

export default LandingPage;
