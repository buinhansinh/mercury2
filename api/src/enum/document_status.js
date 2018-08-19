Enum = require("enum");
dict = require("./dict");

// CAUTION: Never delete enum values and never change their order!
// Database keys are dependent on their order and changing them will break consistency

const DocumentStatus = new Enum([
  "COMPLETE",
  "CANCELED",
  "IN_PROGRESS",
]);

module.exports = DocumentStatus;
