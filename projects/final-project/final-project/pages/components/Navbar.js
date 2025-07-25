import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("elkexpedition_user");
      if (storedUser) {
        try {
          const userObj = JSON.parse(storedUser);
          setLoggedIn(true);
          setUsername(userObj.username || "");
        } catch {
          setLoggedIn(false);
          setUsername("");
        }
      } else {
        setLoggedIn(false);
        setUsername("");
      }
    }
  }, [typeof window !== "undefined" && window.location.pathname]);

  const LogInClickHandler = (e) => {
    e.preventDefault();
    router.push("/components/LogIn");
  };

  const handleLogout = () => {
    localStorage.removeItem("elkexpedition_user");
    setLoggedIn(false);
    setUsername("");
    window.location.href = "/"; // Full reload to home, avoids reload loop
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    router.push("/components/Profile");
  };

  return (
    <>
      <div className="flex col-2 justify-between">
        <div className="flex justify-start space-x-6 px-4">
          {/* Profile */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="navitem size-6 text-gray-100 cursor-pointer"
            onClick={handleProfileClick}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>

          {/* Home */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="navitem size-6 text-gray-100 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>

          {/* Search */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="navitem size-6 text-gray-100 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        {/* Log-In & Sign-up or Logout Button */}
        <div className="flex space-x-4">
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="hunter-button bg-red-600 p-2 text-[10px] hunterra rounded-xl cursor-pointer"
            >
              Log Out
            </button>
          ) : (
            <button
              onClick={LogInClickHandler}
              className="hunter-button bg-gray-600 p-2 text-[10px] hunterra rounded-xl cursor-pointer"
            >
              Login / SignUp
            </button>
          )}
        </div>
      </div>
    </>
  );
}
