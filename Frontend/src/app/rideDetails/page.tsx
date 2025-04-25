'use client';

import { useEffect, useState } from 'react';

type User = {
  name: string;
  userType: string;
  phoneNo: string;
  emailId: string;
  gender: string;
  dob: string;
  emergencyNo: string;
};

export default function UserInfo() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  if (!user) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading user data...</div>;
  }

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-pink-300 p-4 rounded-lg shadow-md text-pink-900 flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{user.name}</h1>
          <p className="text-sm">{user.userType} - Verified User</p>
        </div>
        <div className="font-bold text-lg">Phone: {user.phoneNo}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full max-w-3xl">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Personal Info</h2>
          <p><strong>Email:</strong> {user.emailId}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>DOB:</strong> {new Date(user.dob).toLocaleDateString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Emergency Contact</h2>
          <p><strong>Phone:</strong> {user.emergencyNo}</p>
        </div>
      </div>
    </div>
  );
}
