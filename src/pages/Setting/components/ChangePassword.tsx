import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleCurrentPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = e.target.value;
    setCurrentPassword(input);
    setIsCurrentPasswordValid(input === password);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    if (e.target.value === confirmNewPassword) {
      setPasswordMismatchError(false);
    }
  };

  const handleConfirmNewPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = e.target.value;
    setConfirmNewPassword(input);
    setPasswordMismatchError(input !== newPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      isCurrentPasswordValid &&
      newPassword === confirmNewPassword &&
      newPassword
    ) {
      setPasswordChangeSuccess(true);
      setTimeout(() => setPasswordChangeSuccess(false), 3000);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } else {
      setPasswordMismatchError(true);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">Change Password</h2>
      <form onSubmit={handleSubmit}>
        {/* Current Password */}
        <div className="mb-4">
          <label
            htmlFor="current-password"
            className="block text-sm font-medium text-gray-700"
          >
            Current Password
          </label>
          <div className="relative">
            <Input
              type={showCurrentPassword ? "text" : "password"}
              id="current-password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              className="mt-1 block w-full px-4 py-3 border rounded-md "
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-2 text-gray-500"
            >
              {showCurrentPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {!isCurrentPasswordValid && currentPassword && (
            <p className="text-red-500 text-sm mt-1">
              Current password is incorrect.
            </p>
          )}
        </div>

        {/* New Password */}
        {isCurrentPasswordValid && (
          <>
            <div className="mb-4">
              <Label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </Label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  id="new-password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  className="mt-1 block w-full px-4 py-3 border rounded-md "
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-2 text-gray-500"
                >
                  {showNewPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="mb-4">
              <label
                htmlFor="confirm-new-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmNewPassword ? "text" : "password"}
                  id="confirm-new-password"
                  value={confirmNewPassword}
                  onChange={handleConfirmNewPasswordChange}
                  className="mt-1 block w-full px-4 py-3 border rounded-md"
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmNewPassword(!showConfirmNewPassword)
                  }
                  className="absolute right-3 top-2 text-gray-500"
                >
                  {showConfirmNewPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {passwordMismatchError && (
                <p className="text-red-500 text-sm mt-1">
                  Passwords do not match.
                </p>
              )}
            </div>
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-zinc-700 text-white py-2 my-2 rounded-md hover:bg-zinc-900"
          disabled={
            !isCurrentPasswordValid || passwordMismatchError || !newPassword
          }
        >
          Change Password
        </button>
      </form>

      {/* Success Alert */}
      {passwordChangeSuccess && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md">
          Password changed successfully!
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
