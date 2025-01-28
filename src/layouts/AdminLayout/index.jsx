import { Outlet, Navigate } from "react-router-dom";
import { Container } from "./styles";
import { SideNavAdmin } from "../../components/SideNavAdmin";

export function AdminLayout() {
    const userData = localStorage.getItem('devburger:userData');
    const isAdmin = userData ? JSON.parse(userData).admin : false;
    

    return isAdmin ? (
        <Container>
            <SideNavAdmin />
            <main>
                <section>
                    <Outlet />
                </section>
            </main>
        </Container>
    ) : (
        <Navigate to={'/login'} />
    );
}
