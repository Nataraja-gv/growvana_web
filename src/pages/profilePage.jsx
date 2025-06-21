import React from 'react';
import { useSelector } from 'react-redux';
import { Pencil } from 'lucide-react';

const ProfilePage = () => {
  const user = useSelector((state) => state?.user);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-lg text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-green-200 flex items-center justify-center text-4xl font-bold text-green-800 shadow-lg">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          {/* Name and Email */}
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-800 capitalize">{user.name}</h1>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>

          {/* Info Card */}
          <div className="w-full bg-gray-50 rounded-xl shadow-inner p-6 mt-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Profile Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">Full Name</span>
                <span>{user.name}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">Email Address</span>
                <span>{user.email}</span>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          {/* <button className="mt-6 inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow transition-all">
            <Pencil className="w-5 h-5 mr-2" />
            Edit Profile
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
