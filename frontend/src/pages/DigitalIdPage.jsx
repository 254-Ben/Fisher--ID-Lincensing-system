import React from 'react';
import { Download, RefreshCw, QrCode } from 'lucide-react';
import IdCard from '../components/DigitalId/IdCard';
import { useAuth } from '../contexts/AuthContext';

const DigitalIdPage = () => {
  const { user } = useAuth();

  // Mock digital ID data - this would come from the API
  const digitalId = {
    _id: '1',
    fisherId: user?._id || '',
    idNumber: 'FID-2024-001',
    qrCode: 'mock-qr-code',
    issueDate: '2024-01-01',
    expiryDate: '2024-12-31',
    status: 'active',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Digital Fisher ID</h1>
        <p className="mt-2 text-gray-600">
          Your official digital fishing identification and license.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Digital ID Card */}
        <div className="space-y-4">
          {user && <IdCard user={user} digitalId={digitalId} />}
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
              <Download size={18} />
              <span>Download ID</span>
            </button>
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
              <RefreshCw size={18} />
              <span>Renew ID</span>
            </button>
          </div>
        </div>

        {/* ID Information */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ID Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Issue Date</span>
                <span className="font-medium">Jan 1, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expiry Date</span>
                <span className="font-medium">Dec 31, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Days Remaining</span>
                <span className="font-medium text-green-600">235 days</span>
              </div>
            </div>
          </div>

          {/* QR Code Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Code</h3>
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
                <QrCode className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">
                This QR code contains your encrypted fisher ID information for quick verification by authorities.
              </p>
            </div>
          </div>

          {/* Verification Info */}
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Verification Instructions
            </h3>
            <p className="text-sm text-blue-800">
              Show this digital ID to fishing authorities when requested. 
              The QR code can be scanned for instant verification of your 
              fishing license status and permits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalIdPage;