// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { ArrowUpRight } from "lucide-react";
// import TradinfviewWidgetone from "../components/tradinfviewWidgetone";
// import { useEffect, useState } from "react";
// import axios from "../config/axiosconfig";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import { BiLoaderCircle } from "react-icons/bi";

// const Overview = () => {
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState<any>([]); // Ideally type this with a proper User type

//   const statsCards = [
//     {
//       title: "Total Balance",
//       value: `$${user.accountBalance || "0.00"}`,
//       icon: <ArrowUpRight className="text-green-400 w-6 h-6" />,

//       color: "from-green-600/30 to-emerald-400/30",
//       status: "Active",
//     },
//     {
//       title: "Total Profits",
//       value: `$${user.totalProfit || "0.00"}`,
//       icon: <ArrowUpRight className="text-green-400 w-6 h-6" />,

//       color: "from-emerald-600/30 to-green-400/30",
//       status: "Running",
//     },
//     {
//       title: "Total Deposit",
//       value: `$${user.totalDeposit || "0.00"}`,
//       icon: <ArrowUpRight className="text-green-400 w-6 h-6" />,

//       color: "from-green-500/30 to-green-300/30",
//       status: "Completed",
//     },
//   ];

//   const token = useSelector((state: any) => state.user.Token);
//   console.log(token);

//   const getOneUser = async () => {
//     const userId = localStorage.getItem("userId");

//     try {
//       setLoading(true);
//       const res = await axios.get(`/user/userprofile/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setUser(res.data.data);
//     } catch (error) {
//       console.error("Error fetching user:", error);
//       toast.error("Failed to fetch user.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getOneUser();
//   }, []);

//   if (loading === true) {
//     return (
//       <div className="w-full h-screen flex justify-center items-center">
//         <div className="text-center">
//           <BiLoaderCircle className="animate-spin mx-auto mb-4" size={40} />
//           <p className="text-gray-600">Please wait</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full text-white relative">
//       {/* Fixed background layers */}
//       <div className="fixed inset-0 bg-gradient-to-br from-slate-900/95 via-green-900/30 to-slate-900/95"></div>
//       <div className="fixed inset-0 bg-gradient-to-b from-green-400/5 to-green-500/5"></div>

//       {/* Fixed animated particles */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-10 left-4 w-20 h-20 bg-green-400/10 rounded-full blur-xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-4 w-16 h-16 bg-green-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl animate-pulse delay-500"></div>
//         <div className="absolute top-20 right-1/4 w-12 h-12 bg-green-400/8 rounded-full blur-lg animate-pulse delay-300"></div>
//         <div className="absolute bottom-1/3 left-1/4 w-18 h-18 bg-emerald-400/6 rounded-full blur-xl animate-pulse delay-700"></div>
//       </div>

//       {/* Scrollable content wrapper */}
//       <div className="relative overflow-y-auto h-full">
//         <div className="p-6 pb-20">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-white mb-2">
//               Welcome back, {user.firstName} {user.lastName} !
//             </h1>
//             <p className="text-slate-300 text-lg">
//               Here's an overview of your investment portfolio
//             </p>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             {statsCards.map((card, index) => (
//               <div
//                 key={index}
//                 className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:bg-slate-900/60 transition-all duration-300 hover:scale-105 hover:border-green-400/40 hover:shadow-lg hover:shadow-green-500/10"
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <div
//                     className={`p-3 rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}
//                   >
//                     {card.icon}
//                   </div>

//                   {card.status && (
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         card.status === "Active"
//                           ? "bg-green-500/20 text-green-400 border border-green-500/30"
//                           : card.status === "Running"
//                           ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
//                           : "bg-slate-500/20 text-slate-300 border border-slate-500/30"
//                       }`}
//                     >
//                       {card.status}
//                     </span>
//                   )}
//                 </div>
//                 <h3 className="text-2xl font-bold text-white mb-1">
//                   {card.value}
//                 </h3>
//                 <p className="text-slate-300 text-sm">{card.title}</p>
//               </div>
//             ))}
//           </div>

