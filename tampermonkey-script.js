// ==UserScript==
// @name         USGA Coggins
// @namespace    https://foundationequine.com
// @version      0.1
// @description  Add AutoFill and PDF Download functionality to USGS Website using TamperMonkey Browser Extension
// @author       You
// @match        https://vsapps.aphis.usda.gov/vsps/*
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// ==/UserScript==

waitForKeyElements = (
    selectorTxt,    // Required: The jQuery selector string that specifies the desired element(s).
    actionFunction, // Required: The code to run when elements are found. It is passed a jNode to the matched element.
    doWaitOnce,      // Optional: If false, will continue to scan for new elements even after the first match is found.
    iframeSelector  // Optional: If set, identifies the iframe to search.
) => {
    var targetNodes, didFindTargets;

    if (typeof iframeSelector == "undefined") {
        targetNodes = $(selectorTxt);
    }
    else {
        targetNodes = $(iframeSelector)
                        .contents()
                        .find(selectorTxt);
    }

   if (targetNodes  &&  targetNodes.length > 0) {
        didFindTargets = true;

        // Found target node(s).  Go through each and act if they are new.
        targetNodes.each ( function () {
            var $this = $(this);
            var alreadyFound = $this.data('alreadyFound') || false;

            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound = actionFunction($this);

                if (cancelFound)
                    didFindTargets = false;
                else
                    $this.data ('alreadyFound', true);
            }
        } );
    }
    else {
        didFindTargets   = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj = waitForKeyElements.controlObj || {};
    var controlKey = selectorTxt.replace(/[^\w]/g, "_");
    var timeControl = controlObj[controlKey];

    //--- Now set or clear the timer as appropriate.
    if (didFindTargets && doWaitOnce && timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval(timeControl);
        delete controlObj[controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if (!timeControl) {
            timeControl = setInterval (function () {
                    waitForKeyElements(selectorTxt, actionFunction, doWaitOnce, iframeSelector);
                },300);

            controlObj[controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj = controlObj;
};

GM_xmlhttpRequest({
  method : "GET",
  // from other domain than the @match one (.org / .com):
  url : "https://raw.githubusercontent.com/foundationequine/coggins/main/coggins.js",
  onload : (ev) =>
  {
      let e = document.createElement('script');
      e.setAttribute('type', 'text/javascript');
      e.innerHTML = ev.responseText;
      document.body.appendChild(e);

      runCogginsScript();
  }
});
