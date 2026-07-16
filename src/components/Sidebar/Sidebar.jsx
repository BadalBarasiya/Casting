import { NavLink } from 'react-router-dom'
import {
  FiBox,
  FiCreditCard,
  FiGrid,
  FiHome,
  FiSettings,
  FiTool,
  FiUser,
} from 'react-icons/fi'
import './Sidebar.css'

const mainMenu = [
  {
    id: 'dashboard',
    path: '/',
    label: 'Dashboard',
    helper: 'Home',
    icon: FiHome,
  },
  {
    id: 'casting',
    path: '/casting',
    label: 'Casting',
    helper: 'Mal, Kadi, and Lokhand',
    icon: FiGrid,
  },
  {
    id: 'inventory',
    path: '/inventory',
    label: 'Raw Materials / Inventory',
    helper: 'Scrap and pig iron stock',
    icon: FiBox,
  },
  {
    id: 'billing',
    path: '/billing',
    label: 'Invoices & Billing',
    helper: 'Sales, invoices, and payments',
    icon: FiCreditCard,
  },
]

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="sidebar__brand">
        <div className="sidebar__brand-mark">
          <FiTool />
        </div>
        <div className="sidebar__brand-copy">
          <span>Foundry ERP</span>
          <strong>Casting</strong>
        </div>
      </div>

      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          {mainMenu.map((item) => {
            const Icon = item.icon

            return (
              <li key={item.id}>
                <NavLink
                  className={({ isActive }) =>
                    `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                  }
                  end={item.path === '/'}
                  to={item.path}
                  title={item.label}
                >
                  <Icon className="sidebar__icon" />
                  <span className="sidebar__text">
                    <span>{item.label}</span>
                    <small>{item.helper}</small>
                  </span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      <NavLink
        className={({ isActive }) =>
          `sidebar__profile ${isActive ? 'sidebar__profile--active' : ''}`
        }
        title="User Profile / Settings"
        to="/settings"
      >
        <span className="sidebar__avatar">
          <FiUser />
        </span>
        <span className="sidebar__profile-copy">
          <strong>User Profile</strong>
          <small>Settings</small>
        </span>
        <FiSettings className="sidebar__settings" />
      </NavLink>
    </aside>
  )
}

export default Sidebar
