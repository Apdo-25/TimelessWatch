import AdminNav from "../components/admin/AdminNav";

export const metada = {
  title: "Admin Layout",
  keywords: ["admin", "layout"],
  description: "Admin layout",
  tags: ["admin", "layout"],
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      <div className="pt-8">{children}</div>
    </div>
  );
};

export default AdminLayout;
