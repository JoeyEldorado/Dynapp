$(document).ready(function () {

    // Once document DOM is loaded, make Ajax framework run the 'itsAjaxTime' function every 5 seconds in the background
    setInterval(function () {
        itsAjaxTime();
    }, 5000);


    // Catch click event for button with id=btn1 and do something
    $("#btn1").click(function () {
        $(".phide").css('display', 'inline');;
    });

    // Get the browser cookie handling by calling function getCookieEnabled()
    getCookieEnabled();

    // Catch submit event from form  and do something
    $("#DBInsertRecord").submit(function (event) {

        // Prevent default posting of form - put here to work in case of errors
        event.preventDefault();

        // setup some local variables
        var $form = $(this);

        // Let's select and cache all the fields
        var $inputs = $form.find("input");

        // Serialize the data in the form
        var serializedData = $form.serialize();

        // Call function that will forward DB record with Ajax to PHP form
        insertDBRecord(serializedData);

    });


});

// Self-invoked (inner) functon for encapsulating a counter (Javascript closure example)
// The counter reflects the number of Ajax background calls
var add = (function () {
    var counter = 0;
    return function () { return counter += 1; }
})();


// This function is called periodically in the background and sets:
//  - a counter on the HTML page counting the number of background Ajax calls
//  - a message to the console log containing the same counter value
function itsAjaxTime() {
    counter = add();
    $("#counter").val(counter);
    console.log("Ajax was started: " + counter + " times.");
    //   window.alert("Ajax was started: " + counter + " times.");
};


// This function clears the geocode results received from the Google geocode REST API call
function clearGeocode() {

    $("#dmessage").attr("class", "pmessage");
    $("#pmessage").fadeIn("10000");
    $("#pmessage").fadeOut("10000");
    $(".phide").attr("class", "pshow");

    var count = $(".presult").length;

    while (count >= 0) {
        $(".presult").css('display', 'none');
        count -= 1;
    }

}


// This function determines whether the browser accepts cookies or not
function getCookieEnabled() {
    $("#cookie").text("Cookies enabled: " + navigator.cookieEnabled);
}


// This function asynchronously gets data from the MariaDB database
function getDBData() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("DBShowData").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET", "getDBData.php", true);
    xmlhttp.send();
}


function insertDBRecord(DBRecord) {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("DBInsertData").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("POST", "insertDBData.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(DBRecord);
}


// This function asynchronously calls the Google Geocode REST API
function getGeocodes(location) {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("geo_results").innerHTML = this.responseText;
        }
    };
    //Send the proper header information along with the request
    xmlhttp.open("GET", "geocode.php?location=" + location, true);
    xmlhttp.send();
}


/* function addNewLatitudes(data) {
    $.each(data.results, function (index, geocode) {
            var lat = $('<p id="lat"' +
                geocode.['geometry']['location']['lat']. +
                '" src="' + image.images.low_resolution.url +
                '" alt=""/><br/>');
            lat.hide().prependTo('#results').fadeIn(2000);
    });
}
*/
