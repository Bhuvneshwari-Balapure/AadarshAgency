// import React, { useEffect, useState } from "react";
// import axios from "../../../Config/axios";
// import Select from "react-select";

// const defaultRow = {
//   product: null,
//   Qty: "",
//   Unit: "",
//   Free: "",
//   Basic: "",
//   Rate: "",
//   Sch: "",
//   SchAmt: "",
//   CD: "",
//   CDAmt: "",
//   Total: "",
//   GST: "",
//   Amount: 0,
// };

// const ProductBillingReport = ({ onBillingDataChange }) => {
//   const [rows, setRows] = useState([{ ...defaultRow }]);
//   const [products, setProducts] = useState([]);
//   const [rowData, setRowData] = useState([]);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("/product");
//       setProducts(res.data);
//     } catch (error) {
//       console.error("Failed to fetch products", error);
//     }
//   };

//   const fields = [
//     "ItemName",
//     "Qty",
//     "Unit",
//     "Free",
//     "Basic",
//     "Rate",
//     "Sch",
//     "SchAmt",
//     "CD",
//     // "CDAmt",
//     "Total",
//     "GST",
//     "Amount",
//   ];

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const calculateAmountWithGST = (total, qty, gstPercent) => {
//     const t = parseFloat(total);
//     const q = parseFloat(qty);
//     const gst = parseFloat(gstPercent);

//     if (isNaN(t) || isNaN(q)) return 0;
//     if (isNaN(gst) || gst <= 0) return t * q;

//     const gstAmount = t + gst / 100;
//     return gstAmount * q;
//   };

//   const recalculateRow = (row) => {
//     const rate = parseFloat(row.Rate) || 0;
//     const schPercent = parseFloat(row.Sch) || 0;
//     const cdPercent = parseFloat(row.CD) || 0;
//     const qty = parseFloat(row.Qty) || 0;
//     const gstPercent = parseFloat(row.GST) || 0;

//     const schAmt = (rate * schPercent) / 100;
//     const cdAmt = (rate * cdPercent) / 100;

//     const total = rate - schAmt - cdAmt;
//     const amount = calculateAmountWithGST(total, qty, gstPercent);

//     return {
//       ...row,
//       SchAmt: schAmt.toFixed(2),
//       CDAmt: cdAmt.toFixed(2),
//       Total: total.toFixed(2),
//       Amount: amount.toFixed(2),
//     };
//   };

//   const handleChange = (index, field, value) => {
//     const updatedRows = [...rows];
//     let row = { ...updatedRows[index], [field]: value };

//     if (field === "product") {
//       row.product = value;
//       row.GST = value.gstPercent || "";
//       row.Unit = value.primaryUnit;
//       row.Rate = value.primaryPrice;
//     }

//     if (field === "Unit" && row.product) {
//       const prod = row.product;
//       if (value === prod.primaryUnit) {
//         row.Rate = prod.primaryPrice;
//       } else if (value === prod.secondaryUnit) {
//         row.Rate = prod.secondaryPrice;
//       }
//     }

//     if (field === "Qty" && row.product) {
//       const qtyNum = parseFloat(value);
//       const prod = row.product;
//       if (!isNaN(qtyNum) && qtyNum > 0) {
//         if (row.Unit === prod.primaryUnit) {
//           row.Rate = prod.primaryPrice;
//         } else if (row.Unit === prod.secondaryUnit) {
//           row.Rate = prod.secondaryPrice;
//         }
//       }
//     }

//     row = recalculateRow(row);

//     updatedRows[index] = row;
//     setRows(updatedRows);
//   };

//   const handleKeyDown = (e, rowIndex) => {
//     if (e.altKey && e.key === "n") {
//       e.preventDefault();
//       if (rowIndex === rows.length - 1) {
//         setRows([...rows, { ...defaultRow }]);
//       }
//     }

//     if (e.key === "Delete" && rows.length > 1) {
//       e.preventDefault();
//       setRows(rows.filter((_, i) => i !== rowIndex));
//     }

//     if (e.key === "Enter") {
//       e.preventDefault();
//       const currentRow = rows[rowIndex];
//       const simplifiedRow = {
//         productName: currentRow.product?.productName,
//         categoryName: currentRow.product?.categoryName,
//         unit: currentRow.Unit,
//         qty: currentRow.Qty,
//         rate: currentRow.Rate,
//         sch: currentRow.Sch,
//         schAmt: currentRow.SchAmt,
//         cd: currentRow.CD,
//         cdAmt: currentRow.CDAmt,
//         total: currentRow.Total,
//         gst: currentRow.GST,
//         amount: currentRow.Amount,
//       };
//       const newData = [...rowData, simplifiedRow];
//       setRowData(newData);
//       onBillingDataChange(newData);
//     }
//   };

//   return (
//     <div
//       className="mt-4"
//       style={{
//         width: "100vw",
//         padding: "0 1rem",
//         position: "relative",
//         left: "50%",
//         transform: "translateX(-50%)",
//       }}
//     >
//       <h2 className="text-center mb-4">Product Invoice</h2>
//       <div className="mt-3 p-3 bg-light border rounded">
//         <h5>Total Items: {rows.length}</h5>
//         <p className="text-muted mb-0">
//           <strong>Shortcuts:</strong>{" "}
//           <span className="me-3">
//             <strong>New Line:</strong> Alt + N
//           </span>
//           <span>
//             <strong>Save:</strong> Enter
//           </span>
//         </p>
//       </div>

//       <div className="table-responsive" style={{ overflow: "visible" }}>
//         <table
//           className="table table-bordered table-hover text-center"
//           style={{
//             border: "2px solid #dee2e6",
//             borderRadius: "8px",
//             overflow: "hidden",
//           }}
//         >
//           <thead className="table-secondary">
//             <tr>
//               {fields.map((field, idx) => (
//                 <th key={idx}>
//                   {field === "Sch" ? "Sch%" : field === "CD" ? "CD%" : field}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((row, rowIndex) => (
//               <tr key={rowIndex} onKeyDown={(e) => handleKeyDown(e, rowIndex)}>
//                 {fields.map((field, colIndex) => (
//                   <td key={colIndex}>
//                     {field === "ItemName" ? (
//                       <Select
//                         className="w-100"
//                         options={products.map((p) => ({
//                           label: `${p.productName} (${p.categoryName})`,
//                           value: p._id,
//                         }))}
//                         value={
//                           row.product
//                             ? {
//                                 label: `${row.product.productName} (${row.product.categoryName})`,
//                                 value: row.product._id,
//                               }
//                             : null
//                         }
//                         onChange={(selectedOption) => {
//                           const selectedProduct = products.find(
//                             (p) => p._id === selectedOption.value
//                           );
//                           handleChange(rowIndex, "product", selectedProduct);
//                         }}
//                         menuPortalTarget={document.body}
//                         styles={{
//                           menuPortal: (base) => ({ ...base, zIndex: 9999 }),
//                           container: (base) => ({ ...base, minWidth: "200px" }),
//                         }}
//                       />
//                     ) : field === "Unit" ? (
//                       <select
//                         className="form-control"
//                         value={row.Unit}
//                         onChange={(e) =>
//                           handleChange(rowIndex, "Unit", e.target.value)
//                         }
//                       >
//                         <option value="">Select Unit</option>
//                         {row.product?.primaryUnit && (
//                           <option value={row.product.primaryUnit}>
//                             {row.product.primaryUnit}
//                           </option>
//                         )}
//                         {row.product?.secondaryUnit && (
//                           <option value={row.product.secondaryUnit}>
//                             {row.product.secondaryUnit}
//                           </option>
//                         )}
//                       </select>
//                     ) : ["SchAmt", "CDAmt", "Total"].includes(field) ? (
//                       <input
//                         type="number"
//                         className="form-control"
//                         value={row[field]}
//                         readOnly
//                       />
//                     ) : (
//                       <input
//                         type="text"
//                         className="form-control"
//                         value={row[field] || ""}
//                         onChange={(e) =>
//                           handleChange(rowIndex, field, e.target.value)
//                         }
//                       />
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductBillingReport;
import React, { useEffect, useState } from "react";
import axios from "../../Config/axios";
import Select from "react-select";

const defaultRow = {
  product: null,
  Qty: "",
  Unit: "",
  Free: "",
  Basic: "",
  Rate: "",
  Sch: "",
  SchAmt: "",
  CD: "",
  CDAmt: "",
  Total: "",
  GST: "",
  Amount: 0,
};

const ProductBillingReport = ({ onBillingDataChange }) => {
  const [rows, setRows] = useState([{ ...defaultRow }]);
  const [products, setProducts] = useState([]);
  const [finalTotalAmount, setFinalTotalAmount] = useState("0.00");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/product");
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const fields = [
    "ItemName",
    "Qty",
    "Unit",
    "Free",
    "Basic",
    "Rate",
    "Sch",
    "SchAmt",
    "CD",
    "CDAmt",
    "Total",
    "GST",
    "Amount",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  // Calculate amount including GST
  const calculateAmountWithGST = (total, qty, gstPercent) => {
    const t = parseFloat(total);
    const q = parseFloat(qty);
    const gst = parseFloat(gstPercent);

    if (isNaN(t) || isNaN(q)) return 0;
    if (isNaN(gst) || gst <= 0) return t * q;

    // Correct GST calculation: total + (gst% of total)
    const gstAmount = t + gst / 100;
    return gstAmount * q;
  };

  // Recalculate derived fields for a row
  const recalculateRow = (row) => {
    const rate = parseFloat(row.Rate) || 0;
    const schPercent = parseFloat(row.Sch) || 0;
    const cdPercent = parseFloat(row.CD) || 0;
    const qty = parseFloat(row.Qty) || 0;
    const gstPercent = parseFloat(row.GST) || 0;

    const schAmt = (rate * schPercent) / 100;
    const cdAmt = (rate * cdPercent) / 100;

    // Your requested formula:
    const total = rate - schAmt - cdAmt;

    const amount = calculateAmountWithGST(total, qty, gstPercent);

    return {
      ...row,
      SchAmt: schAmt.toFixed(2),
      CDAmt: cdAmt.toFixed(2),
      Total: total.toFixed(2),
      Amount: amount.toFixed(2),
    };
  };

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    let row = { ...updatedRows[index], [field]: value };

    if (field === "product") {
      row.product = value;
      row.GST = value.gstPercent || "";
      row.Unit = value.primaryUnit || "";
      row.Rate = value.primaryPrice || "";
    }

    if (field === "Unit" && row.product) {
      const prod = row.product;
      if (value === prod.primaryUnit) {
        row.Rate = prod.primaryPrice;
      } else if (value === prod.secondaryUnit) {
        row.Rate = prod.secondaryPrice;
      }
    }

    if (field === "Qty" && row.product) {
      const qtyNum = parseFloat(value);
      const prod = row.product;
      if (!isNaN(qtyNum) && qtyNum > 0) {
        if (row.Unit === prod.primaryUnit) {
          row.Rate = prod.primaryPrice;
        } else if (row.Unit === prod.secondaryUnit) {
          row.Rate = prod.secondaryPrice;
        }
      }
    }

    row = recalculateRow(row);

    updatedRows[index] = row;
    setRows(updatedRows);

    // 👇 Now correctly compute FinaltotalAmount here:
    const finalTotal = updatedRows
      .reduce((sum, r) => {
        const amt = parseFloat(r.Amount);
        return sum + (isNaN(amt) ? 0 : amt);
      }, 0)
      .toFixed(2);

    setFinalTotalAmount(finalTotal);

    // Filter and send data upwards
    const filteredBillingData = updatedRows
      .filter(
        (r) =>
          r.product !== null &&
          r.Qty !== "" &&
          !isNaN(parseFloat(r.Qty)) &&
          parseFloat(r.Qty) > 0
      )
      .map((r) => ({
        productName: r.product.productName,
        categoryName: r.product.categoryName,
        hsnCode: r.product.hsnCode, // <-- Add this line
        unit: r.Unit,
        qty: parseFloat(r.Qty),
        rate: parseFloat(r.Rate),
        sch: parseFloat(r.Sch) || 0,
        schAmt: parseFloat(r.SchAmt) || 0,
        cd: parseFloat(r.CD) || 0,
        cdAmt: parseFloat(r.CDAmt) || 0,
        total: parseFloat(r.Total) || 0,
        gst: parseFloat(r.GST) || 0,
        amount: parseFloat(r.Amount) || 0,
      }));

    onBillingDataChange(filteredBillingData, finalTotal);
    console.log(finalTotal, "final amount");
  };

  // Handle keyboard shortcuts for new line and delete
  const handleKeyDown = (e, rowIndex) => {
    if (e.altKey && e.key === "n") {
      e.preventDefault();
      if (rowIndex === rows.length - 1) {
        setRows([...rows, { ...defaultRow }]);
      }
    }

    if (e.key === "Delete" && rows.length > 1) {
      e.preventDefault();
      const updatedRows = rows.filter((_, i) => i !== rowIndex);
      setRows(updatedRows);

      // Also update parent after deletion
      const filteredBillingData = updatedRows
        .filter(
          (r) =>
            r.product !== null &&
            r.Qty !== "" &&
            !isNaN(parseFloat(r.Qty)) &&
            parseFloat(r.Qty) > 0
        )
        .map((r) => ({
          productName: r.product.productName,
          categoryName: r.product.categoryName,
          unit: r.Unit,
          qty: parseFloat(r.Qty),
          rate: parseFloat(r.Rate),
          sch: parseFloat(r.Sch) || 0,
          schAmt: parseFloat(r.SchAmt) || 0,
          cd: parseFloat(r.CD) || 0,
          cdAmt: parseFloat(r.CDAmt) || 0,
          total: parseFloat(r.Total) || 0,
          gst: parseFloat(r.GST) || 0,
          amount: parseFloat(r.Amount) || 0,
        }));
      const recalculatedFinalTotal = updatedRows
        .reduce((sum, r) => {
          const amt = parseFloat(r.Amount);
          return sum + (isNaN(amt) ? 0 : amt);
        }, 0)
        .toFixed(2);

      setFinalTotalAmount(recalculatedFinalTotal);
      onBillingDataChange(filteredBillingData, recalculatedFinalTotal);
    }
  };

  return (
    <div
      className="mt-4"
      style={{
        width: "100vw",
        padding: "0 1rem",
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <h2 className="text-center mb-4">Product Invoice</h2>
      <div className="mt-3 p-3 bg-light border rounded">
        <h5>Total Items: {rows.length}</h5>
        <div className="d-flex align-items-center gap-4 text-muted mb-0">
          <strong>Shortcuts:</strong>
          <div className="d-flex align-items-center gap-3">
            <span>
              <strong>New Line:</strong> Alt + N
            </span>
            <span>
              <strong>Save Row:</strong> Enter
            </span>
            <span>
              <strong>Delete Row:</strong> Delete
            </span>
          </div>
        </div>
      </div>

      <div className="table-responsive" style={{ overflow: "visible" }}>
        <table
          className="table table-bordered table-hover text-center"
          style={{
            border: "2px solid #dee2e6",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead className="table-secondary">
            <tr>
              {fields.map((field, idx) => (
                <th key={idx}>
                  {field === "Sch"
                    ? "Sch%"
                    : field === "CD"
                    ? "CD%"
                    : field === "CDAmt"
                    ? "CD Amt"
                    : field}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} onKeyDown={(e) => handleKeyDown(e, rowIndex)}>
                {fields.map((field, colIndex) => (
                  <td key={colIndex}>
                    {field === "ItemName" ? (
                      <Select
                        className="w-100"
                        options={products.map((p) => ({
                          label: `${p.productName} (${p.categoryName})`,
                          value: p._id,
                        }))}
                        value={
                          row.product
                            ? {
                                label: `${row.product.productName} (${row.product.categoryName})`,
                                value: row.product._id,
                              }
                            : null
                        }
                        onChange={(selectedOption) => {
                          const selectedProduct = products.find(
                            (p) => p._id === selectedOption.value
                          );
                          handleChange(rowIndex, "product", selectedProduct);
                        }}
                        menuPortalTarget={document.body}
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          container: (base) => ({ ...base, minWidth: "200px" }),
                        }}
                      />
                    ) : field === "Unit" ? (
                      <select
                        className="form-control"
                        value={row.Unit}
                        onChange={(e) =>
                          handleChange(rowIndex, "Unit", e.target.value)
                        }
                      >
                        <option value="">Select Unit</option>
                        {row.product?.primaryUnit && (
                          <option value={row.product.primaryUnit}>
                            {row.product.primaryUnit}
                          </option>
                        )}
                        {row.product?.secondaryUnit && (
                          <option value={row.product.secondaryUnit}>
                            {row.product.secondaryUnit}
                          </option>
                        )}
                      </select>
                    ) : ["SchAmt", "CDAmt", "Total", "Amount"].includes(
                        field
                      ) ? (
                      <input
                        type="number"
                        className="form-control"
                        value={row[field]}
                        readOnly
                      />
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        value={row[field] || ""}
                        onChange={(e) =>
                          handleChange(rowIndex, field, e.target.value)
                        }
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {/* Final total amount row */}
            <tr style={{ fontWeight: "bold", backgroundColor: "#f8f9fa" }}>
              <td colSpan={fields.length - 1} className="text-end">
                Final Amount
              </td>
              <td>{finalTotalAmount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductBillingReport;
