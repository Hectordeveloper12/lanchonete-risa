import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole, UserRoleLabels } from '../types';
import './Layout.css';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isSuperAdmin = user?.role === UserRole.SuperAdmin;
  const isKitchen = user?.role === UserRole.Kitchen;

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>🍔 Lanchonete Risa</h2>
        </div>
        <nav className="sidebar-nav">
          {!isKitchen && (
            <>
              <NavLink to="/orders" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                📋 Pedidos
              </NavLink>
              <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                🛒 Produtos
              </NavLink>
              <NavLink to="/categories" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                📂 Categorias
              </NavLink>
              <NavLink to="/tables" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                🪑 Mesas
              </NavLink>
              <NavLink to="/sessions" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                🔓 Sessões
              </NavLink>
              <NavLink to="/payments" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                💰 Pagamentos
              </NavLink>
            </>
          )}
          <NavLink to="/kitchen" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            🍳 Cozinha
          </NavLink>
          {isSuperAdmin && (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                📊 Dashboard
              </NavLink>
              <NavLink to="/tenants" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                🏢 Restaurantes
              </NavLink>
            </>
          )}
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">{user ? UserRoleLabels[user.role] : ''}</span>
          </div>
          <button className="btn-logout" onClick={handleLogout}>Sair</button>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