//           {/* Trading Chart Section */}
//           <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-400/30 transition-all duration-300">
//             <div className="flex flex-col items-center justify-between gap-5">
//               <div className="w-full">
//                 <h2 className="text-xl font-bold text-white mb-1 flex items-center">
//                   <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
//                   Personal Trading Chart
//                 </h2>
//                 <p className="text-slate-300">
//                   Real-time market data and trends
//                 </p>
//               </div>
//               <div className="w-full h-[550px] flex items-center">
//                 <TradinfviewWidgetone />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom Scrollbar Styling */}
//       <style>{`
//         .overflow-y-auto::-webkit-scrollbar {
//           width: 6px;
//         }
//         .overflow-y-auto::-webkit-scrollbar-track {
//           background: rgba(15, 23, 42, 0.3);
//           border-radius: 3px;
//         }
//         .overflow-y-auto::-webkit-scrollbar-thumb {
//           background: rgba(34, 197, 94, 0.3);
//           border-radius: 3px;
//           border: 1px solid rgba(34, 197, 94, 0.1);
//         }
//         .overflow-y-auto::-webkit-scrollbar-thumb:hover {
//           background: rgba(34, 197, 94, 0.5);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Overview;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import face from "../assets/bg.jpg";
import { RiCoinsLine } from "react-icons/ri";
import Chartone from "../components/chartone";
import { BsCashCoin } from "react-icons/bs";
import { FaCoins } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { MdOutlineFileDownload, MdOutlineLogout } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { BsGear } from "react-icons/bs";
import { HiChartBar } from "react-icons/hi";
// import sol from "../assets/hero.jpg";
// import eth from "../assets/mainlogo.png";
// import btc from "../assets/three.jpg";
// import lock from "../assets/one.jpg";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../Global/UserSlice";
import { closeDropdown, toggleDropdown } from "../Global/Function";
import axios from "../config/axiosconfig";

