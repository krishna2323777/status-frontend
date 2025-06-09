import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axios.post(
      "https://status-backend-1rc2.onrender.com//api/analyze", 
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    setResult(data.analysis);
    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        background: "#232142",
        color: "#fff",
        padding: 24,
        borderRadius: 12,
      }}
    >
      <h2>Passport Validator</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        onClick={handleUpload}
        disabled={loading || !file}
        style={{ marginLeft: 8 }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div style={{ marginTop: 32 }}>
          <div style={{ background: "#2d2a4a", padding: 16, borderRadius: 8 }}>
            <h3>Passport Details</h3>
            <div>
              <b>Passport Number:</b> {result.passportNumber}
            </div>
            <div>
              <b>Name:</b> {result.name}
            </div>
            <div>
              <b>Nationality:</b> {result.nationality}
            </div>
            <div>
              <b>Date of Birth:</b> {result.dateOfBirth}
            </div>
            <div>
              <b>Date of Issue:</b> {result.dateOfIssue}
            </div>
            <div>
              <b>Date of Expiry:</b> {result.dateOfExpiry}
            </div>
            <div>
              <b>Issuing Authority:</b> {result.issuingAuthority}
            </div>
            <div style={{ marginTop: 16, fontWeight: "bold" }}>
              Status:{" "}
              <span
                style={{
                  color: result.status === "Approved" ? "#4cd137" : "#e84118",
                }}
              >
                {result.status}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
