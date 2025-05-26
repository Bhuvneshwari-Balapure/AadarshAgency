import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "../../Config/axios";

const GenerateInvoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`/pro-billing/${id}`);
        setInvoice(response.data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
        setError("Failed to load invoice. Please try again.");
      }
    };

    fetchInvoice();
  }, [id]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!invoice) return <p>Loading invoice...</p>;

  // Calculate totals from billing items
  const calculateTotals = () => {
    if (!invoice.billing) return {};

    return invoice.billing.reduce((acc, item) => {
      acc.basicAmount =
        (acc.basicAmount || 0) + (parseFloat(item.taxableAmount) || 0);
      acc.sgst = (acc.sgst || 0) + (parseFloat(item.sgst) || 0);
      acc.cgst = (acc.cgst || 0) + (parseFloat(item.cgst) || 0);
      acc.total = (acc.total || 0) + (parseFloat(item.total) || 0);
      return acc;
    }, {});
  };

  const totals = calculateTotals();
  const {
    companyId,
    customer,
    billing = [],
    finalAmount,
    salesmanId,
  } = invoice;

  return (
    <div className="container my-2" style={{ padding: "10px" }}>
      <div
        style={{
          border: "2px solid black",
          padding: "0",
          backgroundColor: "#fffbcf",
        }}
      >
        {/* Header Section */}
        <div
          className="text-center"
          style={{
            borderBottom: "2px solid black",
            lineHeight: "1px",
          }}
        >
          <h5
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              position: "relative",
              top: "10px",
            }}
          >
            ADARSH AGENCY
          </h5>
          <p className="">H. NO 02, NAGAR TIMBER MARKET, CHOLA, BHOPAL</p>
          <p>MOB: 9926703332, 8821931550</p>
          <p>
            <strong>GSTIN: 23BENPR0816K1ZB</strong>
          </p>
        </div>

        {/* Customer/Bill Info Section */}
        <div>
          <div
            className="p-3"
            style={{
              borderBottom: "2px solid black",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Left box - Customer Info */}
            <div
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                width: "48%",
                fontSize: "16px",
                lineHeight: "1.6",
                boxSizing: "border-box",
              }}
            >
              <strong>To:</strong> {companyId.name || "N/A"}
              <br />
              {companyId.address || "Address not available"}
              <br />
              <strong>GSTIN:</strong> {customer?.gstin || "N/A"}
              <br />
              <strong>Number:</strong> {companyId.mobile || "N/A"}
            </div>

            {/* Right box - Bill Info */}
            <div
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                width: "30.7%",
                fontSize: "16px",
                textAlign: "right",
                lineHeight: "1.6",
                boxSizing: "border-box",
              }}
            >
              <strong>Bill No:</strong> {invoice._id.slice(-6)}
              <br />
              <strong>Date:</strong>{" "}
              {customer?.Billdate
                ? new Date(customer.Billdate).toLocaleDateString()
                : new Date().toLocaleDateString()}
              <br />
              <strong>Salesman:</strong> {salesmanId?.name || "N/A"}
              <br />
              <strong>Number:</strong> {salesmanId?.mobile || "-"}
            </div>
          </div>

          {/* Main Items Table */}
          <div className="p-0">
            <Table bordered className="mb-0" style={{ marginBottom: "0" }}>
              <thead>
                <tr
                  style={{
                    borderBottom: "2px solid black",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Sr
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Particulars
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    HSN Code
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    MRP
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Qty
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Free
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Rate
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Schm Amt
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Sch Amt
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    CD%
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Taxable Amt
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    SGST
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    CGST
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {billing.map((item, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {index + 1}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {item.productName}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {item.hsnCode || "-"}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {item.mrp || "-"}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {item.qty} {item.unit || ""}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {item.free || 0}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {item.rate}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {item.schemeAmount || 0}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {item.schAmount || 0}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {item.cd || 0}%
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {item.taxableAmount || 0}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {item.sgst || 0}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {item.cgst || 0}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {item.total || 0}
                    </td>
                  </tr>
                ))}
              </tbody>

              {/* Footer with calculated totals */}
              <thead>
                <tr
                  style={{
                    borderBottom: "2px solid black",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Sr
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Basic Amount: {totals.basicAmount?.toFixed(2) || "0.00"}
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    OTY:
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    C/S 0
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    PCS = 250
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    0
                  </th>
                  <th
                    style={{ border: "1px solid black", padding: "8px" }}
                  ></th>
                  <th
                    style={{ border: "1px solid black", padding: "8px" }}
                  ></th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    {totals.sgst?.toFixed(2) || "0.00"}
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    25.63
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    {totals.basicAmount?.toFixed(2) || "0.00"}
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    {totals.sgst?.toFixed(2) || "0.00"}
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    {totals.cgst?.toFixed(2) || "0.00"}
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    {finalAmount || totals.total?.toFixed(2) || "0.00"}
                  </th>
                </tr>
              </thead>
            </Table>
          </div>

          {/* Footer Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "16px",
            }}
          >
            {/* Left section: Disclaimer */}
            <div style={{ width: "48%", padding: "8px" }}>
              <p style={{ marginBottom: "5px" }}>
                Goods once sold will not be taken back
              </p>
              <p style={{ marginBottom: "0" }}>
                Cheque bounce charges Rs. 500/-
              </p>
              <p style={{ marginBottom: "0" }}>Credit 7 Days Only/-</p>
              <p style={{ marginBottom: "0" }}>
                Subject to Bhopal jusrisdiction/-
              </p>
              <p>E.&.O.E</p>
            </div>

            {/* Right section: Authorized Signatory */}
            <div
              style={{
                position: "relative",
                right: "21%",
                textAlign: "right",
                width: "20%",
              }}
            >
              <p style={{ marginBottom: "0" }}>For ADARSH AGENCY</p>
              <p style={{ marginTop: "60px", marginBottom: "0" }}>
                Authorized Signatory
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateInvoice;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "../../Config/axios";
// import { Table } from "react-bootstrap";

// const GenerateInvoice = () => {
//   const { id } = useParams(); // Get invoice ID from URL
//   const [invoice, setInvoice] = useState(null);

//   useEffect(() => {
//     const fetchInvoice = async () => {
//       try {
//         const response = await axios.get(`/pro-billing/${id}`);
//         setInvoice(response.data);
//       } catch (error) {
//         console.error("Error fetching invoice:", error);
//       }
//     };

//     fetchInvoice();
//   }, [id]);

//   if (!invoice) return <p>Loading invoice...</p>;

//   const { companyId, customer, billing, finalAmount } = invoice;

//   return (
//     <div className="container my-2" style={{ padding: "10px" }}>
//       <div
//         style={{
//           border: "2px solid black",
//           padding: "0",
//           backgroundColor: "#fffbcf",
//         }}
//       >
//         {/* Header */}
//         <div
//           className="text-center"
//           style={{ borderBottom: "2px solid black", lineHeight: "1px" }}
//         >
//           <h5
//             style={{
//               fontWeight: "bold",
//               fontSize: "24px",
//               top: "10px",
//               position: "relative",
//             }}
//           >
//             ADARSH AGENCY
//           </h5>
//           <p>H. NO 02, NAGAR TIMBER MARKET, CHOLA, BHOPAL</p>
//           <p>MOB: 9926703332, 8821931550</p>
//           <p>
//             <strong>GSTIN: 23BENPR0816K1ZB</strong>
//           </p>
//         </div>

//         {/* Customer Info */}
//         <div
//           className="p-3"
//           style={{ display: "flex", borderBottom: "2px solid black" }}
//         >
//           <div
//             style={{
//               border: "1px solid #ddd",
//               padding: "10px",
//               width: "48%",
//               fontSize: "16px",
//               lineHeight: "1.6",
//             }}
//           >
//             <strong>To:</strong> {customer.CustomerName || "N/A"}
//             <br />
//             <strong>GSTIN:</strong> -- <br />
//             <strong>Date:</strong>{" "}
//             {new Date(customer.Billdate).toLocaleDateString()} <br />
//           </div>
//           <div
//             style={{
//               border: "1px solid #ddd",
//               padding: "10px",
//               width: "30.7%",
//               textAlign: "right",
//               fontSize: "16px",
//               lineHeight: "1.6",
//             }}
//           >
//             <strong>Bill No:</strong> {invoice._id.slice(-6).toUpperCase()}
//             <br />
//             <strong>Salesman:</strong> ANKT
//             <br />
//           </div>
//         </div>

//         {/* Items Table */}
//         <div className="p-0">
//           <Table bordered className="mb-0">
//             <thead>
//               <tr
//                 style={{
//                   borderBottom: "2px solid black",
//                   backgroundColor: "#f5f5f5",
//                 }}
//               >
//                 <th>Sr</th>
//                 <th>Particulars</th>
//                 <th>HSN Code</th>
//                 <th>MRP</th>
//                 <th>Qty</th>
//                 <th>Free</th>
//                 <th>Rate</th>
//                 <th>Schm Amt</th>
//                 <th>Sch Amt</th>
//                 <th>CD%</th>
//                 <th>Taxable Amt</th>
//                 <th>SGST</th>
//                 <th>CGST</th>
//                 <th>Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {billing.map((item, idx) => (
//                 <tr key={idx}>
//                   <td>{idx + 1}</td>
//                   <td>{item.productName}</td>
//                   <td>{item.hsn || "-"}</td>
//                   <td>{item.mrp || "-"}</td>
//                   <td>{item.qty}</td>
//                   <td>{item.free || 0}</td>
//                   <td>{item.rate}</td>
//                   <td>{item.schAmt}</td>
//                   <td>{item.sch}</td>
//                   <td>{item.cd}</td>
//                   <td>{item.amount}</td>
//                   <td>{(item.gst / 2).toFixed(2)}</td>
//                   <td>{(item.gst / 2).toFixed(2)}</td>
//                   <td>{item.total}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>

//         {/* Footer */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             padding: "16px",
//           }}
//         >
//           <div style={{ width: "48%", padding: "8px" }}>
//             <p>Goods once sold will not be taken back</p>
//             <p>Cheque bounce charges Rs. 500/-</p>
//             <p>Credit 7 Days Only/-</p>
//             <p>Subject to Bhopal jurisdiction</p>
//             <p>E.&.O.E</p>
//           </div>
//           <div
//             style={{
//               position: "relative",
//               right: "21%",
//               textAlign: "right",
//               width: "20%",
//             }}
//           >
//             <p>For ADARSH AGENCY</p>
//             <p style={{ marginTop: "60px" }}>Authorized Signatory</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GenerateInvoice;
