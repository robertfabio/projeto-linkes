import { BiLogOut } from "react-icons/bi";
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnect";

export function Header() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  const getNavLinkClass = (navData: { isActive: boolean }) => {
    const baseClasses = "font-medium transition-colors duration-200 px-3 py-1.5 rounded-md text-sm sm:text-base";
    
    return navData.isActive
      ? `${baseClasses} bg-gray-700 text-white`
      : `${baseClasses} text-gray-300 hover:bg-gray-700 hover:text-white`;
  };

  return (
    <header className="w-full max-w-2xl mt-4 px-1 mx-auto">
      <nav className="w-full bg-gray-900 h-14 flex items-center justify-between rounded-md px-3 sm:px-4 shadow-lg">
        
        <div className="flex items-center gap-2 sm:gap-4">
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>
          <NavLink to="/admin" className={getNavLinkClass}>
            Links
          </NavLink>
          <NavLink to="/admin/social" className={getNavLinkClass}>
            <span className="hidden sm:inline">Redes Sociais</span>
            <span className="inline sm:hidden">Redes</span>
          </NavLink>
        </div>

        <button
          onClick={handleLogout}
          aria-label="Sair"
          className="p-1 rounded-md text-gray-300 transition-all duration-200
                     hover:text-red-500 hover:bg-gray-700 
                     focus:outline-none focus-visible:ring-2 
                     focus-visible:ring-red-500 focus-visible:ring-offset-2
                     focus-visible:ring-offset-gray-900"
        >
          <BiLogOut size={26} />
        </button>
      </nav>
    </header>
  );
}