import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
