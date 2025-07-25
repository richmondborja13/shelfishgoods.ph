import React, { useState, useRef } from 'react';
import { Switch } from '@headlessui/react';
import { UserIcon, Cog6ToothIcon, ChatBubbleLeftRightIcon, MicrophoneIcon, EyeDropperIcon, BellIcon } from '@heroicons/react/24/outline';

/**
 * Settings Component - User Account Management Interface
 * 
 * FRONT-END GUIDELINES:
 * ====================
 * 
 * 1. COMPONENT STRUCTURE:
 *    - Uses functional component with React hooks
 *    - Implements responsive design with Tailwind CSS
 *    - Follows atomic design principles with reusable UI elements
 * 
 * 2. STATE MANAGEMENT:
 *    - Uses useState for local component state
 *    - useRef for file input handling
 *    - All state variables are properly typed and documented
 * 
 * 3. UI/UX PATTERNS:
 *    - Modal dialogs for destructive actions (delete/disable account)
 *    - Inline form expansion for password changes
 *    - Toggle switches for boolean settings
 *    - Scrollable sections with hidden scrollbars
 *    - Read-only fields with visual indicators
 * 
 * 4. ACCESSIBILITY:
 *    - Proper ARIA labels on interactive elements
 *    - Keyboard navigation support
 *    - Screen reader friendly structure
 *    - Focus management for modals
 * 
 * 5. RESPONSIVE DESIGN:
 *    - Mobile-first approach with md: breakpoints
 *    - Flexible grid layouts
 *    - Adaptive sidebar behavior
 * 
 * 6. VALIDATION:
 *    - Client-side email validation with regex
 *    - Password confirmation matching
 *    - Required field validation
 *    - Real-time feedback for user inputs
 * 
 * BACK-END INTEGRATION POINTS:
 * ===========================
 * 
 * 1. API ENDPOINTS NEEDED:
 *    - GET /api/user/profile - Fetch user profile data
 *    - PUT /api/user/profile - Update profile information
 *    - POST /api/user/avatar - Upload profile avatar
 *    - PUT /api/user/password - Change password
 *    - POST /api/user/emails - Add new email address
 *    - DELETE /api/user/emails/:id - Remove email address
 *    - PUT /api/user/settings - Update account settings
 *    - POST /api/user/disable - Disable account with reason
 *    - DELETE /api/user/account - Delete account permanently
 * 
 * 2. DATA STRUCTURES:
 *    - User Profile: { id, name, email, phone, address, tin, accountType, subscription, avatar }
 *    - Email List: [{ id, email, added, isPrimary }]
 *    - Account Settings: { twoFactorAuth, autoAcceptOrders, lowInventoryAlerts }
 *    - Notification Settings: { email, sms, push, app, promotional, weeklySummary }
 * 
 * 3. AUTHENTICATION:
 *    - JWT token validation for all requests
 *    - Password confirmation for sensitive actions
 *    - Session management for user state
 * 
 * 4. FILE UPLOAD:
 *    - Avatar upload with size/format validation
 *    - Image compression and optimization
 *    - CDN integration for image storage
 * 
 * 5. ERROR HANDLING:
 *    - Network error handling
 *    - Validation error display
 *    - Loading states for async operations
 *    - Success/error notifications
 * 
 * 6. SECURITY CONSIDERATIONS:
 *    - CSRF protection
 *    - Input sanitization
 *    - Rate limiting for sensitive operations
 *    - Audit logging for account changes
 * 
 * TODO FOR BACK-END DEVELOPMENT:
 * =============================
 * 
 * 1. Implement all API endpoints listed above
 * 2. Add proper authentication middleware
 * 3. Set up file upload handling for avatars
 * 4. Implement email validation and verification
 * 5. Add audit logging for account modifications
 * 6. Set up notification system integration
 * 7. Implement rate limiting for security
 * 8. Add data validation and sanitization
 * 9. Set up error handling and logging
 * 10. Implement caching for user data
 */

