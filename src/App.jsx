import React, { useEffect, useState } from "react";
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Board from './components/Board/Board';

function App() {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("default");
  const [theme, setTheme] = useState("dark"); // Default theme

  // Set the theme on the <body>
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header
          theme={theme}
          setTheme={setTheme}
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
        />
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Board filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
        </div>
      </div>
    </div>
  );
}

export default App;
