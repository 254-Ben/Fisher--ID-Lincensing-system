import { generatePermitPDF } from '../utils/pdfUtils';

function DownloadPermit() {
  const dummyPermit = {
    fisherId: "FID007",
    type: "Annual",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "active"
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Download Seasonal Permit</h2>
      <button onClick={() => generatePermitPDF(dummyPermit)} className="bg-green-600 text-white px-4 py-2">
        Download Permit PDF
      </button>
    </div>
  );
}
export default DownloadPermit;
