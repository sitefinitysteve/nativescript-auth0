var vmModule = require("./main-view-model");
function pageNavigatedTo(args) {
    var page = args.object;
    var broker = vmModule.mainViewModel;
    page.bindingContext = broker;
    broker.executeTestRun();
}
exports.pageNavigatedTo = pageNavigatedTo;
