import React from "react";

const layoutStyles = {
  margin: "0 auto",
  maxWidth: "1200px",
  minWidth: "800px",
};

function Layout({ children }) {
  return (
    <div>
      <div style={{ ...layoutStyles }}>{children}</div>
    </div>
  );
}

export default Layout;