const Overview = () => {
  const dropdown = useSelector((state: any) => state.dropdown.isOpen);
  const [profilePic, setProfilePic] = useState<string>(face);
  const [user, setuser] = useState<any>({});
  const Token = useSelector((state: any) => state.user.Token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userId = localStorage.getItem("userId");

  const getUser = async () => {
    try {
      const response = await axios.get(`/user/userprofile/${userId}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      setuser(response.data.data);
      setProfilePic(response.data.data.profilePic);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const formatNumber = (number: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  // // Display "$0.00" if the asset is empty
  // const getAssetAmount = (amount: number | null | undefined): string => {
  //   if (!amount || isNaN(amount)) {
  //     return "$0.00";
  //   }
  //   return formatNumber(amount);
  // };

  const AcctInfo = [
    {
      id: 1,
      title: "Total Withdraw",
      content: formatNumber(user.totalWithdrawn),
      icon: <BsCashCoin size={18} />,
    },
    {
      id: 2,
      title: "Total Deposit",
      content: formatNumber(user.totalDeposit),
      icon: <FaCoins size={18} />,
    },
  ];

  const RoutInfo = [
    {
      id: 1,
      title: "Withdraw",
      path: "/user/withdraw",
      icon: <LuSend size={20} />,
    },
    {
      id: 2,
      title: "Deposit",
      path: "/user/deposit",
      icon: <MdOutlineFileDownload size={20} />,
    },
    {
      id: 3,
      title: "Trade",
      path: "/user/invest",
      icon: <RiCoinsLine size={20} />,
    },
  ];

  // const Asset = [
  //   {
  //     image: btc,
  //     amount: getAssetAmount(user.btcBal),
  //     name: "Bitcoin",
  //     othername: "BTC",
  //     theOther: "btc",
  //   },
  //   {
  //     image: eth,
  //     amount: getAssetAmount(user.ethBal),
  //     name: "Ethereum",
  //     othername: "ETH",
  //     theOther: "eth",
  //   },
  //   {
  //     image: sol,
  //     amount: getAssetAmount(user.solBal),
  //     name: "Solana",
  //     othername: "SOL",
  //     theOther: "sol",
  //   },
  // ];

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const handleMenDropdown = () => {
    dispatch(toggleDropdown());
  };

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        dispatch(closeDropdown());
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdown, dispatch]);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/auth/login");
  };

  return (
    <div
      ref={dropdownRef}
      className="w-full h-full overflow-y-auto scrollbar-none bg-gray-50"
    >
      {/* Header with Portfolio Value */}
      <div className="w-full px-3 py-2 bg-white border-b border-gray-100 flex justify-between items-center shadow-sm">
        <div className="flex flex-col">
          <p className="text-xs text-gray-500">Total portfolio</p>
          <p className="font-bold text-lg text-gray-800">
            {formatNumber(user.accountBalance || 0)}
          </p>
        </div>

        <div
          className="flex items-center bg-white cursor-pointer"
          onClick={handleMenDropdown}
        >
          <div className="w-7 h-7 rounded-full overflow-hidden">
            <img
              src={profilePic || face}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <FaCaretDown size={10} className="text-gray-600 ml-1" />

          {/* Profile Dropdown - Mobile Optimized */}
          <AnimatePresence>
            {dropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-3 top-36 w-44 bg-white rounded-md shadow-lg z-50 overflow-hidden"
              >
                <div className="bg-green-600 py-2 px-3 text-center">
                  <div className="w-9 h-9 rounded-full mx-auto overflow-hidden mb-1 border-2 border-white">
                    <img
                      src={profilePic || face}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-medium text-xs text-white">
                    {user.firstName}
                  </p>
                  <p className="text-green-100 text-xs">{user.email}</p>
                </div>

                <div className="py-1">
                  <div
                    className="px-3 py-2 flex items-center gap-2 text-xs hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/user/profile")}
                  >
                    <FiUsers className="text-gray-700" size={14} />
                    <p className="font-medium">Profile</p>
                  </div>
                  <div
                    className="px-3 py-2 flex items-center gap-2 text-xs hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/user/setting")}
                  >
                    <BsGear className="text-gray-700" size={14} />
                    <p className="font-medium">Settings</p>
                  </div>
                  <div
                    className="px-3 py-2 flex items-center gap-2 text-xs hover:bg-gray-100 cursor-pointer text-red-500"
                    onClick={handleLogout}
                  >
                    <MdOutlineLogout size={14} />
                    <p className="font-medium">Logout</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Welcome Banner */}
      <div className="mx-3 mt-3 mb-2">
        <div className="overview bg-green-600 rounded-lg overflow-hidden">
          <div className="p-4 flex flex-col items-center text-center">
            <h2 className="text-white text-lg font-bold mb-1">
              Hello,{" "}
              <span>
                {user.firstName} {user.lastName}
              </span>
            </h2>
            <p className="text-green-100 text-xs mb-3">
              Welcome to Block Crypto Investment
              <br />
              Crypto Investment Made Easy.
            </p>
            <button
              onClick={() => navigate("/user/deposit")}
              className="flex items-center gap-1 bg-white text-green-700 hover:bg-green-50 transition-colors px-4 py-2 text-xs rounded-lg font-semibold shadow-md"
            >
              <HiChartBar size={16} />
              Start Trading
            </button>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="px-3 pt-2">
        <div className="bg-white h-[26rem] rounded-lg shadow-sm mb-3">
          <Chartone />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-3 pb-3">
        <div className="flex justify-between gap-2 mb-3">
          {AcctInfo.map((item) => (
            <div
              key={item.id}
              className="flex-1 bg-white rounded-lg shadow-sm p-2"
            >
              <div className="text-green-600 mb-1">{item.icon}</div>
              <p className="text-gray-500 text-xs">{item.title}</p>
              <p className="font-semibold text-xs">{item.content}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mb-3 gap-2">
          {RoutInfo.map((nav) => (
            <div
              key={nav.id}
              onClick={() => handleMenuClick(nav.path)}
              className="flex-1 bg-white rounded-lg shadow-sm py-2   flex flex-col items-center border border-black  cursor-pointer hover:bg-gray-50 transition-all duration-200"
            >
              <div className="text-green-600 mb-1 ">{nav.icon}</div>
              <p className="text-xs font-medium max-md:font-semibold max-md:text-sm">
                {nav.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Assets List */}
      {/* <div className="px-3 pb-4">
        <h3 className="font-semibold text-sm mb-2">My Assets</h3>

        <div className="space-y-2">
          {Asset.map((asset, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-5 flex items-center hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-8 h-8 relative mr-2">
                <img
                  src={asset.image}
                  alt={asset.name}
                  className="w-full h-full object-contain"
                />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                  <img
                    src={lock}
                    alt="Locked"
                    className="w-2 h-2 object-contain"
                  />
                </div>
              </div>

              <div className="flex-1">
                <p className="font-medium text-xs">{asset.name}</p>
                <p className="text-gray-500 text-xs">{asset.othername}</p>
              </div>

              <div className="text-right ">
                <p className="font-normal text-xs flex justify-start">
                  {asset.amount}
                </p>
                <p className="text-gray-500 text-xs">
                  Total {asset.theOther} Balance
                </p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Overview;
