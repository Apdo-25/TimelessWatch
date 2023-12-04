"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Order, Product, User } from "@prisma/client";
import { formatPrice } from "../../../utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
  MdAccessTime,
  MdCached,
  MdClose,
  MdDelete,
  MdDeliveryDining,
  MdDone,
  MdRemove,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/lib/firebase";
import moment from "moment";
interface ManageOrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  let rows: any = [];
  if (orders) {
    rows = orders.map((orders) => {
      return {
        id: orders.id,
        customer: orders.user.name,
        amount: formatPrice(orders.amount / 100),
        paymentSatus: orders.status,
        date: moment(orders.createdDate).fromNow(),
        deliveryStatus: orders.deliveryStatus,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "customer", headerName: "Customer Name", width: 130 },
    {
      field: "amount",
      headerName: "Amount(DKK)",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800 ">{params.row.amount}</div>
        );
      },
    },
    {
      field: "paymentSatus",
      headerName: "Payment Status",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            {params.row.paymentSatus === "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTime}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.paymentSatus === "paid" ? (
              <Status
                text="paid"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : params.row.paymentSatus === "failed" ? (
              <Status
                text="failed"
                icon={MdClose}
                bg="bg-red-200"
                color="text-red-700"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Staus",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.deliveryStatus === "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTime}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.deliveryStatus === "Sendt" ? (
              <Status
                text="sendt"
                icon={MdDeliveryDining}
                bg="bg-purple-200"
                color="text-purple-700"
              />
            ) : params.row.deliveryStatus === "delivered" ? (
              <Status
                text="delivered"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    { field: "date", headerName: "Date", width: 100 },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              icon={MdDeliveryDining}
              onClick={() => {
                handleDispatch(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdDone}
              onClick={() => {
                handleDelivery(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleDispatch = useCallback((id: string) => {
    axios
      .put("/api/order", {
        id,
        deliveryStatus: "Sendt",
      })
      .then(() => {
        toast.success("Order Dispatched");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  }, []);

  const handleDelivery = useCallback((id: string) => {
    axios
      .put("/api/order", {
        id,
        deliveryStatus: "delivered",
      })
      .then(() => {
        toast.success("Order Delivered");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  }, []);

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Orders" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageOrdersClient;
