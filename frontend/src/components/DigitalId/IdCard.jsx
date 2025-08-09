import React from 'react';
import { QrCode, Calendar, MapPin } from 'lucide-react';

const IdCard = ({ user, digitalId }) => {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
        {/* Header */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm px-6 py-4">
          <h2 className="text-white font-bold text-lg text-center">
            DIGITAL FISHER ID
          </h2>
          <p className="text-blue-100 text-sm text-center">
            {digitalId.idNumber}
          </p>
        </div>

        {/* Profile Section */}
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-white">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-blue-100 text-sm">Licensed Fisher</p>
              <div className="flex items-center space-x-1 mt-1">
                <MapPin className="h-3 w-3 text-blue-200" />
                <span className="text-blue-200 text-xs">
                  {user.address.split(',').slice(-2).join(',')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-1 mb-2">
                <Calendar className="h-4 w-4 text-blue-200" />
                <span className="text-blue-200 text-xs">Valid Until</span>
              </div>
              <p className="text-white font-semibold">
                {new Date(digitalId.expiryDate).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <QrCode className="h-12 w-12 text-gray-800" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white bg-opacity-5 px-6 py-3">
          <div className="flex justify-between items-center text-xs text-blue-200">
            <span>Issued: {new Date(digitalId.issueDate).toLocaleDateString()}</span>
            <span className={`px-2 py-1 rounded-full ${
              digitalId.status === 'active' 
                ? 'bg-green-500 bg-opacity-20 text-green-200' 
                : 'bg-red-500 bg-opacity-20 text-red-200'
            }`}>
              {digitalId.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdCard;