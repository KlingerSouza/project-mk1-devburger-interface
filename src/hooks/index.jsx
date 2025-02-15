import { CartProvider } from "./CartContext";
import { UserProvider } from "./UserContext";

export function AppProvider({ children }) {
  return (
    <UserProvider>
      <CartProvider>{children}</CartProvider>
    </UserProvider>
  );
}

export default AppProvider;
