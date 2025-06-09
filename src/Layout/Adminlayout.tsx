import { Outlet } from "react-router-dom";

import { useState } from "react";

import AdminSidebar from "../Admin/adminsidebar";
import AdminHeader from "../Admin/adminheader";

const Adminlayout = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="h-screen w-screen max-w-[100vw] bg-green-200 max-h-[100vh] overflow-hidden flex">
      <AdminSidebar active={active} setActive={setActive} />
      <div className=" w-full h-full bg-green-100">
        <AdminHeader active={active} setActive={setActive} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Adminlayout;
