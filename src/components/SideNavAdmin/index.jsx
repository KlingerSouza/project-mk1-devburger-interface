import { useMemo } from "react";
import { navLinks } from "./navLinks";
import Logo from '../../assets/logo.svg';
import { SignOut } from "@phosphor-icons/react";
import { Container, Footer, NavLink, NavLinkContainer } from "./styles";
import { useUser } from "../../hooks/UserContext";
import { useResolvedPath } from "react-router-dom";

export function SideNavAdmin() {
    const { logout } = useUser();
    const { pathname } = useResolvedPath();

    // Memoriza os links para evitar re-renderizações desnecessárias
    const renderedLinks = useMemo(() =>
        navLinks.map(link => (
            <NavLink key={link.id} to={link.path} $isActive={pathname === link.path}>
                {link.icon && <link.icon size={24} />}
                <span>{link.label}</span>
            </NavLink>
        )),
        [pathname]
    );

    return (
        <Container>
            <img src={Logo} alt="Devlogo" />
            
            <NavLinkContainer>
                {renderedLinks}
            </NavLinkContainer>

            <Footer>
                <NavLink to='/login' onClick={logout}>
                    <SignOut size={24} />
                    <span>Sair</span>
                </NavLink>
            </Footer>
        </Container>
    );
}
