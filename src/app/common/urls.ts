const URI = "http://localhost:8080";
//const URI = "http://apigroceries-env.eba-23pirhv2.eu-west-1.elasticbeanstalk.com";

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
    updatePrices: URI + "/updatePrices"
} 