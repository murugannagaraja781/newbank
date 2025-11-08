import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Dashboard.css"; // We'll create this CSS file

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalTransactions: 8456,
    totalRevenue: 125430,
    pendingRequests: 23,
  });

  const [recentTransactions, setRecentTransactions] = useState([
    {
      id: 1,
      user: "John Doe",
      type: "Deposit",
      amount: 2500,
      status: "Completed",
      date: "2024-01-15",
    },
    {
      id: 2,
      user: "Jane Smith",
      type: "Withdrawal",
      amount: 1500,
      status: "Pending",
      date: "2024-01-15",
    },
    {
      id: 3,
      user: "Bob Johnson",
      type: "Transfer",
      amount: 3000,
      status: "Completed",
      date: "2024-01-14",
    },
    {
      id: 4,
      user: "Alice Brown",
      type: "Deposit",
      amount: 5000,
      status: "Completed",
      date: "2024-01-14",
    },
    {
      id: 5,
      user: "Charlie Wilson",
      type: "Withdrawal",
      amount: 2000,
      status: "Failed",
      date: "2024-01-13",
    },
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      joinDate: "2024-01-10",
      balance: 12500,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Active",
      joinDate: "2024-01-09",
      balance: 8500,
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      status: "Inactive",
      joinDate: "2024-01-08",
      balance: 3200,
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      status: "Active",
      joinDate: "2024-01-07",
      balance: 15600,
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      status: "Suspended",
      joinDate: "2024-01-06",
      balance: 0,
    },
  ]);

  // Simulate data loading
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const timer = setTimeout(() => {
      setStats({
        totalUsers: 1247,
        totalTransactions: 8456,
        totalRevenue: 125430,
        pendingRequests: 23,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Completed: "success",
      Pending: "warning",
      Failed: "error",
      Active: "success",
      Inactive: "secondary",
      Suspended: "error",
    };

    return (
      <span className={`badge badge-${statusConfig[status]}`}>{status}</span>
    );
  };

  const renderOverview = () => (
    <div className="overview">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users">
            <i>👥</i>
          </div>
          <div className="stat-info">
            <h3>{stats.totalUsers.toLocaleString()}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon transactions">
            <i>💳</i>
          </div>
          <div className="stat-info">
            <h3>{stats.totalTransactions.toLocaleString()}</h3>
            <p>Total Transactions</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue">
            <i>💰</i>
          </div>
          <div className="stat-info">
            <h3>{formatCurrency(stats.totalRevenue)}</h3>
            <p>Total Revenue</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">
            <i>⏳</i>
          </div>
          <div className="stat-info">
            <h3>{stats.pendingRequests}</h3>
            <p>Pending Requests</p>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Revenue Overview</h3>
          <div className="chart-placeholder">
            <p>Revenue chart would be displayed here</p>
            <div className="chart-bars">
              <div className="chart-bar" style={{ height: "60%" }}></div>
              <div className="chart-bar" style={{ height: "80%" }}></div>
              <div className="chart-bar" style={{ height: "45%" }}></div>
              <div className="chart-bar" style={{ height: "90%" }}></div>
              <div className="chart-bar" style={{ height: "70%" }}></div>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3>User Growth</h3>
          <div className="chart-placeholder">
            <p>User growth chart would be displayed here</p>
            <div className="growth-line"></div>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Transactions</h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.user}</td>
                  <td>{transaction.type}</td>
                  <td>{formatCurrency(transaction.amount)}</td>
                  <td>{getStatusBadge(transaction.status)}</td>
                  <td>{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="users-section">
      <div className="section-header">
        <h3>User Management</h3>
        <button className="btn-primary">+ Add New User</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">{user.name.charAt(0)}</div>
                    {user.name}
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{getStatusBadge(user.status)}</td>
                <td>{user.joinDate}</td>
                <td>{formatCurrency(user.balance)}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Edit">
                      ✏️
                    </button>
                    <button className="btn-icon" title="View">
                      👁️
                    </button>
                    <button className="btn-icon btn-danger" title="Delete">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="transactions-section">
      <div className="section-header">
        <h3>Transaction History</h3>
        <div className="filters">
          <select className="filter-select">
            <option>All Types</option>
            <option>Deposit</option>
            <option>Withdrawal</option>
            <option>Transfer</option>
          </select>
          <select className="filter-select">
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
          <input
            type="date"
            className="filter-select"
            placeholder="From Date"
          />
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>User</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>#TX{transaction.id.toString().padStart(6, "0")}</td>
                <td>{transaction.user}</td>
                <td>{transaction.type}</td>
                <td>{formatCurrency(transaction.amount)}</td>
                <td>{getStatusBadge(transaction.status)}</td>
                <td>{transaction.date}</td>
                <td>
                  <button className="btn-sm">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="settings-section">
      <div className="settings-grid">
        <div className="setting-card">
          <h4>System Settings</h4>
          <div className="setting-item">
            <label>Bank Name</label>
            <input type="text" defaultValue="My Bank" />
          </div>
          <div className="setting-item">
            <label>Currency</label>
            <select defaultValue="USD">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>
          <div className="setting-item">
            <label>Timezone</label>
            <select defaultValue="UTC-5">
              <option>UTC-5</option>
              <option>UTC-0</option>
              <option>UTC+1</option>
            </select>
          </div>
        </div>

        <div className="setting-card">
          <h4>Security Settings</h4>
          <div className="setting-item">
            <label>Two-Factor Authentication</label>
            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <label>Session Timeout</label>
            <select defaultValue="30">
              <option>15</option>
              <option>30</option>
              <option>60</option>
            </select>
          </div>
        </div>

        <div className="setting-card">
          <h4>Notification Settings</h4>
          <div className="setting-item">
            <label>Email Notifications</label>
            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <label>SMS Alerts</label>
            <label className="toggle">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn-primary">Save Settings</button>
        <button className="btn-secondary">Reset to Default</button>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>My Bank</h2>
          <div className="admin-info">
            <div className="admin-avatar">{user?.name?.charAt(0) || "A"}</div>
            <div className="admin-details">
              <strong>{user?.name}</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            📊 Overview
          </button>
          <button
            className={`nav-item ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            👥 Users
          </button>
          <button
            className={`nav-item ${
              activeTab === "transactions" ? "active" : ""
            }`}
            onClick={() => setActiveTab("transactions")}
          >
            💳 Transactions
          </button>
          <button
            className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            ⚙️ Settings
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="top-bar-left">
            <h1>Dashboard</h1>
          </div>
          <div className="top-bar-right">
            <div className="notifications">
              <button className="icon-btn">🔔</button>
              <span className="notification-badge">3</span>
            </div>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {activeTab === "overview" && renderOverview()}
          {activeTab === "users" && renderUsers()}
          {activeTab === "transactions" && renderTransactions()}
          {activeTab === "settings" && renderSettings()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
