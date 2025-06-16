import TradingViewWidgettwo from "../components/tradingviewonee";
import { BsSend } from "react-icons/bs";
import { GoDownload } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import logo from "../assets/vertextone.png";
import { RiCoinsLine } from "react-icons/ri";

const Header = () => {
  const data = [
    {
      id: 1,
      name: "Withdraw",
      path: "/user/withdraw",
      icon: <BsSend size={27} className="text-white" />,
    },
    {
      id: 2,
      name: "Deposit",
      path: "/user/deposit",
      icon: <GoDownload size={27} className="text-white" />,
    },
    {
      id: 3,
      name: "Trade",
      path: "/user/invest",
      icon: <RiCoinsLine size={27} className="text-white" />,
    },
  ];

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };
  return (
    <div className="w-full h-full  flex justify-around flex-col items-center max-md:hidden">
      <div className="w-full h-[40%] flex justify-center items-center">
        <TradingViewWidgettwo />
      </div>
      <div className="w-full h-[60%] bg-green-700 flex justify-between   items-center">
        <div
          className="w-[50%]  h-[90%] flex justify-start items-center px-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt=""
            className=" w-[30%]  h-[100%] object-contain"
          />
        </div>
        <div className="w-[44%] h-full  flex justify-between items-center ">
          {data.map((item) => (
            <div
              key={item.id}
              className="w-[20%] h-full flex flex-col cursor-pointer justify-center items-center"
              onClick={() => handleNavigate(item.path)}
            >
              {item.icon}
              <p className=" font-bold text-white text-[12px]">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
