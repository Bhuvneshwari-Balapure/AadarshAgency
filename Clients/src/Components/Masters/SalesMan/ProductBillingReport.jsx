import React from "react";

const ProductBillingReport = () => {
  const employees = [
    {
      ItemName: "More Light Surf 1KG 24",
      HSNCode: 5834758934,
      Packing: 1,
      Qty: 108,
      Unit: "PC",
      Free: 0,
      MRP: 10.0,
      Basic: 7.844,
      Rate: 9.26,
      Sch: 14.54,
      SchAmt: 118.65,
      CD: 0.0,
      GST: 18.0,
      CESS: 0.0,
      Amount: 860.08,
    },
    {
      ItemName: "Desi Andaz Mong Sada 200GM",
      HSNCode: 495834095,
      Packing: 5,
      Qty: 1,
      Unit: "KG",
      Free: 0,
      MRP: 69.0,
      Basic: 210.0,
      Rate: 210.0,
      Sch: 0.0,
      SchAmt: 0.0,
      CD: 7.8,
      GST: 0.0,
      CESS: 0.0,
      Amount: 1260.0,
    },
  ];

  const fields = [
    "ItemName",
    "HSNCode",
    "Packing",
    "Qty",
    "Unit",
    "Free",
    "MRP",
    "Basic",
    "Rate",
    "Sch",
    "SchAmt",
    "CD",
    "GST",
    "CESS",
    "Amount",
  ];

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
      <h2 className="mb-4 text-center" style={{ color: "#2c3e50" }}>
        Product Billing Records
      </h2>

      <div className="table-responsive">
        <table
          className="table table-bordered table-hover align-middle text-center"
          style={{
            border: "2px solid #dee2e6",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead style={{ backgroundColor: "gray ", color: "white" }}>
            <tr>
              {fields.map((field, index) => (
                <th
                  key={index}
                  style={{
                    border: "1px solid #495057",
                    padding: "12px",
                    verticalAlign: "middle",
                    background: "#D3D3D3",
                  }}
                >
                  {field}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, empIndex) => (
              <tr
                key={empIndex}
                style={{
                  backgroundColor: empIndex % 2 === 0 ? "#f8f9fa" : "white",
                }}
              >
                {fields.map((field, fieldIndex) => (
                  <td
                    key={fieldIndex}
                    style={{
                      border: "1px solid #dee2e6",
                      padding: "10px",
                      textAlign: "left",
                      verticalAlign: "middle",
                    }}
                  >
                    {employee[field] !== undefined ? employee[field] : "NA"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="mt-4 p-3"
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: "5px",
          border: "1px solid #dee2e6",
        }}
      >
        <h4 style={{ color: "#2c3e50" }}>Total Items: {employees.length}</h4>
        <p className="text-muted">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProductBillingReport;
