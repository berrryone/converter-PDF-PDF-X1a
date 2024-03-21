async function convertToPDFX1a() {
  const input = document.getElementById('pdfFile').files[0];
  if (!input) {
    alert('Please select a PDF file.');
    return;
  }

  const reader = new FileReader();
  reader.onload = async function(event) {
    const pdfBytes = new Uint8Array(event.target.result);
    const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

    pdfDoc.setPDFVersion(PDFLib.PDFVersion.PDF_1_7);
    pdfDoc.setTitle('Converted PDF/X1a');

    const pdfX1aBytes = await pdfDoc.saveAsPDFX();
    const pdfBlob = new Blob([pdfX1aBytes], { type: 'application/pdf' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = 'converted_pdf_x1a.pdf';
    downloadLink.textContent = 'Click here to download the converted file';
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Zamiast usuwać odnośnik, pozwalamy użytkownikowi pobrać plik, a następnie odłączamy odnośnik od dokumentu
    downloadLink.addEventListener('click', () => {
      setTimeout(() => {
        URL.revokeObjectURL(downloadLink.href);
      }, 100);
    });

    alert('Conversion completed. Your file is ready for download.');
  };
  reader.readAsArrayBuffer(input);
}
