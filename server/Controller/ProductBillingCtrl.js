const Invoice = require("../Models/BillingModel");

const createBilling = async (req, res) => {
  console.log(req.body, "create Billing");
  try {
    const { customer, billing, finalAmount, companyId, salesmanId } = req.body;

    const invoice = new Invoice({
      companyId,
      salesmanId,
      customer,
      billing,
      finalAmount,
    });

    await invoice.save();
    res.status(201).json({ message: "Invoice saved successfully", invoice });
  } catch (error) {
    console.error("Error saving invoice:", error);
    res.status(500).json({ error: "Failed to save invoice" });
  }
};

// GET /api/billing
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .sort({ createdAt: -1 })
      .populate(
        "companyId",
        "name contactPerson designation city address mobile alternateMobile email whatsapp gstNumber"
      )
      .populate(
        "salesmanId",
        "name designation mobile email city address alternateMobile photo username"
      );

    // console.log(invoices, "invoice");
    res.status(200).json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
};

// ✅ DELETE /pro-billing/:id
const deleteInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Invoice.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    res.status(500).json({ error: "Failed to delete invoice" });
  }
};
// GET /api/pro-billing/:id
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate(
        "companyId",
        "name contactPerson designation city address mobile alternateMobile email whatsapp gstNumber"
      )
      .populate(
        "salesmanId",
        "name designation mobile email city address alternateMobile photo username"
      );
    // ✅ Add this

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json(invoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ error: "Failed to fetch invoice" });
  }
};

module.exports = {
  createBilling,
  getAllInvoices,
  deleteInvoice, // 👈 export it
  getInvoiceById,
};
