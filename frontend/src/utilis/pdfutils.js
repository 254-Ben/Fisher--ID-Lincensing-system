import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';

export async function generateFisherIDPDF(fisher) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Fisher ID Card', 80, 20);
  doc.setFontSize(12);

  doc.text(`Name: ${fisher.name}`, 20, 40);
  doc.text(`Fisher ID: ${fisher.id}`, 20, 50);
  doc.text(`Boat: ${fisher.boat}`, 20, 60);

  const qrData = `https://your-verification-url.com/fisher/${fisher.id}`;
  const qrImage = await QRCode.toDataURL(qrData);

  doc.addImage(qrImage, 'PNG', 140, 40, 40, 40); // (x, y, width, height)
  doc.text('Scan QR to verify', 145, 85);

  doc.save(`${fisher.name}-FisherID.pdf`);
}

export async function generatePermitPDF(permit) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Seasonal Permit', 80, 20);

  autoTable(doc, {
    head: [['Field', 'Value']],
    body: [
      ['Fisher ID', permit.fisherId],
      ['Permit Type', permit.type],
      ['Start Date', permit.startDate],
      ['End Date', permit.endDate],
      ['Status', permit.status]
    ]
  });

  const qrData = `https://your-verification-url.com/permit/${permit.fisherId}`;
  const qrImage = await QRCode.toDataURL(qrData);
  doc.addImage(qrImage, 'PNG', 75, 110, 50, 50); // center QR
  doc.text('Verify by QR code', 80, 165);

  doc.save(`Permit-${permit.fisherId}.pdf`);
}
