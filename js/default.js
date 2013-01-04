// For an introduction to the Fixed Layout template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232508


var applicationData = Windows.Storage.ApplicationData.current;
var localSettings = applicationData.localSettings;
var tileCount;

(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var appModel = Windows.ApplicationModel;
    var search = Windows.ApplicationModel.Search;
    var shareOperation;
    var dt = Windows.ApplicationModel.DataTransfer;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());
        }

        // Add the search capabilities
        if (args.detail.kind === appModel.Activation.ActivationKind.search) {
            args.setPromise(ui.processAll().then(function () {
                if (!nav.location) {
                    nav.history.current = {
                        location: Application.navigator.home,
                        initialState: {}
                    };
                }

                return nav.navigate(
                    "/pages/search/searchResults.html",
                    { queryText: args.detail.queryText });
            }));
        }

        if (args.detail.kind === appModel.Activation.ActivationKind.shareTarget) {
            args.setPromise(WinJS.UI.processAll());
        }

        // add Orientation listening
        var dispProp = Windows.Graphics.Display.DisplayProperties;
        dispProp.addEventListener("orientationchanged", updateDisplayOrientation, false);

        // add Sharing
        var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
        dataTransferManager.addEventListener("datarequested", dataRequested);

        shareOperation = args.detail.shareOperation;

        WinJS.Application.addEventListener("shareready", shareReady, false);
        WinJS.Application.queueEvent({ type: "shareready" });
    };

    app.onready = function () {
        getLocalSettings();

        UpdatePrimaryTile("App Run Number: " + tileCount, "ms-appx:///images/widelogo.png", "blank wide");
        sendToast("My test toast!", "App Run Number: " + tileCount, "ms-appx:///images/widelogo.png", "blank wide");
        sendToast("My test toast!", "App Run Number: " + tileCount, "ms-appx:///images/widelogo.png", "blank wide", "ms-winsoundevent:Notification.IM");
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().

        app.sessionState.history = nav.history;

        saveLocalSettings();
    };

    search.SearchPane.getForCurrentView().onquerysubmitted = function (args) {
        nav.navigate("/pages/search/searchResults.html", args);
    };

    app.start();
})();

function saveLocalSettings() {
    localSettings.values["tileCount"] = tileCount+1;
}

function getLocalSettings() {
    tileCount = tryParseInt(localSettings.values["tileCount"], 0);
}

function updateDisplayOrientation() {
    switch (Windows.Graphics.Display.DisplayProperties.currentOrientation) {

        case Windows.Graphics.Display.DisplayOrientations.landscape:
            // do something
            break;

        case Windows.Graphics.Display.DisplayOrientations.portrait:
            // do something
            break;

        case Windows.Graphics.Display.DisplayOrientations.landscapeFlipped:
            // do something
            break;

        case Windows.Graphics.Display.DisplayOrientations.portraitFlipped:
            // do something
            break;

        default:
            // do something
            break;
    }
}

function dataRequested(e) {
    var request = e.request;

    request.data.properties.title = "Windows8JSUltimateTemplate Sharing";

    request.data.properties.description = "Check out the Windows8JSUltimateTemplate!";

    request.data.setText("Windows8JSUltimateTemplate is awesome!");
}

function shareReady(args) {
    if (typeof(shareOperation) != "undefined" && shareOperation.data.contains(dt.StandardDataFormats.uri)) {
        shareOperation.data.getUriAsync().done(function (uri) {
            document.querySelector("#results").innerText =
                "Uri: " + uri.absoluteUri;
        });
    }
}

function tryParseInt(str,defaultValue){
    var retValue = defaultValue;

    if(typeof str != "undefined" && str!=null){
        if (!isNaN(str)){
            retValue = parseInt(str);
        }
    }

    return retValue;
}