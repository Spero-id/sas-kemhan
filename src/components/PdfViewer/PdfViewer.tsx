import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const MyPdfViewer = ({ pdfBlob }: any) => {
  return (
    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${2.11.337}/build/pdf.worker.min.js`}>
      <Viewer fileUrl={pdfBlob} />
    </Worker>
  );
};

export default MyPdfViewer;