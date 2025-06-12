import { FaCaretDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config/axiosconfig";
import { setOneUser } from "../Global/AdminSlice";
import CreditDebitModal from "../components/AllModals/creditdebitmodal";
import ConfirmSuspendModal from "../components/AllModals/confirmsuspendmodal";
import ConfirmUnsuspendModal from "../components/AllModals/confirmunsuspendmodal";
import ConfirmDeleteModal from "../components/AllModals/ConfirmDeleteModal";
import ConfirmClearAcct from "../components/AllModals/ConfirmClearAcct";
import toast from "react-hot-toast";

interface UserData {
  phoneNumber: string | number | readonly string[] | undefined;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  accountBalance: number;
  totalProfit: number;
  referralBonus: number;
  totalBonus: number;
  investmentPlan: number;
  status: string;
  login: boolean;
  isVerified: boolean;
  createdAt: string;
  _id: string;
}

interface RootState {
  admin: {
    oneUser: UserData | null;
    token: string;
  };
  user: {
    oneUser: UserData | null;
  };
}

const UserDetails = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isUnsuspendModalOpen, setIsUnsuspendModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = useSelector((state: RootState) => state.admin.token);

  const oneUser = useSelector((state: RootState) => state.admin.oneUser);
  const { _id } = useParams<{ _id: string }>();

  console.log(_id);

  const verifyUser = async () => {
    const toastloadinId = toast.loading("Please wait...");
    const verifyUrl = `/admin/verifyUser/${_id}`;
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    try {
      await axios.put(verifyUrl, {}, { headers });
      dispatch(setOneUser({ ...oneUser, isVerified: true }));
    } catch (error) {
      console.error("Error verifying user:", error);
    } finally {
      toast.dismiss(toastloadinId);
    }
  };

  const unsuspendUser = async () => {
    const toastloadinId = toast.loading("Please wait...");
    const unsuspendUrl = `/admin/unsuspendUser/${_id}`;
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    try {
      const response = await axios.put(unsuspendUrl, {}, { headers });
      dispatch(setOneUser({ ...oneUser, status: "approved" }));
      console.log(response.data.data);
    } catch (error) {
      console.error("Error unsuspending user:", error);
    } finally {
      toast.dismiss(toastloadinId);
    }
  };

  const suspendUser = async () => {
    const toastloadinId = toast.loading("Please wait...");
    const suspendUrl = `/admin/suspendUser/${_id}`;
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    try {
      await axios.put(suspendUrl, {}, { headers });
      dispatch(setOneUser({ ...oneUser, status: "suspended" }));
      console.log("User suspended successfully");
    } catch (error) {
      console.error("Error suspending user:", error);
    } finally {
      toast.dismiss(toastloadinId);
    }
  };

  const deleteUser = async () => {
    const toastloadinId = toast.loading("Please wait...");
    const deleteUrl = `/admin/deleteOneUser/${_id}`;
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    try {
      await axios.delete(deleteUrl, { headers });
      navigate(-1); // Navigate back to the previous page after deletion
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      toast.dismiss(toastloadinId);
    }
  };

  const clearAcct = async () => {
    const toastloadinId = toast.loading("Please wait...");
    try {
      const response = await axios.delete(`/admin/clearAccount/${_id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      dispatch(setOneUser(response.data));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastloadinId);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const url = `/admin/getOne/${_id}`;
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };

      try {
        const response = await axios.get<{ data: UserData }>(url, { headers });
        dispatch(setOneUser(response.data.data));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [_id, userToken, dispatch]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openSuspendModal = () => {
    setIsSuspendModalOpen(true);
  };

  const closeSuspendModal = () => {
    setIsSuspendModalOpen(false);
  };

  const openUnsuspendModal = () => {
    setIsUnsuspendModalOpen(true);
  };

  const closeUnsuspendModal = () => {
    setIsUnsuspendModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const OpenClearModal = () => {
    setIsClearModalOpen(true);
  };
  const closeClearModal = () => {
    setIsClearModalOpen(false);
  };

  if (!oneUser) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  // Function to determine status color
  const getStatusColor = () => {
    if (oneUser.status === "approved") {
      return "bg-green-500 uppercase";
    } else if (oneUser.status === "suspended") {
      return "bg-red-500 uppercase";
    } else if (oneUser.status === "pending") {
      return "bg-yellow-500 uppercase";
    } else {
      return "bg-grey-400"; // Default color if status is undefined or unexpected
    }
  };

  return (
    <div className="w-full h-screen overflow-y-auto ">
      <div
        className={`w-full h-24 flex justify-between px-8 items-center max-md:h-[7rem] max-md:justify-center gap-2 max-md:flex-col`}
      >
        <p className="font-medium text-2xl">
          {oneUser.firstName} {oneUser.lastName}
        </p>
        <div className="relative w-2/5 h-12 flex justify-center gap-2 items-center max-md:w-[100%]">
          <button
            className="py-2 px-6 bg-red-500 rounded-md text-white"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            className="w-[28%] h-[85%] flex justify-center rounded-md text-white items-center gap-1 bg-blue-500"
            onClick={toggleDropdown}
          >
            Actions <FaCaretDown />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-12 left-40 w-40 bg-white shadow-md rounded-md z-10">
              <ul className="flex flex-col">
                {oneUser.status === "suspended" ? (
                  <li
                    className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                    onClick={openUnsuspendModal}
                  >
                    Unsuspend
                  </li>
                ) : (
                  <li
                    className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                    onClick={openSuspendModal}
                  >
                    Suspend
                  </li>
                )}
                <li
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                  onClick={toggleModal}
                >
                  Credit/Debit user
                </li>
                <li
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                  onClick={verifyUser}
                >
                  Verify user
                </li>
                <li
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                  onClick={openDeleteModal}
                >
                  Delete user
                </li>
                <li
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                  onClick={OpenClearModal}
                >
                  Clear acct
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-40 flex justify-center items-center max-md:h-[50rem]">
        <div className="w-11/12 h-5/6 border-2 flex justify-between items-center max-md:w-[80%] max-md:flex-col">
          <div className="w-1/5 h-full flex justify-around flex-col px-2 items-center max-md:w-[90%]">
            <div className="w-full h-2/5 flex justify-around items-center flex-col max-md:items-start">
              <p>Account Balance</p>
              <p>${oneUser.accountBalance}</p>
            </div>
            <div className="w-full h-2/5 flex justify-around items-center flex-col max-md:items-start">
              <p>User Acct Status</p>
              <p
                className={`py-2 px-3 rounded-md text-white ${getStatusColor()}`}
              >
                {oneUser.status}
              </p>
            </div>
          </div>
          <div className="w-1/5 h-full flex justify-around flex-col px-2 items-center max-md:w-[90%]">
            <div className="w-full h-2/5 flex justify-around items-center flex-col max-md:items-start">
              <p>Profit</p>
              <p>${oneUser.totalProfit}</p>
            </div>
            <div className="w-full h-2/5 flex justify-around items-center flex-col max-md:items-start">
              <p>Inv. Plans</p>
              <p>
                {oneUser.investmentPlan > 0 ? "Has Inv plans" : "No Inv plans"}
              </p>
            </div>
          </div>
          <div className="w-1/5 h-full flex justify-around flex-col px-2 items-center max-md:w-[90%]">
            <div className="w-full h-2/5 flex justify-around items-center flex-col max-md:items-start">
              <p>Referral Bonus</p>
              <p>${oneUser.referralBonus}</p>
            </div>
          </div>
          <div className="w-1/5 h-full flex justify-around flex-col px-2 items-center max-md:w-[90%]">
            <div className="w-full h-2/5 flex justify-around items-center flex-col max-md:items-start">
              <p>Bonus</p>
              <p>${oneUser.totalBonus}</p>
            </div>
            <div className="w-full h-2/5 flex justify-around items-center flex-col max-md:items-start">
              <p>Trade Mode</p>
              <p
                className={`py-0 px-3 rounded-md text-white ${
                  oneUser.login ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {oneUser.login ? "On" : "Off"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto bg-gray-50 mt-6 h-[30rem]">
        <div className="w-full h-16 flex justify-start px-7 items-center">
          <p className="text-2xl">User Information</p>
        </div>
        <div className="w-full p-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium text-lg">First Name</label>
              <input
                type="text"
                className="border p-2 rounded-md"
                value={oneUser.firstName}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-lg">Last Name</label>
              <input
                type="text"
                className="border p-2 rounded-md"
                value={oneUser.lastName}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-lg">Email Address</label>
              <input
                type="email"
                className="border p-2 rounded-md"
                value={oneUser.email}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-lg">Phone</label>
              <input
                type="text"
                className="border p-2 rounded-md"
                value={oneUser.phoneNumber}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-lg">Country</label>
              <input
                type="text"
                className="border p-2 rounded-md"
                value={oneUser.nationality}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-lg">Date Joined</label>
              <input
                type="text"
                className="border p-2 rounded-md"
                value={new Date(oneUser.createdAt).toLocaleDateString()}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <CreditDebitModal _id={_id} isOpen={isModalOpen} onClose={toggleModal} />
      <ConfirmSuspendModal
        isOpen={isSuspendModalOpen}
        onClose={closeSuspendModal}
        onConfirm={suspendUser}
      />
      <ConfirmUnsuspendModal
        isOpen={isUnsuspendModalOpen}
        onClose={closeUnsuspendModal}
        onConfirm={unsuspendUser}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={deleteUser}
      />
      <ConfirmClearAcct
        isOpen={isClearModalOpen}
        onClose={closeClearModal}
        onConfirm={clearAcct}
      />
    </div>
  );
};

export default UserDetails;
