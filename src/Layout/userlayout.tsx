import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { useState } from "react";
import UserHeader from "../components/userheader";

const Userlayout = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="h-screen w-screen max-w-[100vw] bg-green-200 max-h-[100vh] overflow-hidden flex">
      <Sidebar active={active} setActive={setActive} />
      <div className=" w-full h-full bg-green-100">
        <UserHeader active={active} setActive={setActive} />
        <main className="flex-1 overflow-y-auto"> 
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Userlayout;
