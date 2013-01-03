(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;
    var app = WinJS.Application;
    var ui = WinJS.UI;


    ui.Pages.define("/pages/settings/helpFlyout.html", {
        ready: function (element, options) {
            document.getElementById("help").addEventListener("afterhide", afterSettingsHide, false);
        },
        unload: function () {
            document.getElementById("help").removeEventListener("afterhide", afterSettingsHide);
        }
    });

    function afterSettingsHide() {
    };
})();