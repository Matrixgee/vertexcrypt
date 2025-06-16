import { IoPieChartOutline, IoWalletOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { GiChart } from "react-icons/gi";

const Desktop = () => {
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

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="w-full h-full shadow-sm   flex justify-around items-center  ">
      {navButtons.map((nav) => (
        <div
          className={`w-[22%] h-full cursor-pointer transition-all duration-500 flex justify-around items-center flex-col ${
            location.pathname === nav.path
              ? "text-green-600 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => handleMenuClick(nav.path)}
        >
          <div className="w-full h-[60%]  flex justify-center items-center">
            {nav.icon}
          </div>
          <div className="w-full h-[40%] flex text-[16px] justify-center items-center">
            <p className=" text-sm">{nav.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Desktop;
