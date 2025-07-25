import QRCode from 'react-qr-code';

function IDCard({ fisher = { name: "John Doe", id: "F123", boat: "BOAT-45" } }) {
  return (
    <div className="border p-4 w-80 shadow-md text-center bg-white">
      <h3 className="font-bold text-lg">Fisher ID Card</h3>
      <p>Name: {fisher.name}</p>
      <p>Fisher ID: {fisher.id}</p>
      <p>Boat: {fisher.boat}</p>
      <div className="mt-4">
        <QRCode value={`https://verify.app/fisher/${fisher.id}`} />
      </div>
    </div>
  );
}
export default IDCard;
