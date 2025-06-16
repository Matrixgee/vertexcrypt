import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Marketview from "../components/marketview";

const Market = () => {
  const navigate = useNavigate();

  const handleback = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-full  scrollbar-thin overflow-y-scroll">
      {/* Header */}
      <div className="w-full h-[10%]  flex justify-between items-center px-5">
        <p className="font-semibold text-xl">Market</p>
        <div
          className="w-[20%] h-full flex text-green-700 justify-center items-center gap-1 cursor-pointer"
          onClick={handleback}
        >
          <MdArrowBack size={22} />
          <p className="text-[16px] font-semibold">Back</p>
        </div>
      </div>
      <div className="w-full h-[100%] flex justify-center items-center">
        <div className="w-[96%] h-[100%]  flex justify-center items-center">
          <Marketview />
        </div>
      </div>
    </div>
  );
};

export default Market;
