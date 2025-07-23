import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const SIDEBAR_OPTIONS = [
  { key: "profile", label: "Profile" },
  { key: "edit", label: "Edit Profile" },
  { key: "password", label: "Change Password" },
  { key: "theme", label: "Theme" },
  { key: "notifications", label: "Notifications" },
  { key: "privacy", label: "Privacy" },
  { key: "activity", label: "Activity" },
  { key: "help", label: "Help" },
  { key: "logout", label: "Log Out" },
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  // Edit form state
  const [editData, setEditData] = useState({ username: "", email: "", phone: "", province: "" });
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [editSuccess, setEditSuccess] = useState("");
  const [editError, setEditError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);
  const [pwSuccess, setPwSuccess] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("elkexpedition_user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setEditData({
          username: parsed.username || "",
          email: parsed.email || "",
          phone: parsed.phone || "",
          province: parsed.province || "",
        });
        setProfilePicPreview(parsed.profilePic || null);
      } catch {
        setUser(null);
      }
    }
  }, []);

  // Handle mock profile picture upload
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setProfilePicPreview(null);
    }
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Mock save handler
  const handleEditSave = async (e) => {
    e.preventDefault();
    setEditSuccess("");
    setEditError("");
    setIsSaving(true);
    setShowCheckmark(false);
    try {
      const response = await fetch("http://localhost:8000/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          ...editData,
          profilePic: profilePicPreview || "",
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem("elkexpedition_user", JSON.stringify(data.user));
        setProfilePicPreview(data.user.profilePic || null);
        // Simulate progress and checkmark
        setTimeout(() => {
          setIsSaving(false);
          setShowCheckmark(true);
          setEditSuccess("Profile updated successfully!");
          setTimeout(() => {
            setShowCheckmark(false);
            setEditSuccess("");
            setActiveTab("profile");
            router.push("/");
          }, 1500);
        }, 3000);
      } else {
        setIsSaving(false);
        setEditError(data.message || "Update failed");
      }
    } catch (err) {
      setIsSaving(false);
      setEditError("Network error. Please try again later.");
    }
  };

  // Change password mock handler
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwSuccess("");
    setPwError("");
    setPwLoading(true);
    const form = e.target;
    const currentPassword = form.currentPassword.value;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;
    if (newPassword !== confirmPassword) {
      setPwError("New passwords do not match.");
      setPwLoading(false);
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          currentPassword,
          newPassword,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setPwSuccess("Password changed successfully!");
        form.reset();
      } else {
        setPwError(data.message || "Password change failed");
      }
    } catch (err) {
      setPwError("Network error. Please try again later.");
    } finally {
      setPwLoading(false);
    }
  };

  // Log out handler
  const handleLogout = () => {
    localStorage.removeItem("elkexpedition_user");
    router.push("/");
    window.location.reload();
  };

  // Theme toggle
  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Notifications toggle
  const handleNotificationsToggle = () => {
    setNotifications((n) => !n);
  };

  // Sidebar content rendering
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="w-full max-w-xl bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center">
            <div className="mb-6 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden mb-3 border-2 border-amber-400">
                {user?.profilePic ? (
                  <img src={user.profilePic} alt="Profile" className="object-cover w-full h-full" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-semibold text-amber-400 hunterra mb-1 tracking-tight">{user?.username}</h3>
              <p className="text-gray-400 text-sm">{user?.email}</p>
              {user?.createdAt && (
                <p className="text-gray-500 text-xs mt-1">Account created: {new Date(user.createdAt).toLocaleDateString()}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-2 mt-2">
              <div className="flex items-center justify-between py-2 border-b border-gray-800 last:border-b-0">
                <span className="font-medium text-orange-400 text-sm">Phone</span>
                <span className="text-cream text-sm">{user?.phone || <span className="text-gray-500">(not set)</span>}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-800 last:border-b-0">
                <span className="font-medium text-orange-400 text-sm">Province</span>
                <span className="text-cream text-sm">{user?.province || <span className="text-gray-500">(not set)</span>}</span>
              </div>
            </div>
          </div>
        );
      case "edit":
        return (
          <form onSubmit={handleEditSave} className="w-full max-w-xl bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center">
            {isSaving && (
              <div className="w-full flex flex-col items-center mb-4">
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden mb-2">
                  <div className="bg-amber-400 h-3 animate-pulse" style={{ width: '100%', animation: 'progressBar 3s linear' }} />
                </div>
                <span className="text-cream text-sm">Saving changes...</span>
                <style>{`@keyframes progressBar { from { width: 0; } to { width: 100%; } }`}</style>
              </div>
            )}
            {showCheckmark && (
              <div className="flex flex-col items-center mb-4">
                <div className="bg-green-600 rounded-full p-4 flex items-center justify-center animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-green-400 font-bold mt-2 text-sm">Profile updated!</span>
              </div>
            )}
            {editSuccess && !isSaving && !showCheckmark && (
              <div className="bg-green-700 text-white text-center rounded-md py-2 px-4 mb-4 w-full text-sm">
                {editSuccess}
              </div>
            )}
            {editError && (
              <div className="bg-red-700 text-white text-center rounded-md py-2 px-4 mb-4 w-full text-sm">
                {editError}
              </div>
            )}
            <div className="mb-6 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden mb-3 border-2 border-amber-400 relative">
                {profilePicPreview ? (
                  <img src={profilePicPreview} alt="Profile" className="object-cover w-full h-full" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                )}
                <label className="absolute bottom-0 right-0 bg-amber-400 text-white rounded-full p-2 cursor-pointer shadow-lg hover:bg-amber-500 transition" title="Upload profile picture">
                  <input type="file" accept="image/*" className="hidden" onChange={handleProfilePicChange} />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0 0V8m0 4h4m-4 0H8m12 4.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2.5M16 3.5V5m0 0a2 2 0 0 1 2 2v2.5M8 3.5V5m0 0a2 2 0 0 0-2 2v2.5" />
                  </svg>
                </label>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 mt-2">
              <div>
                <label className="block text-cream font-medium mb-1 text-sm">Username</label>
                <input
                  type="text"
                  name="username"
                  value={editData.username}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded-lg bg-gray-800 text-cream border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-cream font-medium mb-1 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded-lg bg-gray-800 text-cream border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-cream font-medium mb-1 text-sm">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editData.phone}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded-lg bg-gray-800 text-cream border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                />
              </div>
              <div>
                <label className="block text-cream font-medium mb-1 text-sm">Province</label>
                <input
                  type="text"
                  name="province"
                  value={editData.province}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded-lg bg-gray-800 text-cream border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-8 bg-amber-400 hover:bg-amber-500 text-white py-2 px-10 rounded-md font-semibold text-base"
            >
              Save Changes
            </button>
          </form>
        );
      case "password":
        return (
          <form onSubmit={handlePasswordChange} className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-amber-400 mb-4 tracking-tight">Change Password</h3>
            {pwSuccess && <div className="bg-green-700 text-white text-center rounded-md py-2 px-4 mb-4 w-full text-sm">{pwSuccess}</div>}
            {pwError && <div className="bg-red-700 text-white text-center rounded-md py-2 px-4 mb-4 w-full text-sm">{pwError}</div>}
            <input name="currentPassword" type="password" placeholder="Current Password" className="w-full p-2 mb-3 rounded-lg bg-gray-800 text-cream border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm" required />
            <input name="newPassword" type="password" placeholder="New Password" className="w-full p-2 mb-3 rounded-lg bg-gray-800 text-cream border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm" required />
            <input name="confirmPassword" type="password" placeholder="Confirm New Password" className="w-full p-2 mb-4 rounded-lg bg-gray-800 text-cream border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm" required />
            <button type="submit" className="bg-amber-400 hover:bg-amber-500 text-white py-2 px-8 rounded-md font-semibold text-base" disabled={pwLoading}>{pwLoading ? "Changing..." : "Change Password"}</button>
          </form>
        );
      case "theme":
        return (
          <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-amber-400 mb-4 tracking-tight">Theme</h3>
            <div className="flex items-center gap-4">
              <span className="text-cream text-sm">Dark</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={theme === "light"} onChange={handleThemeToggle} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:bg-amber-400 transition"></div>
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
              </label>
              <span className="text-cream text-sm">Light</span>
            </div>
            <p className="text-gray-400 text-xs mt-4">(Theme toggle is a demo only)</p>
          </div>
        );
      case "notifications":
        return (
          <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-amber-400 mb-4 tracking-tight">Notifications</h3>
            <div className="flex items-center gap-4">
              <span className="text-cream text-sm">Enable Notifications</span>
              <input type="checkbox" checked={notifications} onChange={handleNotificationsToggle} className="accent-amber-400 w-5 h-5" />
            </div>
            <p className="text-gray-400 text-xs mt-4">(Notifications toggle is a demo only)</p>
          </div>
        );
      case "privacy":
        return (
          <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-amber-400 mb-4 tracking-tight">Privacy</h3>
            <p className="text-cream text-sm mb-2">Manage your privacy settings:</p>
            <ul className="text-gray-400 text-xs list-disc pl-5 mb-4">
              <li>Download your data (coming soon)</li>
              <li>Delete your account (coming soon)</li>
              <li>Profile visibility (coming soon)</li>
            </ul>
            <p className="text-gray-500 text-xs">(Privacy controls are demo only)</p>
          </div>
        );
      case "activity":
        return (
          <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-amber-400 mb-4 tracking-tight">Activity</h3>
            <ul className="text-cream text-sm mb-2">
              <li>Recent logins (mock)</li>
              <li>Recent bookings (mock)</li>
              <li>Recent reviews (mock)</li>
            </ul>
            <p className="text-gray-400 text-xs">(Activity log is a demo only)</p>
          </div>
        );
      case "help":
        return (
          <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-amber-400 mb-4 tracking-tight">Help & Support</h3>
            <p className="text-cream text-sm mb-2">Need help? Check our FAQ or contact support.</p>
            <ul className="text-gray-400 text-xs list-disc pl-5 mb-4">
              <li>FAQ (coming soon)</li>
              <li>Contact support (coming soon)</li>
            </ul>
            <p className="text-gray-500 text-xs">(Help & support are demo only)</p>
          </div>
        );
      case "logout":
        handleLogout();
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-950">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r-2 border-gray-800 flex flex-col items-center py-12 px-2">
        <Image src="/elkexpeditionlogo.png" alt="Elk Expedition Logo" width={50} height={50} className="mb-8" />
        <h2 className="text-2xl font-bold mb-8 text-cream hunterra text-gray-200 tracking-tight">Account</h2>
        <nav className="flex flex-col gap-2 w-full">
          {SIDEBAR_OPTIONS.map(opt => (
            <button
              key={opt.key}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium text-base transition-all ${activeTab === opt.key ? "bg-amber-400 text-gray-900" : "bg-gray-800 text-cream hover:bg-gray-700"}`}
              onClick={() => setActiveTab(opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </nav>
        <button
          className="mt-12 bg-amber-400 hover:bg-amber-500 text-white py-2 px-6 rounded-md font-semibold w-full text-base"
          onClick={() => router.push("/")}
        >
          Back to Home
        </button>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        {renderContent()}
      </div>
    </div>
  );
} 