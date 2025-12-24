import React, { useState, useRef } from 'react';
import { useToast } from '../context/ToastContext';
import './UploadArea.css';

export default function UploadArea({ onUpload, tournamentId }) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { showToast } = useToast();
  const inputRef = useRef();

  const downloadTemplate = () => {
    const csv = 'Stock_ID,Score\nINFY,0.85\nTCS,0.72\nRELIANCE,-0.43\nHDFC,0.56\nITC,0.23';
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', 'submission_template.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('Template downloaded! 📥', 'success');
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (fileOrList) => {
    const chosen = fileOrList && fileOrList.length !== undefined ? fileOrList[0] : fileOrList;
    if (!chosen || !chosen.name || !chosen.name.endsWith('.csv')) {
      showToast('Please upload a CSV file', 'error');
      return;
    }

    setFile(chosen);

    const reader = new FileReader();
    reader.onload = (e) => {
      const lines = e.target.result.split('\n').slice(0, 6);
      setPreview(lines.join('\n'));
    };
    reader.readAsText(chosen);
  };

  const handleSubmit = async () => {
    if (!file) {
      showToast('Please select a file', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await onUpload(formData, tournamentId);
      setFile(null);
      setPreview(null);
      showToast('Submission Successful 🎯', 'success');
    } catch (error) {
      showToast(error.message || 'Upload failed', 'error');
    }
  };

  return (
    <div className="upload-area">
      <label
        htmlFor="file-input"
        className={`upload-zone ${dragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            inputRef.current?.click();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Upload CSV file"
      >
        <div className="upload-icon">📤</div>
        <h3>Drag & Drop your CSV here</h3>
        <p>or press Enter / click to select a file</p>
        <input
          id="file-input"
          ref={inputRef}
          type="file"
          accept=".csv"
          className="upload-input"
          onChange={(e) => handleFile(e.target.files[0])}
          style={{display:'none'}}
        />
      </label>

      {file && (
        <div className="upload-preview">
          <h4>File: {file.name} • {(file.size / 1024).toFixed(1)} KB</h4>
          <pre>{preview}</pre>
          <button onClick={handleSubmit} className="btn btn-primary">
            Submit Prediction
          </button>
        </div>
      )}

      <div style={{display:'flex',gap:'0.5rem',marginTop:'0.75rem'}}>
        <button onClick={() => inputRef.current?.click()} className="btn btn-secondary">Choose File</button>
        <button onClick={downloadTemplate} className="btn btn-secondary btn-download">📥 Download Template</button>
      </div>
    </div>
  );
}
