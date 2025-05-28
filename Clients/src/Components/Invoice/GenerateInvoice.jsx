// import React, { useEffect, useState } from "react";
// import { Table } from "react-bootstrap";
// import { useParams } from "react-router-dom";
// import axios from "../../Config/axios";

// const GenerateInvoice = () => {
//   const { id } = useParams();
//   const [invoice, setInvoice] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchInvoice = async () => {
//       try {
//         const response = await axios.get(`/pro-billing/${id}`);
//         setInvoice(response.data);
//       } catch (error) {
//         console.error("Error fetching invoice:", error);
//         setError("Failed to load invoice. Please try again.");
//       }
//     };

//     fetchInvoice();
//   }, [id]);

//   if (error) return <p className="text-danger">{error}</p>;
//   if (!invoice) return <p>Loading invoice...</p>;

//   // Calculate totals from billing items
//   const calculateTotals = () => {
//     if (!invoice.billing) return {};

//     return invoice.billing.reduce((acc, item) => {
//       acc.basicAmount =
//         (acc.basicAmount || 0) + (parseFloat(item.taxableAmount) || 0);
//       acc.sgst = (acc.sgst || 0) + (parseFloat(item.sgst) || 0);
//       acc.cgst = (acc.cgst || 0) + (parseFloat(item.cgst) || 0);
//       acc.total = (acc.total || 0) + (parseFloat(item.total) || 0);
//       return acc;
//     }, {});
//   };

//   const totals = calculateTotals();
//   const {
//     companyId,
//     customer,
//     billing = [],
//     finalAmount,
//     salesmanId,
//   } = invoice;

//   return (
//     <div className="container my-2" style={{ padding: "10px" }}>
//       <div
//         style={{
//           border: "2px solid black",
//           padding: "0",
//           backgroundColor: "#fffbcf",
//         }}
//       >
//         {/* Header Section */}
//         <div
//           className="text-center"
//           style={{
//             borderBottom: "2px solid black",
//             lineHeight: "1px",
//           }}
//         >
//           <h5
//             style={{
//               fontWeight: "bold",
//               fontSize: "24px",
//               position: "relative",
//               top: "10px",
//             }}
//           >
//             ADARSH AGENCY
//           </h5>
//           <p className="">H. NO 02, NAGAR TIMBER MARKET, CHOLA, BHOPAL</p>
//           <p>MOB: 9926703332, 8821931550</p>
//           <p>
//             <strong>GSTIN: 23BENPR0816K1ZB</strong>
//           </p>
//         </div>

//         {/* Customer/Bill Info Section */}
//         <div>
//           <div
//             className="p-3"
//             style={{
//               borderBottom: "2px solid black",
//               boxSizing: "border-box",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             {/* Left box - Customer Info */}
//             <div
//               style={{
//                 border: "1px solid #ddd",
//                 padding: "10px",
//                 width: "48%",
//                 fontSize: "16px",
//                 lineHeight: "1.6",
//                 boxSizing: "border-box",
//               }}
//             >
//               <strong>To:</strong> {companyId.name || "N/A"}
//               <br />
//               {companyId.address || "Address not available"}
//               <br />
//               <strong>GSTIN:</strong> {companyId.gstNumber || "N/A"}
//               <br />
//               <strong>Number:</strong> {companyId.mobile || "N/A"}
//             </div>

//             {/* Right box - Bill Info */}
//             <div
//               style={{
//                 border: "1px solid #ddd",
//                 padding: "10px",
//                 width: "30.7%",
//                 fontSize: "16px",
//                 textAlign: "right",
//                 lineHeight: "1.6",
//                 boxSizing: "border-box",
//               }}
//             >
//               <strong>Bill No:</strong> {invoice._id.slice(-6)}
//               <br />
//               <strong>Date:</strong>{" "}
//               {customer?.Billdate
//                 ? new Date(customer.Billdate).toLocaleDateString()
//                 : new Date().toLocaleDateString()}
//               <br />
//               <strong>Salesman:</strong> {salesmanId?.name || "N/A"}
//               <br />
//               <strong>Number:</strong> {salesmanId?.mobile || "-"}
//             </div>
//           </div>

