import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Login from "./login";
import { Stack } from "@mui/material";
import Header from "./header";

function Layout() {
    const reducer = useSelector(state => state.reducer);
    return <>
        {
            reducer?.login
                ?
                <Stack className="h-full">
                    <Header />
                    <div className="p-4 h-full">
                        <Outlet />
                    </div>
                </Stack>
                : <Login />
        }
    </>
}
export default Layout;