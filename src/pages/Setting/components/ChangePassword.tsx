import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Eye, EyeOff, Terminal } from "lucide-react";
import React, { useState } from "react";

interface ChangePasswordProps {
  password: string;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ password }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  // States for showing/hiding passwords
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleCurrentPasswordChange = (e: any) => {
    setCurrentPassword(e.target.value);
    if (e.target.value === password) {
      setIsCurrentPasswordValid(true);
      setPasswordMismatchError(false);
    } else {
      setIsCurrentPasswordValid(false);
    }
  };

  const handleNewPasswordChange = (e: any) => {
    setNewPassword(e.target.value);
    if (e.target.value === confirmNewPassword) {
      setPasswordMismatchError(false);
    }
  };

  const handleConfirmNewPasswordChange = (e: any) => {
    setConfirmNewPassword(e.target.value);
    if (e.target.value === newPassword) {
      setPasswordMismatchError(false);
    } else {
      setPasswordMismatchError(true);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (newPassword === confirmNewPassword && newPassword !== "") {
      setPasswordChangeSuccess(true);
      setTimeout(() => {
        setPasswordChangeSuccess(false);
      }, 3000);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } else {
      setPasswordMismatchError(true);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 rounded-lg shadow-lg relative">
      <h2 className="text-2xl font-bold text-center mb-6">Change Password</h2>

      {/* current password */}
      <div className="mb-4">
        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showCurrentPassword ? "text" : "password"}
            id="current-password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-3 top-2 text-gray-500"
          >
            {showCurrentPassword ?<EyeOff/> : <Eye/>}
          </button>
        </div>
        {!isCurrentPasswordValid && currentPassword !== "" && (
          <p className="text-red-500 text-sm mt-1">Current password does not match.</p>
        )}
      </div>

      {/* new password */}
      {isCurrentPasswordValid && (
        <>
          <div className="mb-4">
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="new-password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-2 text-gray-500"
              >
                {showNewPassword ? <EyeOff/> : <Eye/>}
              </button>
            </div>
          </div>

          {/* confirm new password */}
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                id="confirm-password"
                value={confirmNewPassword}
                onChange={handleConfirmNewPasswordChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                className="absolute right-3 top-2 text-gray-500"
              >
                {showConfirmNewPassword ? <EyeOff/> : <Eye/>}
              </button>
            </div>
            {passwordMismatchError && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
            )}
          </div>
        </>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-zinc-700 text-white py-2 rounded-md hover:bg-zinc-900"
        disabled={!isCurrentPasswordValid || passwordMismatchError || newPassword === ""}
      >
        Change Password
      </button>

      {/* Success message */}
      {passwordChangeSuccess && (
        <div className="absolute top-28 right-24 mt-4 bg-zinc-500 border text-white px-6 py-2 rounded-lg shadow-lg">
          Password changed successfully!
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
