import { UserCircle, ShoppingCart } from "@phosphor-icons/react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { useUser } from "../../hooks/UserContext";
import {
    Container,
    Content,
    HeaderLink,
    LinkContainer,
    Logout,
    Navigation,
    Options,
    Profile
} from "./styles";

export function Header() {
    const navigate = useNavigate();
    const { logout, userInfo } = useUser();
    const { pathname } = useResolvedPath();

    const handleNavigate = (path) => navigate(path);

    const handleLogout = () => {
        logout();
        handleNavigate("/login");
    };

    return (
        <Container>
            <Content>
                <Navigation>
                    <div>
                        <HeaderLink to="/" $isActive={pathname === "/"}>Home</HeaderLink>
                        <hr />
                        <HeaderLink to="/cardapio" $isActive={pathname === "/cardapio"}>Cardápio</HeaderLink>
                    </div>
                </Navigation>

                <Options>
                    <Profile>
                        <UserCircle className="profile-icon" size={24} />
                        <div>
                            <p>Olá, <span>{userInfo?.name || "Visitante"}</span>!</p>
                            <Logout onClick={handleLogout}>Sair</Logout>
                        </div>
                    </Profile>

                    <LinkContainer>
                        <ShoppingCart
                            className="cart-link"
                            size={24}
                            onClick={() => handleNavigate("/carrinho")}
                        />
                        <HeaderLink to="/carrinho">Carrinho</HeaderLink>
                    </LinkContainer>
                </Options>
            </Content>
        </Container>
    );
}
