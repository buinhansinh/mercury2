Enum = require("enum");
dict = require("./dict");

// CAUTION: Never delete enum values and never change their order!
// Database keys are dependent on their order and changing them will break consistency

const DocumentType = new Enum([
  "SALES_ORDER",
  "PURCHASE_ORDER",
  "INVENTORY_RELEASE",
  "INVENTORY_RECEIPT",
  "INVENTORY_LOCATION_TRANSFER",
  "INVENTORY_ADJUSTMENT",
  "COLLECTION",
  "DISBURSEMENT",
  "EXPENSE",
]);

module.exports = DocumentType;
