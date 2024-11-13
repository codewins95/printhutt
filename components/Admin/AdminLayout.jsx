import Header from "./Header";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Header />
      {children}
    </>
  );
};

export default AdminLayout;
