import AdminNav from "../components/admin/AdminNav";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      <div className="pt-8">{children}</div>
    </div>
  );
};

export default AdminLayout;
