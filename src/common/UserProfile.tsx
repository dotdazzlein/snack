import { RxCross2 } from "react-icons/rx";
import { useUser } from "../context/UserContext";

type Props = {
  open: boolean;
  onClose: () => void;
};

const UserProfile = ({ open, onClose }: Props) => {
  if (!open) return null;
  const {user} = useUser()

  const {setUser} = useUser()
  const handleLogout =  () => {
        try {
            localStorage.removeItem("user")
            setUser(null)
            onClose()
        } catch (error) {
            console.log(error);
            
        }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end" onClick={() => onClose()}>
      {/* Modal */}
      <div className="mt-16 mr-5 w-50 rounded-2xl bg-[#ECECEC]  shadow-xl animate-slideIn" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-400/20 p-3 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <img
                src={user.image || "https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"}
                alt="profile"
              />
            </div>
            <div>
              <p className="font-semibold text-sm">random</p>
              <p className="text-xs text-gray-500">IN · Male</p>
            </div>
          </div>

          <button onClick={onClose} className="cursor-pointer">
            <RxCross2 size={18} />
          </button>
        </div>

        {/* Menu */}
        <div className="p-2">
          <MenuItem label="Edit Profile" />
          <MenuItem label="More" />
          <MenuItem label="Contact us" />
          <MenuItem label="Log out" danger handleClick={handleLogout}/>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

/* ---------- Menu Item ---------- */
const MenuItem = ({
  label,
  danger,
  handleClick
}: {
  label: string;
  danger?: boolean;
  handleClick : () => void
}) => {
  return (
    <button
    onClick={handleClick}
      className={`w-full text-left px-4 py-1.5 rounded-lg text-sm font-medium transition
      ${danger ? "text-red-500 hover:bg-red-50" : "hover:bg-white"} cursor-pointer`}
    >
      {label}
    </button>
  );
};
