import { FaCaretDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config/axiosconfig";
import CreditDebitModal from "../components/AllModals/creditdebitmodal";
import ConfirmDeleteModal from "../components/AllModals/ConfirmDeleteModal";
// import ConfirmClearAcct from "../components/AllModals/ConfirmClearAcct";
import toast from "react-hot-toast";

/* ===================== TYPES ===================== */
interface UserData {
  id: string;
  uid: string;
  name: string;
  username: string;
  email: string;

  balance: number;
  earnings: number;

  verified: boolean;
  type: "user" | "admin";

  createdAt: number;
}

/* ===================== COMPONENT ===================== */
const UserDetails = () => {
  const { uid } = useParams<{ uid: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState<UserData | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  /* ===================== FETCH USER ===================== */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/admin/users/${uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.data);
      } catch {
        toast.error("Failed to load user");
      }
    };

    fetchUser();
  }, [uid, token]);

  /* ===================== ACTIONS ===================== */
  // const verifyUser = async () => {
  //   const t = toast.loading("Verifying user...");
  //   try {
  //     await axios.put(
  //       `/admin/verifyUser/${uid}`,
  //       {},
  //       { headers: { Authorization: `Bearer ${token}` } },
  //     );
  //     setUser((prev) => prev && { ...prev, verified: true });
  //   } finally {
  //     toast.dismiss(t);
  //   }
  // };

  const deleteUser = async () => {
    const t = toast.loading("Deleting user...");
    try {
      await axios.delete(`/admin/users/${uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(-1);
    } finally {
      toast.dismiss(t);
    }
  };

  // const clearAcct = async () => {
  //   const t = toast.loading("Clearing account...");
  //   try {
  //     const res = await axios.delete(`/admin/clearAccount/${uid}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setUser(res.data.data);
  //   } finally {
  //     toast.dismiss(t);
  //   }
  // };

  /* ===================== HELPERS ===================== */
  if (!user) return <div className="p-6">Loading...</div>;

  const firstName = user.name?.split(" ")[0] || "—";
  const lastName = user.name?.split(" ").slice(1).join(" ");

  // const statusColor = user.verified ? "bg-green-500" : "bg-yellow-500";
  // const statusText = user.verified ? "VERIFIED" : "UNVERIFIED";

  /* ===================== UI ===================== */
  return (
    <div className="w-full h-screen overflow-y-auto">
      {/* HEADER */}
      <div className="w-full h-24 flex justify-between px-8 items-center">
        <p className="text-2xl font-semibold">
          {firstName} {lastName}
        </p>

        <div className="relative flex gap-2">
          <button
            className="px-5 py-2 bg-red-500 text-white rounded"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <button
            className="px-5 py-2 bg-blue-500 text-white rounded flex items-center gap-1"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Actions <FaCaretDown />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-12 w-44 bg-white shadow rounded">
              <ul>
                {/* <li
                  onClick={verifyUser}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                >
                  Verify User
                </li> */}
                <li
                  onClick={() => setIsModalOpen(true)}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                >
                  Credit / Debit
                </li>
                {/* <li
                  onClick={() => setIsClearModalOpen(true)}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                >
                  Clear Account
                </li> */}
                <li
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="p-3 hover:bg-gray-100 cursor-pointer text-red-500"
                >
                  Delete User
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* STATUS */}
      {/* <div className="px-8">
        <span className={`px-4 py-2 text-white rounded ${statusColor}`}>
          {statusText}
        </span>
      </div> */}

      {/* USER INFO */}
      <div className="p-8 grid grid-cols-2 gap-6">
        <div>
          <p className="font-semibold">Username</p>
          <p>{user.username}</p>
        </div>

        <div>
          <p className="font-semibold">Email</p>
          <p>{user.email}</p>
        </div>

        <div>
          <p className="font-semibold">Balance</p>
          <p>${user.balance.toFixed(2)}</p>
        </div>

        <div>
          <p className="font-semibold">Earnings</p>
          <p>${user.earnings.toFixed(2)}</p>
        </div>

        <div>
          <p className="font-semibold">User Type</p>
          <p className="uppercase">{user.type}</p>
        </div>

        <div>
          <p className="font-semibold">Joined</p>
          <p>{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* MODALS */}
      <CreditDebitModal
        uid={uid}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={deleteUser}
      />
      {/* <ConfirmClearAcct
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={clearAcct}
      /> */}
    </div>
  );
};

export default UserDetails;
