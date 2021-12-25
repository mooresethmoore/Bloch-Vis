var checkedArray = [];

function checkArray(id) {
    if (document.getElementById(id).checked == true) {
        checkedArray.push(id)
        console.log(checkedArray)
        if (checkedArray.length > 2) {
            idPopped = checkedArray.pop();
            alert("Please only check 2 boxes.");
            document.getElementById(idPopped).checked = false;
        }
        if (checkedArray.length == 2) {
            document.getElementById("button").setAttribute("href", "compare/" + checkedArray[0] + ',' + checkedArray[1]);
        }
    } else {
        if (checkedArray.length == 1) {
            checkedArray = []
        } else {
            checkedArray = jQuery.grep(checkedArray, function (value) { return value != id })
        }

    }
}
var simCheckedArray = [];
function simCheckArray(id) {
    if (document.getElementById(id).checked == true) {
        simCheckedArray.push(id)

        if (simCheckedArray.length > 1) {
            idPopped = simCheckedArray.pop();
            alert("Please only check one boxes.");
            document.getElementById(idPopped).checked = false;
        }
        if (simCheckedArray.length == 1) {
            document.getElementById("button").setAttribute("href", "displaySim/" + simCheckedArray[0]);
        }

    } else {
        if (simCheckedArray.length == 1) {
            simCheckedArray = []
        } else {
            simCheckedArray = jQuery.grep(simCheckedArray, function (value) { return value != id })
        }

    }
    console.log(simCheckedArray)
}
