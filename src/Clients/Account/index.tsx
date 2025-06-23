/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "../../config/axiosconfig";
import toast from "react-hot-toast";
import logo from "../../assets/profile icon.png";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>({});
  const [loading, setLoading] = useState(false);
  console.log(loading);

  const Token = useSelector((state: any) => state.user.Token);

  const getOneUser = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return toast.error("User ID not found");

    setLoading(true);
    try {
      const res = await axios.get(`/user/userprofile/${userId}`, {
        headers: { Authorization: `Bearer ${Token}` },
      });
      setProfile(res.data.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Failed to fetch user.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOneUser();
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto scrollbar-none">
      {/* Header */}
      <div className="w-full h-[10%] flex justify-between items-center px-3">
        <p className="font-semibold text-xl">Profile</p>
        <div
          className="w-[20%] flex text-green-700 justify-center items-center gap-2 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <MdArrowBack size={25} />
          <p className="text-lg font-semibold">Back</p>
        </div>
      </div>

      {/* Profile Image */}
      <div className="w-full flex flex-col items-center mt-6">
        <div className="w-[95%] max-w-sm rounded-md border-2 flex justify-center items-center overflow-hidden">
          <img
            src={logo}
            alt="Profile"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="w-[95%] mt-4 flex justify-center">
          <input
            type="file"
            className="hidden"
            id="imageUpload"
            accept="image/*"
          />
          <label
            htmlFor="imageUpload"
            className="w-full max-w-sm py-3 bg-green-600 text-white rounded-lg text-center cursor-pointer"
          >
            Upload Image
          </label>
        </div>
      </div>

      {/* Account Details */}
      <div className="w-full px-4 py-6 space-y-4">
        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-gray-800">Account Name:</label>
          <input
            type="text"
            placeholder="Enter name"
            value={`${profile.firstName || ""} ${
              profile.lastName || ""
            }`.trim()}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        {[
          {
            label: "Username",
            field: "userName",
            placeholder: "Enter username",
          },
          {
            label: "Phone Number",
            field: "phoneNumber",
            placeholder: "Enter phone number",
          },
          {
            label: "Email Address",
            field: "email",
            placeholder: "Enter email",
          },
          { label: "Date of Birth", field: "dob", placeholder: "Enter DOB" },
        ].map((input, index) => (
          <div key={index} className="w-full flex flex-col gap-2">
            <label className="font-medium text-gray-800">{input.label}:</label>
            <input
              type={input.field === "dob" ? "date" : "text"}
              min={input.field === "dob" ? "1990-01-01" : undefined}
              max={input.field === "dob" ? "2024-12-31" : undefined}
              placeholder={input.placeholder}
              value={profile[input.field] || ""}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
        ))}

        {/* Update Profile Button */}
        <div className="w-full flex justify-center items-center mt-6">
          <button
            disabled
            className="w-[50%] h-[50px] bg-gray-400 text-white font-medium rounded-lg cursor-not-allowed"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
