import { environment } from "src/environments/environment";

const URI = environment.URI;
const ORDERS_URI =  environment.ORDERS_URI;

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
    getSuppliers: ORDERS_URI + "/Orders/GetSuppliers",
    getOrder:  ORDERS_URI + "/Orders/GetOrder"
};
