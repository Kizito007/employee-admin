import React, { useState } from 'react';

const sidebarStyle = (collapsed) => ({
  width: collapsed ? '60px' : '220px',
  height: '100vh',
  background: '#B974FF',
  color: '#e0e4ea',
  display: 'flex',
  flexDirection: 'column',
  transition: 'width 0.2s',
  position: 'fixed',
  left: 0,
  top: 0,
  zIndex: 100,
});

const headerStyle = (collapsed) => ({
  padding: collapsed ? '24px 8px' : '24px 16px',
  borderBottom: '1px solid #2c313c',
  fontSize: collapsed ? '1.1rem' : '1.3rem',
  fontWeight: 'bold',
  letterSpacing: '1px',
  textAlign: collapsed ? 'center' : 'left',
});

const navStyle = {
  flex: 1,
  padding: '16px 0',
};

const ulStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

const liStyle = {
  margin: '0',
  padding: '0',
};

const linkStyle = (collapsed) => ({
  display: 'block',
  padding: collapsed ? '12px 8px' : '12px 24px',
  color: '#e0e4ea',
  textDecoration: 'none',
  borderRadius: '4px',
  transition: 'background 0.2s, padding 0.2s',
  fontSize: collapsed ? '1.1rem' : '1rem',
  textAlign: collapsed ? 'center' : 'left',
});

const activeLinkStyle = {
  background: '#39414e',
};

const toggleBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#e0e4ea',
  fontSize: '1.2rem',
  cursor: 'pointer',
  padding: '8px',
  margin: '8px',
  alignSelf: 'flex-end',
};

const Sidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      <aside className="sidebar" style={sidebarStyle(collapsed)}>
        <button
          style={toggleBtnStyle}
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '▶' : '◀'}
        </button>
        {/* <div className="sidebar-header" style={headerStyle(collapsed)}>
          {!collapsed && <h2 style={{ margin: 0 }}>Employee Admin</h2>}
        </div> */}
        <nav className="sidebar-nav" style={navStyle}>
          <ul style={ulStyle}>
            <li style={liStyle}>
              <a href="/dashboard" style={linkStyle(collapsed)}>
                {collapsed ? '🏠' : 'Dashboard'}
              </a>
            </li>
            <li style={liStyle}>
              <a href="/departments" style={linkStyle(collapsed)}>
                {collapsed ? '🏢' : 'Departments'}
              </a>
            </li>
            <li style={liStyle}>
              <a href="/payroll" style={linkStyle(collapsed)}>
                {collapsed ? '💰' : 'Payroll'}
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <div
        style={{
          marginLeft: collapsed ? '60px' : '220px',
          transition: 'margin-left 0.2s',
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Sidebar;
