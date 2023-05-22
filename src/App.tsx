import {FC, ReactNode, useEffect, useState} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import {Dashboard} from "./pages/dashboard/Dashboard";
import {Box} from "@mui/material";
import root from "react-shadow";
import {Navigate} from "react-router-dom";
import {Home} from "./pages/home/Home";
import {Bereaved} from "./pages/bereaved/Bereaved";
import {Buddy} from "./pages/buddy/Buddy";

export const App: FC = () => (
    <>
        <Routes>
            <Route path="/phone/*" Component={Phone}></Route>
            <Route path="/" Component={Home}></Route>
            <Route path="/bereaved" Component={Bereaved}></Route>
            <Route path="/buddy" Component={Buddy}></Route>
            <Route path="/dashboard" Component={Dashboard}></Route>
        </Routes>
        <RedirectLayout />
    </>
);

// Some tools to make sure that the desktop site shows UI as if it's a phone
const Phone: FC = () => {
    const loc = useLocation();
    const pathParts = loc.pathname.split("/");
    return (
        <iframe
            src={
                location.origin + location.pathname + "#/" + pathParts.slice(2).join("/")
            }
            height={740}
            width={360}
            css={{
                position: "relative",
                left: "50%",
                top: "50vh",
                transform: "translate(-50%, -50%)",
                border: "none",
            }}
        />
    );
};

const RedirectLayout: FC = () => {
    const location = useLocation();
    const [redirecting, setRedirecting] = useState<ReactNode | null>();
    useEffect(() => {
        const listener = () => {
            const shouldForcePhone = window.innerWidth > 500;
            const pathParts = location.pathname.split("/");
            const isForcingPhone = pathParts[1] == "phone";
            if (shouldForcePhone && !isForcingPhone)
                setRedirecting(<Navigate to={["phone", ...pathParts].join("/")} />);
            else if (!shouldForcePhone && isForcingPhone)
                setRedirecting(<Navigate to={pathParts.slice(2).join("/")} />);
            else setRedirecting(null);
        };
        listener();
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, [location]);
    console.log(redirecting);
    return <>{redirecting}</>;
};
