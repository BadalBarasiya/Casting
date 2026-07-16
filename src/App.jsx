import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import CastingPage from './pages/CastingPage'
import DashboardPage from './pages/DashboardPage'
import PlaceholderPage from './pages/PlaceholderPage'
import './App.css'

function App() {
  return (
    <div className="erp-shell">
      <Sidebar />

      <main className="erp-main">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/casting" element={<CastingPage />} />
          <Route
            path="/inventory"
            element={
              <PlaceholderPage
                title="Raw Materials / Inventory"
                description="Track scrap, pig iron, and other foundry stock here."
              />
            }
          />
          <Route
            path="/billing"
            element={
              <PlaceholderPage
                title="Invoices & Billing"
                description="Manage invoices, billing records, and received payments here."
              />
            }
          />
          <Route
            path="/settings"
            element={
              <PlaceholderPage
                title="User Profile / Settings"
                description="Manage user profile, preferences, and ERP settings here."
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
