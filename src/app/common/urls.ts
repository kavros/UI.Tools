const URI = "http://localhost:8080";
const ORDERS_URI = "https://localhost:44341"

export const APIs = {
  getMappings: URI + "/getMappings",
  deleteMapping: URI + "/deleteMapping",
  addOrUpdateRule: URI + "/addOrUpdateRule",
  deleteRule: URI + "/deleteRule",
  getRulesTable: URI + "/getRulesTable",
  getSName: URI + "/getSName/",
  saveStepperDialogData: URI + "/saveStepperDialogData",
  getStepperDialogData: URI + "/getStepperDialogData/",
  downloadLabels: URI + "/downloadLabels",
  downloadHistoryDoc: URI + "/downloadHistoryDoc",
  import: URI + "/import",
  updatePrices: URI + "/updatePrices",
};

export const OrdersAPIs = {
    getSuppliers: ORDERS_URI + "/Kefalaio/GetSuppliers",
    getOrder:  ORDERS_URI + "/Kefalaio/GetOrder"
};
