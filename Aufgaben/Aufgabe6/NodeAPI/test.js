"use strict";
var Aufgabe6;
(function (Aufgabe6) {
    console.log("Hallo");
    let x = 0;
    console.log(x);
    x++;
    console.warn(x);
    setTimeout(handlesTimeout, 2000);
    function handleTimeout(_event) {
        console.log("Timeout");
    }
})(Aufgabe6 || (Aufgabe6 = {}));
//# sourceMappingURL=test.js.map