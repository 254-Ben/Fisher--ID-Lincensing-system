import { generateFisherIDPDF } from '../utils/pdfUtils';

function DownloadIDCard() {
  const dummyFisher = {
    name: "Jane Fisher",
    id: "FID007",
    boat: "LakeMaster"
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Download Fisher ID Card</h2>
      <button onClick={() => generateFisherIDPDF(dummyFisher)} className="bg-indigo-600 text-white px-4 py-2">
        Generate PDF
      </button>
    </div>
  );
}
export default DownloadIDCard;
