import { IoPieChartOutline, IoWalletOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { GiChart } from "react-icons/gi";
import { useNavigate, useLocation } from "react-router-dom";

const PhoneNav = () => {
  const navButtons = [
    {
      title: "Home",
      path: "/user/overview",
      icon: <GoHome size={25} />,
    },
    {
      title: "My trade",
      path: "/user/my-plans",
      icon: <IoPieChartOutline size={25} />,
    },
    {
      title: "Transactions",
      path: "/user/history",
      icon: <IoWalletOutline size={25} />,
    },
    {
      title: "Markets",
      path: "/user/market",
      icon: <GiChart size={25} />,
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="w-full h-full shadow-sm bg-[#fcfcfa] flex justify-around items-center">
      {navButtons.map((nav) => (
        <div
          key={nav.path}
          className={`w-[22%] h-full cursor-pointer transition-all duration-500 flex justify-around items-center flex-col ${
            location.pathname === nav.path
              ? "text-green-600 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => handleMenuClick(nav.path)}
        >
          <div className="w-full h-[60%] flex justify-center items-center">
            {nav.icon}
          </div>
          <div className="w-full h-[40%] text-[16px] flex justify-center items-center">
            <p className="text-[12px]">{nav.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhoneNav;
