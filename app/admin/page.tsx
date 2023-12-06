import getOrders from "@/actions/getOrders";
import Summary from "./Summary";
import getProducts from "@/actions/getProducts";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";
import getCurrentUser from "@/actions/getCurrentUser";
import NullData from "../components/NullData";

const Admin = async () => {
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "Admin") {
    return <NullData title="Oops! Access denied." />;
  }

  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} orders={orders} users={users} />
      </Container>
    </div>
  );
};

export default Admin;