//           {/* Main Items Table */}
//           <div className="p-0">
//             <Table bordered className="mb-0" style={{ marginBottom: "0" }}>
//               <thead>
//                 <tr
//                   style={{
//                     borderBottom: "2px solid black",
//                     backgroundColor: "#f5f5f5",
//                   }}
//                 >
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     Sr
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     Particulars
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     HSN Code
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     MRP
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     Qty
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     Free
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     Rate
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     Sch Amt
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     CD Amt
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     CD%
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     Taxable Amt
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     SGST
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     CGST
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     Total
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {billing.map((item, index) => (
//                   <tr key={index}>
//                     <td style={{ border: "1px solid black", padding: "8px" }}>
//                       {index + 1}
//                     </td>
//                     <td style={{ border: "1px solid black", padding: "8px" }}>
//                       {item.productName}
//                     </td>
//                     <td style={{ border: "1px solid black", padding: "8px" }}>
//                       {item.hsnCode || "-"}
//                     </td>
//                     <td style={{ border: "1px solid black", padding: "8px" }}>
//                       {item.mrp || "-"}
//                     </td>
//                     <td style={{ border: "1px solid black", padding: "8px" }}>
//                       {item.qty} {item.unit || ""}
//                     </td>
//                     <td style={{ border: "1px solid black", padding: "8px" }}>
//                       {item.Free || 0}
//                     </td>
//                     <td style={{ border: "1px solid black", padding: "8px" }}>
//                       {item.rate}
//                     </td>
//                     <td style={{ border: "1px solid black", padding: "8px" }}>
//                       {item.schAmt || 0}
//                     </td>
//                     <td style={{ border: "1px solid black", padding: "8px" }}>
//                       {item.cdAmt || 0}
//                     </td>
//                     <td style={{ border: "1px solid black", padding: "8px" }}>
//                       {item.cd || 0}%
//                     </td>
//                     <td style={{ border: "1px solid black", padding: "8px" }}>
//                       {item.taxableAmount || 0}
//                     </td>
//                     <td style={{ border: "1px solid black", padding: "8px" }}>
//                       {item.sgst || 0}
//                     </td>
//                     <td style={{ border: "1px solid black", padding: "8px" }}>
//                       {item.cgst || 0}
//                     </td>
//                     <td style={{ border: "1px solid black", padding: "8px" }}>
//                       {item.total || 0}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>

//               {/* Footer with calculated totals */}
//               <thead>
//                 <tr
//                   style={{
//                     borderBottom: "2px solid black",
//                     backgroundColor: "#f5f5f5",
//                   }}
//                 >
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     Sr
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     Basic Amount: {totals.basicAmount?.toFixed(2) || "0.00"}
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     OTY:
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     C/S 0
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     PCS ={" "}
//                     {billing.reduce(
//                       (acc, item) => acc + (item.qty || 0) + (item.Free || 0),
//                       0
//                     )}
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     0
//                   </th>
//                   <th
//                     style={{ border: "1px solid black", padding: "8px" }}
//                   ></th>
//                   <th
//                     style={{ border: "1px solid black", padding: "8px" }}
//                   ></th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     {totals.sgst?.toFixed(2) || "0.00"}
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     {billing.amount || "0.00"}
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     {totals.basicAmount?.toFixed(2) || "0.00"}
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     {totals.sgst?.toFixed(2) || "0.00"}
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     {totals.cgst?.toFixed(2) || "0.00"}
//                   </th>
//                   <th style={{ border: "1px solid black", padding: "8px" }}>
//                     {finalAmount || totals.amount?.toFixed(2) || "0.00"}
//                   </th>
//                 </tr>
//               </thead>
//             </Table>
//           </div>

//           {/* Footer Section */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               padding: "16px",
//             }}
//           >
//             {/* Left section: Disclaimer */}
//             <div style={{ width: "48%", padding: "8px" }}>
//               <p style={{ marginBottom: "5px" }}>
//                 Goods once sold will not be taken back
//               </p>
//               <p style={{ marginBottom: "0" }}>
//                 Cheque bounce charges Rs. 500/-
//               </p>
//               <p style={{ marginBottom: "0" }}>Credit 7 Days Only/-</p>
//               <p style={{ marginBottom: "0" }}>
//                 Subject to Bhopal jusrisdiction/-
//               </p>
//               <p>E.&.O.E</p>
//             </div>

//             {/* Right section: Authorized Signatory */}
//             <div
//               style={{
//                 position: "relative",
//                 right: "21%",
//                 textAlign: "right",
//                 width: "20%",
//               }}
//             >
//               <p style={{ marginBottom: "0" }}>For ADARSH AGENCY</p>
//               <p style={{ marginTop: "60px", marginBottom: "0" }}>
//                 Authorized Signatory
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GenerateInvoice;

import React from "react";
import { Table } from "react-bootstrap";

const GenerateInvoice = () => {
  return (
    <div
      className="container my-2"
      style={{
        // background: "#fffbcf",
        //   border: "2px solid black",
        padding: "10px",
        // boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          border: "2px solid black",
          padding: "0",
          backgroundColor: "#fffbcf",
        }}
      >
        {/* Header Section */}
        <div
          className="text-center  "
          style={{
            borderBottom: "2px solid black",
            // backgroundColor: "#fff8e1",
            display: "col",
            justifyItems: "center",
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

        <div style={{}}>
          <div
            className="  p-3"
            style={{
              borderBottom: "2px solid black",
              boxSizing: "border-box",
              display: "flex",
              justifyItems: "center ",

              alignItems: "center",
            }}
          >
            {/* Left box */}
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
              <strong>To:</strong> M/S LALIT KIRANA CB
              <br />
              Near Kranti Ground, Chhindbad, Bhopal
              <br />
              <strong>GSTIN:</strong> 23XXXXX <br />
              <strong>number:</strong> 7566440707
            </div>

            {/* Right box */}
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
              <strong>Bill No:</strong> 2554
              <br />
              <strong>Date:</strong> 13/05/2025
              <br />
              <strong>Salesman:</strong> ANKT <br />
              <strong>number:</strong>9131855273
            </div>
          </div>

          {/* Main Items Table */}
          <div className="p-0">
            <Table
              bordered
              className="mb-0"
              style={{
                // border: "2px solid black",
                marginBottom: "0",
              }}
            >
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
                <tr>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    1
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    TOMATO KETCHUP CHOTU 90GM
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    21069099
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    15.00
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    10 Pcs
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    0
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    10.00
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    0
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    0
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    0
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    100.00
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    9.00
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    9.00
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    118.00
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
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
                    Basic Amount: 1837.62
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
                    129.86
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    25.63
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    1862.15
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    111.20
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    111.20
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    2084.55
                  </th>
                </tr>
              </thead>
            </Table>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              // border: "2px solid black",
              borderTop: "0",
              padding: "16px",
            }}
          >
            {/* Left section: Disclaimer */}
            <div style={{ width: "48%", border: "", padding: "8px" }}>
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

        {/* <div style={{display:"flex" }} className="p-0 ">
          <Table
            bordered
            className="mb-0"
            style={{
              border: "2px solid black",
              borderTop: "0",
              marginBottom: "0",
            }}
          >
            <tbody style={{display:"flex"}}>
              <tr>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    width: "48%",
                  }}
                >
                  <p style={{ marginBottom: "5px" }}>
                    Goods once sold will not be taken back
                  </p>
                  <p style={{ marginBottom: "0" }}>
                    Cheque bounce charges Rs. 500/-
                  </p>
                </td>
              </tr>
          <tr className="p-3 text-end" style={{ border: "2px solid black" }}>
          <p style={{ marginBottom: "0" }}>For ADARSH AGENCY</p>
          <p style={{ marginTop: "50px", marginBottom: "0" }}>
            Authorized Signatory
          </p>
        </tr>
             
            </tbody>
          </Table>
        </div> */}
      </div>
    </div>
  );
};

export default GenerateInvoice;