const sidebarItems = [
  { label: 'Profile', icon: UserIcon },
  { label: 'Account', icon: Cog6ToothIcon },
  { label: 'Notification', icon: BellIcon },
];

export default function Settings() {
  // All hooks must be called before any early return
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('Profile');
  const [avatar, setAvatar] = useState<string | null>(null); // for uploaded avatar (preview)
  const [savedAvatar, setSavedAvatar] = useState<string | null>(null); // for sidebar and saved state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [emailList, setEmailList] = useState([
    { email: "johndoe@gmail.com", added: "1 month ago" }
  ]);
  const [addingEmail, setAddingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  // Add new state for the toggles
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [disableReason, setDisableReason] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  // Change password states
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [autoAcceptOrders, setAutoAcceptOrders] = useState(false);
  const [lowInventoryAlerts, setLowInventoryAlerts] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [promotionalNotifications, setPromotionalNotifications] = useState(false);
  const [weeklySummary, setWeeklySummary] = useState(false);

  /**
   * EFFECTS AND EVENT HANDLERS DOCUMENTATION:
   * =========================================
   */

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  /**
   * AVATAR MANAGEMENT FUNCTIONS:
   * ============================
   * 
   * handleAvatarClick: Triggers file input click for avatar upload
   * handleAvatarChange: Processes selected image file and creates preview
   * handleProfileSave: Saves avatar and profile changes to backend
   * 
   * BACK-END INTEGRATION:
   * - POST /api/user/avatar - Upload avatar image
   * - PUT /api/user/profile - Update profile with avatar reference
   */

  // Handle avatar upload
  const handleAvatarClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        const result = ev.target?.result;
        if (typeof result === 'string') {
          setAvatar(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Save button for profile
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedAvatar(avatar);
    // TODO: Add API call to save profile changes
    // await updateUserProfile({ avatar: avatarUrl, ...otherFields });
  };

  /**
   * EMAIL MANAGEMENT FUNCTIONS:
   * ===========================
   * 
   * handleAddEmailRow: Shows email input form for adding new email
   * handleSaveNewEmail: Validates and saves new email address
   * handleNewEmailKeyDown: Handles Enter key press for email submission
   * 
   * VALIDATION:
   * - Email format validation using regex pattern
   * - Real-time error feedback
   * - Duplicate email prevention (TODO: implement)
   * 
   * BACK-END INTEGRATION:
   * - POST /api/user/emails - Add new email address
   * - GET /api/user/emails - Fetch user's email list
   * - DELETE /api/user/emails/:id - Remove email address
   */

  const handleAddEmailRow = () => {
    setAddingEmail(true);
    setNewEmail("");
    setEmailError("");
  };

  const handleSaveNewEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (newEmail.trim() && emailRegex.test(newEmail.trim())) {
      setEmailList([...emailList, { email: newEmail.trim(), added: "just now" }]);
      setAddingEmail(false);
      setNewEmail("");
      setEmailError("");
      // TODO: Add API call to save new email
      // await addUserEmail({ email: newEmail.trim() });
    } else {
      setEmailError("Please enter a valid email address");
    }
  };

  const handleNewEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveNewEmail();
    }
  };

  /**
   * ACCOUNT MANAGEMENT FUNCTIONS:
   * =============================
   * 
   * handleDeleteAccount: Permanently deletes user account with password confirmation
   * handleDisableAccount: Temporarily disables account with reason
   * handleChangePassword: Changes user password with validation
   * 
   * SECURITY FEATURES:
   * - Password confirmation for destructive actions
   * - Password strength validation (TODO: implement)
   * - Audit logging for account changes
   * 
   * BACK-END INTEGRATION:
   * - DELETE /api/user/account - Delete account permanently
   * - POST /api/user/disable - Disable account with reason
   * - PUT /api/user/password - Change password
   * - POST /api/audit/log - Log account changes
   */

  const handleDeleteAccount = () => {
    // Add your delete account logic here with password validation
    if (deletePassword.trim()) {
      console.log("Account deleted with password confirmation");
      setShowDeleteModal(false);
      setDeletePassword("");
      // TODO: Add API call to delete account
      // await deleteUserAccount({ password: deletePassword });
    }
  };

  const handleDisableAccount = () => {
    // Add your disable account logic here
    console.log("Account disabled with reason:", disableReason);
    setShowDisableModal(false);
    setDisableReason("");
    // TODO: Add API call to disable account
    // await disableUserAccount({ reason: disableReason });
  };

  const handleChangePassword = () => {
    // Add your change password logic here
    if (newPassword === confirmPassword && newPassword.trim() && currentPassword.trim()) {
      console.log("Password changed successfully");
      setShowChangePassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      // TODO: Add API call to change password
      // await changeUserPassword({ currentPassword, newPassword });
    }
  };

  return (
    <div className="flex h-[90vh] w-full bg-gray-50 justify-center">
      {/* Settings Sidebar + Main Content */}
      <div className="relative flex w-full max-w-[120rem] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Loading overlay covers main content */}
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50" style={{ left: '13rem' }}>
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-lg font-semibold text-blue-700">Loading Profile...</span>
            </div>
          </div>
        )}
        {/* Settings Sidebar */}
        <aside className="w-52 bg-gray-50 border-r border-gray-200 flex flex-col">
          {/* User avatar and name */}
          <div className="flex flex-col items-center py-6 border-b border-gray-200 mb-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-400 to-blue-700 flex items-center justify-center text-white text-2xl font-bold mb-2 shadow overflow-hidden">
              {savedAvatar ? (
                <img src={savedAvatar} alt="Sidebar Avatar" className="w-full h-full object-cover rounded-full" />
              ) : (
                <span>J</span>
              )}
            </div>
            <div className="font-semibold text-black text-lg">John Doe</div>
            <div className="text-xs text-gray-500">Vendor</div>
          </div>
          <nav className="flex-1 mt-2">
            <ul className="space-y-1">
              {sidebarItems.map((item) => (
                <li key={item.label}>
                  <button
                    className={`w-full flex items-center gap-3 text-left px-6 py-2 rounded-lg transition-colors font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 focus:ring-offset-gray-50 ${
                      selected === item.label ? 'bg-blue-100 text-blue-700 shadow' : ''
                    }`}
                    onClick={() => setSelected(item.label)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="relative flex-1 flex flex-col p-10">
          {/* Profile Section */}
          {selected === 'Profile' && (
            <div className="w-full flex flex-col">
              {/* Avatar moved to the very top */}
              <div className="flex justify-center mb-6">
                <div className="relative w-20 h-20">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-400 to-blue-700 flex items-center justify-center text-white text-2xl font-bold shadow overflow-hidden">
                    {avatar ? (
                      <img src={avatar} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <span>J</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    className="absolute bottom-1 right-1 bg-gray-200 hover:bg-gray-300 rounded-full p-1 shadow border border-white flex items-center justify-center"
                    style={{ width: '2rem', height: '2rem' }}
                    aria-label="Change avatar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75V8.25A2.25 2.25 0 014.5 6h2.086a1.5 1.5 0 001.06-.44l.914-.92A1.5 1.5 0 019.62 4.5h4.76a1.5 1.5 0 011.06.44l.914.92a1.5 1.5 0 001.06.44H19.5a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 15.75z" />
                      <circle cx="12" cy="12" r="3.25" />
                    </svg>
                  </button>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>
              
              <div className="w-full max-w-[120rem] flex flex-col">
                <div className="w-full overflow-y-auto scrollbar-none" style={{ maxHeight: '60vh', scrollbarWidth: 'none' }}>
                  <style>{`div.scrollbar-none::-webkit-scrollbar { display: none; }`}</style>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:ml-auto md:max-w-4xl" onSubmit={handleProfileSave}>
                    {/* Company Name / User Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name / User Name</label>
                      <input
                        type="text"
                        className="w-4/5 border border-gray-200 px-4 py-2 text-gray-600 bg-gray-50 text-base rounded-none shadow-none transition-none cursor-not-allowed"
                        value="John Doe Logistics"
                        readOnly
                      />
                    </div>
                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        className="w-4/5 border border-gray-200 px-4 py-2 text-gray-600 bg-gray-50 text-base rounded-none shadow-none transition-none cursor-not-allowed"
                        value="+63 912 345 6789"
                        readOnly
                      />
                    </div>
                    {/* Business Address / Branches */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Business Address / Branches</label>
                      <input
                        type="text"
                        className="w-4/5 border border-gray-200 px-4 py-2 text-gray-600 bg-gray-50 text-base rounded-none shadow-none transition-none cursor-not-allowed"
                        value="123 Main St, Makati City"
                        readOnly
                      />
                    </div>
                    {/* TIN / Business Registration Info */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">TIN / Business Registration Info</label>
                      <input
                        type="text"
                        className="w-4/5 border border-gray-200 px-4 py-2 text-gray-600 bg-gray-50 text-base rounded-none shadow-none transition-none cursor-not-allowed"
                        value="123-456-789-000"
                        readOnly
                      />
                    </div>
                    {/* Account Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                      <select
                        className="w-4/5 border border-gray-200 px-4 py-2 pr-10 text-gray-600 bg-gray-50 text-base rounded-none shadow-none transition-none cursor-not-allowed appearance-none bg-[url('data:image/svg+xml;utf8,<svg fill=none stroke=%236b7280 stroke-width=2 viewBox=0 0 24 24 xmlns=http://www.w3.org/2000/svg><path stroke-linecap=round stroke-linejoin=round d=M19 9l-7 7-7-7/></svg>')] bg-no-repeat bg-[right_0.75rem_center]"
                        value="Freight Forwarder"
                        disabled
                      >
                        <option>Freight Forwarder</option>
                        <option>Courier</option>
                        <option>Retailer</option>
                      </select>
                    </div>
                    {/* Subscription Plan / Tier */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subscription Plan / Tier</label>
                      <input
                        type="text"
                        className="w-4/5 border border-gray-200 px-4 py-2 text-gray-600 bg-gray-50 text-base rounded-none shadow-none transition-none cursor-not-allowed"
                        value="Pro"
                        readOnly
                      />
                    </div>
              {/* Change Password */}
                    <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <button
                  type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition text-base"
                        onClick={() => setShowChangePassword(!showChangePassword)}
                >
                  Change password
                </button>
                
                {showChangePassword && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input
                        type="password"
                        className="w-full border border-gray-200 px-4 py-2 text-black bg-white text-base placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-0 rounded-none shadow-none transition-none"
                        placeholder="Enter your current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input
                        type="password"
                        className="w-full border border-gray-200 px-4 py-2 text-black bg-white text-base placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-0 rounded-none shadow-none transition-none"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full border border-gray-200 px-4 py-2 text-black bg-white text-base placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-0 rounded-none shadow-none transition-none"
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleChangePassword}
                        disabled={!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim() || newPassword !== confirmPassword}
                      >
                        Save Password
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition"
                        onClick={() => {
                          setShowChangePassword(false);
                          setCurrentPassword("");
                          setNewPassword("");
                          setConfirmPassword("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Account Section */}
          {selected === 'Account' && (
            <div className="w-full flex flex-col h-full overflow-y-auto scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              <style>{`div.scrollbar-none::-webkit-scrollbar { display: none; }`}</style>
              {/* Account Section */}
              <h2 className="text-2xl font-bold mb-8 text-black">Account</h2>
              <form className="space-y-8">
                {/* Email Address Section at the top */}
                <div className="mb-10">
                  <div className="font-semibold text-gray-700 mb-2">My Business E-mail Address</div>
                  {emailList.map((item, idx) => (
                    <div key={item.email + idx} className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m0 0l4-4m-4 4l4 4" /></svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.email}</div>
                        <div className="text-xs text-gray-400">{item.added}</div>
                      </div>
                    </div>
                  ))}
                  {addingEmail && (
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m0 0l4-4m-4 4l4 4" /></svg>
                        </div>
                        <input
                          type="email"
                          className="w-full border border-gray-200 px-4 py-2 text-black bg-white text-base placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-0 rounded-none shadow-none transition-none"
                          placeholder="Enter new email address"
                          value={newEmail}
                          onChange={e => setNewEmail(e.target.value)}
                          onKeyDown={handleNewEmailKeyDown}
                          autoFocus
                        />
                        <button
                          type="button"
                          className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition"
                          onClick={handleSaveNewEmail}
                          aria-label="Save email"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </button>
                      </div>
                      {emailError && (
                        <div className="text-red-500 text-sm ml-11 mt-1">
                          {emailError}
                        </div>
                      )}
                    </div>
                  )}
                  {!addingEmail && (
                    <button type="button" className="mt-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition" onClick={handleAddEmailRow}>+ Add Email Address</button>
                  )}
              </div>
              {/* Language */}
              <div>
                  <div className="font-semibold text-gray-700 mb-2">Language</div>
                  <select
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-black bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none hover:bg-gray-50 focus:bg-gray-50 cursor-pointer bg-[url('data:image/svg+xml;utf8,<svg fill=none stroke=%23667eea stroke-width=2 viewBox=0 0 24 24 xmlns=http://www.w3.org/2000/svg><path stroke-linecap=round stroke-linejoin=round d=M19 9l-7 7-7-7/></svg>')] bg-no-repeat bg-[right_0.75rem_center]"
                  >
                  <option value="en">🇺🇸 English</option>
                    <option value="ph">🇵🇭 Tagalog</option>
                    <option value="es">🇪🇸 Spanish</option>
                    <option value="fr">🇫🇷 French</option>
                </select>
              </div>
                {/* Logistics Toggles */}
              <div className="space-y-6">
                  <div>
                <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-700">Two-Factor Authentication</div>
                        <div className="text-xs text-gray-500">Enable two-factor authentication for account security</div>
                      </div>
                  <Switch
                        checked={twoFactorAuth}
                        onChange={setTwoFactorAuth}
                        className={`${twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                      >
                        <span className="sr-only">Enable Two-Factor Authentication</span>
                    <span
                          className={`${twoFactorAuth ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
                    />
                  </Switch>
                </div>
                  </div>
                  <div>
                <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-700">Auto-Accept Orders</div>
                        <div className="text-xs text-gray-500">Automatically accept new orders</div>
                      </div>
                  <Switch
                        checked={autoAcceptOrders}
                        onChange={setAutoAcceptOrders}
                        className={`${autoAcceptOrders ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                      >
                        <span className="sr-only">Enable Auto-Accept Orders</span>
                    <span
                          className={`${autoAcceptOrders ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
                    />
                  </Switch>
                </div>
                  </div>
                  <div>
                <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-700">Low Inventory Alerts</div>
                        <div className="text-xs text-gray-500">Receive alerts when inventory is low</div>
                      </div>
                  <Switch
                        checked={lowInventoryAlerts}
                        onChange={setLowInventoryAlerts}
                        className={`${lowInventoryAlerts ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                      >
                        <span className="sr-only">Enable Low Inventory Alerts</span>
                    <span
                          className={`${lowInventoryAlerts ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
                    />
                  </Switch>
                    </div>
                </div>
              </div>
              {/* Remove Account */}
              <div className="pt-6 border-t border-gray-200 flex flex-col gap-4">
                <div className="text-gray-600 text-sm">
                  You can do <b>Disable account</b> to take a break from Nexus.
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="bg-red-100 hover:bg-red-200 text-red-700 font-medium px-4 py-2 rounded-lg border border-red-200 transition"
                    onClick={() => setShowDisableModal(true)}
                  >
                    Disable account
                  </button>
                  <button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </form>
          </div>
          )}
          {/* Notification Section */}
          {selected === 'Notification' && (
            <div className="max-w-xl w-full mx-auto space-y-6">
              <div className="text-2xl font-bold text-black mb-8 text-left">Notifications</div>
              {/* Email Notifications Card */}
              <div className="flex items-center justify-between p-5 border rounded-xl bg-white shadow-sm">
                <div>
                  <div className="font-medium text-gray-800">Email Notifications</div>
                  <div className="text-xs text-gray-500">Enable email notifications for shipment updates</div>
                </div>
                <Switch
                  checked={emailNotifications}
                  onChange={setEmailNotifications}
                  className={`${emailNotifications ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                >
                  <span className="sr-only">Enable Email Notifications</span>
                  <span
                    className={`${emailNotifications ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
                  />
                </Switch>
              </div>
              {/* SMS Alerts Card */}
              <div className="flex items-center justify-between p-5 border rounded-xl bg-white shadow-sm">
                <div>
                  <div className="font-medium text-gray-800">SMS Alerts</div>
                  <div className="text-xs text-gray-500">Enable SMS alerts for delivery status</div>
                </div>
                <Switch
                  checked={smsAlerts}
                  onChange={setSmsAlerts}
                  className={`${smsAlerts ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                >
                  <span className="sr-only">Enable SMS Alerts</span>
                  <span
                    className={`${smsAlerts ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
                  />
                </Switch>
              </div>
              {/* Push Notifications Card */}
              <div className="flex items-center justify-between p-5 border rounded-xl bg-white shadow-sm">
                <div>
                  <div className="font-medium text-gray-800">Push Notifications</div>
                  <div className="text-xs text-gray-500">Enable push notifications for real-time updates</div>
                </div>
                <Switch
                  checked={pushNotifications}
                  onChange={setPushNotifications}
                  className={`${pushNotifications ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                >
                  <span className="sr-only">Enable Push Notifications</span>
                  <span
                    className={`${pushNotifications ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
                  />
                </Switch>
              </div>
              {/* Promotional Notifications Card */}
              <div className="flex items-center justify-between p-5 border rounded-xl bg-white shadow-sm">
                <div>
                  <div className="font-medium text-gray-800">Promotional Notifications</div>
                  <div className="text-xs text-gray-500">Receive promotional offers and updates</div>
                </div>
                <Switch
                  checked={promotionalNotifications}
                  onChange={setPromotionalNotifications}
                  className={`${promotionalNotifications ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                >
                  <span className="sr-only">Enable Promotional Notifications</span>
                  <span
                    className={`${promotionalNotifications ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
                  />
                </Switch>
              </div>
              {/* Weekly Summary Card */}
              <div className="flex items-center justify-between p-5 border rounded-xl bg-white shadow-sm">
                <div>
                  <div className="font-medium text-gray-800">Weekly Summary</div>
                  <div className="text-xs text-gray-500">Get a weekly summary of your account activity</div>
                </div>
                <Switch
                  checked={weeklySummary}
                  onChange={setWeeklySummary}
                  className={`${weeklySummary ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                >
                  <span className="sr-only">Enable Weekly Summary</span>
                  <span
                    className={`${weeklySummary ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
                  />
                </Switch>
              </div>
            </div>
          )}

          {/* Delete Account Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Delete Account</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
                </p>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your password to confirm
                  </label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeletePassword("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleDeleteAccount}
                    disabled={!deletePassword.trim()}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Disable Account Modal */}
          {showDisableModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Disable Account</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Please provide a reason for disabling your account. This will help us improve our services.
                </p>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your reason for disabling the account..."
                  rows={3}
                  value={disableReason}
                  onChange={(e) => setDisableReason(e.target.value)}
                />
                <div className="flex gap-3 justify-end mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                    onClick={() => {
                      setShowDisableModal(false);
                      setDisableReason("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition"
                    onClick={handleDisableAccount}
                    disabled={!disableReason.trim()}
                  >
                    Disable Account
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
