import React, { useState } from "react";
import jsPDF from "jspdf";

const Converter = () => {
  const [images, setImages] = useState([]);

  const handleImages = (event) => {
    const selectedImages = event.target.files;
    setImages(Array.from(selectedImages));
  };

  const convertToPdf = () => {
    const pdf = new jsPDF();

    images.forEach((image, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        const imgData = reader.result;

        // Get the width and height of the internal page size
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Calculate a dynamic width and height based on the page size
        const dynamicWidth = pageWidth * 0.9; // Adjust as needed
        const dynamicHeight = (pageHeight / 100) * 80; // Maintain aspect ratio

        pdf.addImage(imgData, "JPEG", 10, 10, dynamicWidth, dynamicHeight);

        if (index < images.length - 1) {
          pdf.addPage();
        } else {
          pdf.save("converted.pdf");
        }
      };
      reader.readAsDataURL(image);
    });
  };

  return (
    <div className="max-w-7xl m-auto">
      <div className="space-y-6">
        <h3 className="text-3xl font-bold">Pick Image(s)</h3>
        <input
          type="file"
          multiple
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleImages}
        />
        <div>
          {images ? (
            <div>
              {images.map((data, index) => (
                <div key={index}>
                  <img
                    src={URL.createObjectURL(data)}
                    className="w-full h-full"
                    alt={`Image ${index}`}
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <button
          className="bg-violet-400 px-6 py-3 rounded text-white"
          onClick={convertToPdf}
          disabled={images.length === 0}
        >
          Convert to PDF
        </button>
      </div>
    </div>
  );
};

export default Converter;
