import { useState } from "react";
import { useUser } from "../context/UserContext";
import UserProfile from "../common/UserProfile";

const Header = () => {
  const { setSigninModal, user } = useUser();
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between px-5 py-3">
        <h1 className="text-2xl font-bold">Azar</h1>

        {user ? (
          <div
            className="w-10 h-10 cursor-pointer rounded-full overflow-hidden"
            onClick={() => setOpenProfile(true)}
          >
            <img
              src={user.image || "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"}
              alt="profile"
            />
          </div>
        ) : (
          <button
            onClick={() => setSigninModal(true)}
            className="text-white bg-black rounded-3xl font-semibold px-5 py-2"
          >
            Login
          </button>
        )}
      </div>

      {/* Profile Modal */}
      <UserProfile
        open={openProfile}
        onClose={() => setOpenProfile(false)}
      />
    </>
  );
};

export default Header;
