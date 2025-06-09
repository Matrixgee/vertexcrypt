import React, { useEffect, useState, useRef } from "react";
import { BsEye } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import toast from "react-hot-toast";
import { Modal } from "antd";

interface Transaction {
    _id: string;
    mode: string;
    firstName: string;
    amount: number;
    status: "approved" | "pending" | "rejected" | string;
    createdAt: string;
    image: string;
}

const mockTransactions: Transaction[] = [
    {
        _id: "tx123abc1",
        mode: "Bank Transfer",
        firstName: "Alice",
        amount: 150,
        status: "pending",
        createdAt: "2025-06-01T10:00:00Z",
        image: "https://via.placeholder.com/150",
    },
    {
        _id: "tx123abc2",
        mode: "Crypto",
        firstName: "Bob",
        amount: 200,
        status: "approved",
        createdAt: "2025-06-02T11:00:00Z",
        image: "https://via.placeholder.com/150",
    },
    {
        _id: "tx123abc3",
        mode: "PayPal",
        firstName: "Carol",
        amount: 300,
        status: "rejected",
        createdAt: "2025-06-03T12:00:00Z",
        image: "https://via.placeholder.com/150",
    },
];

const AllTransactions: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [menuIndex, setMenuIndex] = useState<number | null>(null);
    const [showMenu, setShowMenu] = useState<boolean[]>([]);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        setTransactions(mockTransactions);
        setShowMenu(Array(mockTransactions.length).fill(false));
    }, []);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRefs.current.every((ref) => ref && !ref.contains(event.target as Node))) {
            setMenuIndex(null);
            setShowMenu(Array(transactions.length).fill(false));
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [transactions, menuIndex]);

    const openProofOfPayment = (url: string) => {
        window.open(url, "_blank");
    };

    const handleShow = (index: number, item_id: string) => {
        const newShowMenu = [...showMenu];
        newShowMenu[index] = !newShowMenu[index];
        setShowMenu(newShowMenu);
        setSelectedItemId(item_id);
        setMenuIndex(index);
    };

    const handleConfirm = () => {
        setLoading(true);
        setTimeout(() => {
            setTransactions((prev) =>
                prev.map((tx) =>
                    tx._id === selectedItemId ? { ...tx, status: "approved" } : tx
                )
            );
            toast.success("Payment Confirmed");
            setLoading(false);
            setOpenConfirm(false);
        }, 1000);
    };

    const handleDecline = () => {
        setLoading(true);
        setTimeout(() => {
            setTransactions((prev) =>
                prev.map((tx) =>
                    tx._id === selectedItemId ? { ...tx, status: "rejected" } : tx
                )
            );
            toast.success("Payment Declined");
            setLoading(false);
        }, 1000);
    };

    return (
        <>
            <div className="w-full h-screen flex flex-col gap-2 overflow-y-auto">
                {transactions.length > 0 ? (
                    <div className="w-full h-max border border-gray-200 bg-white rounded overflow-x-auto">
                        <div className="w-max h-10 border-t border-t-gray-300 pl-6 flex gap-4">
                            {["Reference", "Mode", "User", "Amount", "Status", "Date", "Action", "Proof"].map((title) => (
                                <div key={title} className="w-[10.5rem] h-full flex items-center text-xs text-[rgb(128,148,174)] font-medium">
                                    {title}
                                </div>
                            ))}
                        </div>
                        <div className="w-max h-max">
                            {transactions.map((item, index) => (
                                <div key={item._id} className="w-full h-12 border-t border-t-gray-300 flex pl-6">
                                    <div className="w-[10.5rem] flex items-center text-sm text-[rgb(83,104,128)] font-semibold">
                                        {item._id.slice(-10).toUpperCase()}
                                    </div>
                                    <div className="w-[10.5rem] flex items-center text-sm text-[rgb(83,104,128)] font-semibold">
                                        {item.mode}
                                    </div>
                                    <div className="w-[10.5rem] flex items-center text-sm text-[rgb(83,104,128)] font-semibold">
                                        {item.firstName}
                                    </div>
                                    <div className="w-[10.5rem] flex items-center text-sm text-[rgb(83,104,128)] font-semibold">
                                        ${item.amount}
                                    </div>
                                    <div className="w-[10.5rem] flex items-center justify-center text-sm font-semibold">
                                        <p
                                            className={`px-3 py-1 rounded-full text-white ${item.status === "approved"
                                                    ? "bg-green-400"
                                                    : item.status === "pending"
                                                        ? "bg-yellow-400"
                                                        : "bg-red-400"
                                                }`}
                                        >
                                            {item.status}
                                        </p>
                                    </div>
                                    <div className="w-[10.5rem] flex items-center text-sm text-[rgb(83,104,128)] font-semibold">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="w-[5rem] flex items-center relative">
                                        <CiMenuKebab onClick={() => handleShow(index, item._id)} className="text-xl cursor-pointer" />
                                        {showMenu[index] && (
                                            <div
                                                ref={(el) => {
                                                    menuRefs.current[index] = el;
                                                }}
                                                className="absolute z-10 w-28 top-full left-0 mt-1 bg-white shadow-lg rounded border border-gray-100 p-2"
                                            >
                                                <p
                                                    onClick={() => setOpenConfirm(true)}
                                                    className="text-xs font-bold text-[rgb(83,104,128)] hover:text-blue-500 cursor-pointer"
                                                >
                                                    Confirm
                                                </p>
                                                <p
                                                    onClick={handleDecline}
                                                    className="text-xs font-bold text-[rgb(83,104,128)] hover:text-blue-500 cursor-pointer"
                                                >
                                                    Decline
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-[5rem] flex items-center">
                                        <BsEye onClick={() => openProofOfPayment(item.image)} className="text-xl cursor-pointer" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-screen flex justify-center items-center">
                        <p className="text-lg font-semibold">No Transactions Available</p>
                    </div>
                )}
            </div>

            <Modal
                title="Confirm Payment"
                open={openConfirm}
                onOk={handleConfirm}
                confirmLoading={loading}
                onCancel={() => setOpenConfirm(false)}
            >
                <p>Are you sure you want to confirm this payment?</p>
            </Modal>
        </>
    );
};

export default AllTransactions;
