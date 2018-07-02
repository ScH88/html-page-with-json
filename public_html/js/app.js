$(document).ready(function () {
    //Variable for storing an array of holidays/object
    var $holidaysAvailable = [];
    //Retrieve the "holidays" json file from the assets directory, then call a function upon retrieval
    $.getJSON('assets/holidays.json', function (json) {
        //For each array in the json file, call a function storing a key and value
        $.each(json, function (key, val) {
            //For each "holiday" object in the current object
            for (var i = 0; i < val.length; i++) {
                //Push the following object to the holidaysAvailable array, containing the following variables
                $holidaysAvailable.push({
                    //Store the current holiday's id value as a local variable called "id"
                    id: val[i].id,
                    //Store the current holiday's hotelName value as a local variable called "hotelName"
                    hotelName: val[i].hotelName,
                    //Now scan the current holiday's "location" array
                    location: {
                        //Retrieve the "city" value from the current holiday's "location" array, then store as "city"
                        city: val[i].location.city,
                        //Retrieve the "city" value from the current holiday's "country" array, then store as "country"
                        country: val[i].location.country
                    },
                    //Store the current holiday's starRating value as a local variable called "starRating"
                    starRating: val[i].starRating,
                    //Store the current holiday's price value as a local variable called "price"
                    price: val[i].price,
                    //Store the current holiday's image value as a local variable called "image"
                    image: val[i].image,
                    //Now scan the current holiday's "startDate" array
                    startDate: {
                        //Retrieve the "day" value from the current holiday's "startDate" array, then store as "day"
                        day: val[i].startDate.day,
                        //Retrieve the "month" value from the current holiday's "startDate" array, then store as "month"
                        month: val[i].startDate.month,
                        //Retrieve the "year" value from the current holiday's "startDate" array, then store as "year"
                        year: val[i].startDate.year
                    },
                    //Store the current holiday's days value as a local variable called "days"
                    days: val[i].days,
                    //Store the current holiday's departFrom value as a local variable called "departFrom"
                    departFrom: val[i].departFrom,
                    //Now scan the current holiday's "passengers" array
                    passengers: {
                        //Retrieve the "adults" value from the current holiday's "passengers" array, then store as "adults"
                        adults: val[i].passengers.adults,
                        //Retrieve the "children" value from the current holiday's "passengers" array, then store as "children"
                        children: val[i].passengers.children,
                        //Retrieve the "infants" value from the current holiday's "passengers" array, then store as "infants"
                        infants: val[i].passengers.infants
                    },
                    //Store the current holiday's details value as a local variable called "details"
                    details: val[i].details
                });
            }
        });
    //Now add a function to call once all json entities have been parsed
    }).done(function () {
        //Variable for the order of which to sort the holidays
        var sortOrder;
        //Function for rendering each entry
        function renderEntries() {
            //For each holiday array in holidaysAvailable
            $holidaysAvailable.forEach(function (holiday) {
                //Create a div object of class "holidayEntry"
                var $div = $('<div class="holidayEntry"></div>');
                //Set the css of the div, setting it's background image and size, width, minimum height...
                //...margins, padding, position and overflow
                $div.css({'background-image': 'url(' + holiday.image + ')',
                    'width': '100%',
                    'min-height': '460px',
                    'background-repeat': 'no-repeat',
                    '-webkit-background-size': '100% 460px',
                    '-moz-background-size': '100% 460px',
                    '-o-background-size': '100% 460px',
                    'background-size': '100% 460px',
                    'margin-bottom': '50px',
                    'margin-left': '0px',
                    'margin-right': '0px',
                    'margin-top': '0px',
                    'padding': '0px',
                    'position': 'relative',
                    'overflow': 'auto'
                });
                //Create a div of class "row1" and set it's display, align and width css values
                var $divRow1 = $('<div class="row1"></div>').css({
                    'display': 'inline-flex',
                    'vertical-align': 'top',
                    'width': '100%'
                });
                //Create a div of class "row1names", setting it's width, height, background colour (transparent)...
                //...padding, text align and sizing css values
                var $divR1Pt1 = $('<div class="row1names"></div>').css({
                    'width': '75%',
                    'height': 'auto',
                    'background-color': 'rgba(212,240,255,0.9)',
                    'padding-left': '13px',
                    'padding-right': '20%',
                    'vertical-align': 'top',
                    'text-align': 'left',
                    '-webkit-box-sizing': 'border-box', /* Safari/Chrome, other WebKit */
                    '-moz-box-sizing': 'border-box', /* Firefox, other Gecko */
                    'box-sizing': 'border-box'         /* Opera/IE 8+ */
                });
                //Create a paragraph object of class "hotelName", setting it's colour, font size, overflow, word break...
                //...and hyphens css values
                var $text1 = $('<p><strong class="hotelName">' + holiday.hotelName + '</strong></p>').css({
                    'color': '#000080',
                    'font-size': '22px',
                    'overflow-wrap': 'break-all',
                    'word-break': 'break-all',
                    /* Adds a hyphen where the word breaks, if supported (No Blink) */
                    '-ms-hyphens': 'auto',
                    '-moz-hyphens': 'auto',
                    '-webkit-hyphens': 'auto',
                    '-o-hyphens': 'auto',
                    'hyphens': 'auto'
                });
                //Create a span for the star rating column, setting it's float and white-space css values
                var $starCol = $('<span></span>').append({
                    'float': 'left',
                    'white-space': 'nowrap'
                });
                //From 0 to the holiday's starRating value
                for (var i = 0; i < holiday.starRating; i++) {
                    //Create an img element of class "starRatingImg", setting it's src and it's width, height...
                    //...display and sizing css values
                    var $star = $('<img class="starRatingImg" src="assets/star.png"></img>').css({
                        'width': '15px',
                        'height': '15px',
                        'display': 'inline',
                        '-webkit-box-sizing': 'border-box'
                    });
                    //If the counting index is 0 (i.e. the beginning)
                    if (i === 0) {
                        //Set this star instance a left margin of 6 pixels
                        $star.css({'margin-left': '6px'});
                    }
                    //Append the current star img element inside the starCol
                    $starCol.append($star);
                }
                //Append the star column inside the text1 "hotelName" element
                $text1.append($starCol);
                //Create a paragraph element of class "cityAndCountry", setting it's colour and font size css values.
                //This element will store the holiday's city and country values
                var $text2 = $('<p class="cityAndCountry">' + holiday.location.city + ', ' + holiday.location.country + '</p>').css({
                    'color': '#000080',
                    'font-size': '16px'
                });
                //Create a div elemnet of class "row1price", setting it's background colour, width, height, left border...
                //...line height, white space, position, padding, alignment and sizing css values
                var $divR1Pt2 = $('<div class="row1price"></div>').css({'background-color': '#FFFF00',
                    'width': '25%',
                    'height': 'auto',
                    'border-left': '2px solid #000080',
                    'line-height': '2px',
                    'white-space': 'normal',
                    'position': 'relative',
                    'padding': '10px',
                    'vertical-align': 'center',
                    'text-align': 'left',
                    '-webkit-box-sizing': 'border-box', /* Safari/Chrome, other WebKit */
                    '-moz-box-sizing': 'border-box', /* Firefox, other Gecko */
                    'box-sizing': 'border-box'         /* Opera/IE 8+ */
                });
                //Create a paragraph object of class "priceText", setting it's colour and font size css values
                var $text3 = $('<p class="priceText"><strong>Holiday Price</strong></p>').css({
                    'color': '#000080',
                    'font-size': '16px'
                });
                //Create a paragraph object of class "priceDouble", setting it's colour and font size css values...
                //...This element stores the holiday's price value, using toFixed to convert the number ...
                //...to string as well as limit decimal places to 2
                var $text4 = $('<p><strong class="priceDouble">&pound' + holiday.price.toFixed(2) + '</strong></p>').css({
                    'color': '#000080',
                    'font-size': '26px'
                });
                //Append the first text element (hotelName) to div row 1 part 1
                $divR1Pt1.append($text1);
                //Append the second text element (cityAndCountry) to div row 1 part 1
                $divR1Pt1.append($text2);
                //Append the third text element (priceText) to div row 1 part 2
                $divR1Pt2.append($text3);
                //Append the fouth text element (priceDouble) to div row 1 part 2
                $divR1Pt2.append($text4);
                //Append the div row 1 part 1 to the first div row
                $divRow1.append($divR1Pt1);
                //Append the div row 1 part 2 to the first div row
                $divRow1.append($divR1Pt2);
                //Append the first div row to the main div
                $div.append($divRow1);
                //Create div object of class "row2", setting the box shadow, background colour, width, height, position...
                //...margin top, overflow and float css values
                var $divRow2 = $('<div class="row2"></div>').css({
                    'box-shadow': '0 3px 2px -2px gray',
                    'background-color': '#0080FF',
                    'width': '100%',
                    'height': 'auto',
                    'position': 'inherit',
                    'margin-top': '286px',
                    'overflow': 'hidden',
                    'float': 'left'
                });
                //Create a div of class row2pt1, setting it's width, height, vertical and text align, left and right padding...
                //...colour, display and float css values
                var $divRow2pt1 = $('<div class="row2pt1"></div>').css({
                    'width': '75%',
                    'height': 'auto',
                    'vertical-align': 'top',
                    'text-align': 'left',
                    'padding-left': '15px',
                    'padding-right': '15px',
                    'color': '#FFF',
                    'display': 'inline',
                    'float': 'left'

                });
                //Variable for offspring (children and infant values)
                var offspring;
                //If the number of children and infants do not equal 0
                if (holiday.passengers.children !== 0 && holiday.passengers.infants !== 0) {
                    //Set the offspring variable as a string featuring the number of children and infants
                    offspring = ", <strong>" + holiday.passengers.children + "</strong> children & <strong>" + holiday.passengers.infants + "</strong> infants";
                    //If the number of children equals 1
                    if (holiday.passengers.children === 1) {
                        //Replace the word "children" in the offspring string as "child"
                        offspring = offspring.replace("children", "child");
                    }
                    //If the number of infants equals 1
                    if (holiday.passengers.infants === 1) {
                        //Replace the word "infants" in the offspring string as "infant"
                        offspring = offspring.replace("infants", "infant");
                    }
                //Otherwise, if the number of children does not equal, but the number of infants does
                } else if (holiday.passengers.children !== 0 && holiday.passengers.infants === 0) {
                    //Set the offspring variable as a string featuring the number of children
                    offspring = " & <strong>" + holiday.passengers.children + "</strong> children";
                    //If the number of children equals 1
                    if (holiday.passengers.children === 1) {
                        //Replace the word "children" in the offspring string as "child"
                        offspring = offspring.replace("children", "child");
                    }
                //Otherwise, if the number of children equal 0, but the number of infants do not
                } else if (holiday.passengers.children === 0 && holiday.passengers.infants !== 0) {
                    //Set the offspring variable as a string featuring the number of infants
                    offspring = " & <strong>" + holiday.passengers.infants + "</strong> infants";
                    //If the number of infants equals 1
                    if (holiday.passengers.infants === 1) {
                        //Replace the word "infants" in the offspring string as "infant"
                        offspring = offspring.replace("infants", "infant");
                    }
                }
                //Create a div storing a paragraph of class "row2Text", itself containing the day, month and year...
                //...of the start date, the number of days, the departFrom value and the adults, children and infants.
                //Set the font size and float css values
                var $text5 = $("<div><p class='row2Text'><strong>"
                        + holiday.startDate.day + " " + holiday.startDate.month + " " + holiday.startDate.year + "</strong> for <strong>"
                        + holiday.days + "</strong> days from "
                        + holiday.departFrom + ", <strong>"
                        + holiday.passengers.adults + "</strong> Adults" + offspring + "</p></div>").css({
                    'font-size': '18px',
                    'float': 'left'
                });
                //Append the row2Text to div row 2 part 1
                $divRow2pt1.append($text5);
                //Append div row 2 part 1 to the main div row 2
                $divRow2.append($divRow2pt1);
                //Create a div element of class "row2pt2", setting it's width, height, vertical and text align, float...
                //...display and padding css elemnents
                var $divRow2pt2 = $('<div class="row2pt2"></div>').css({
                    'width': '10%',
                    'height': 'auto',
                    'vertical-align': 'top',
                    'text-align': 'right',
                    'float': 'right',
                    'display': 'inline-block',
                    'padding': '10px'
                });
                //Create an img element of class "arrowbtt", setting its width, float, height and top and right margin...
                //...css elements
                var $arrButton = $("<img class='arrowBtt' src='assets/arrow.png'/>").css({
                    'width': '20px',
                    'float': 'right',
                    'height': '40px',
                    'margin-top': '8px',
                    'margin-right': '8px'
                });
                //Create an empty div for storing elements, which will be shown or hidden depending on the state of the...
                //...arrow img button. Set the background colour, width, height, text align, colour, padding, float...
                //...and box shadow css elements.
                var $extendDiv = $('<div></div>').css({
                    'background-color': '#FFF',
                    'width': '99%',
                    'height': 'auto',
                    'text-align': 'center',
                    'color': '#00bfff',
                    'padding': '3%',
                    'display': 'block',
                    'float': 'left',
                    'padding-left': '10px',
                    'padding-right': '10px',
                    'box-shadow': '0 3px 2px -2px gray'
                });
                //Create a paragraph object storing the holiday's details, setting the width, font size, text align...
                //...and display css values
                var $extendDivText = $('<p>' + holiday.details + '</p>').css({
                    'width': '95%',
                    'font-size': '1.2em',
                    'text-align': 'justify',
                    'display': 'block'
                });
                //Append the extended div text inside the extendDiv
                $extendDiv.append($extendDivText);
                //Append a line break inside the extendDiv, putting it below the text
                $extendDiv.append('<br/>');
                //Create a button element of class "button", giving it text of "BOOK NOW" in bold text and setting...
                //...it's border and background colour, font colour, font size and bottom margin css values
                var $bookNowButton = $('<button class="button"><strong>BOOK NOW</strong></button>').css({
                    'border-color': '#000080',
                    'background-color': '#000080',
                    'color': '#FFF',
                    'font-size': '24px',
                    'margin-bottom': '30px'
                });
                //Append the button inside the extended div
                $extendDiv.append($bookNowButton);
                //Attach a click listener to the arrow button, calling a function every time it is clicked
                $arrButton.click(function () {
                    //If the extended div is not visible
                    if ($extendDiv.is(':visible') === false) {
                        //Show the extended div
                        $extendDiv.show();
                        //Set the arrow button's css values in a way that rotates it 90 degrees clockwise
                        $arrButton.css({
                            /* Safari */
                            '-webkit-transform': 'rotate(90deg)',
                            /* Firefox */
                            '-moz-transform': 'rotate(90deg)',
                            /* IE */
                            '-ms-transform': 'rotate(90deg)',
                            /* Opera */
                            '-o-transform': 'rotate(90deg)',
                            /* Internet Explorer */
                            'filter': 'progid:DXImageTransform.Microsoft.BasicImage(rotation=3)'
                        });
                    //Otherwise, if the extended div is visible
                    } else {
                        //Hide the extended div
                        $extendDiv.hide();
                        //Set the arrow button's css values in a way that reverts it back to it's original angle
                        $arrButton.css({
                            /* Safari */
                            '-webkit-transform': 'rotate(0deg)',
                            /* Firefox */
                            '-moz-transform': 'rotate(0deg)',
                            /* IE */
                            '-ms-transform': 'rotate(0deg)',
                            /* Opera */
                            '-o-transform': 'rotate(0deg)',
                            /* Internet Explorer */
                            'filter': 'progid:DXImageTransform.Microsoft.BasicImage(rotation=3)'
                        });
                    }
                });
                //Append the arrow button inside div row 2 part 2
                $divRow2pt2.append($arrButton);
                //Append div row 2 part 2 inside div row 2
                $divRow2.append($divRow2pt2);
                //Append the extended text div to div row 2
                $divRow2.append($extendDiv);
                //Hide the extended div as default
                $extendDiv.hide();
                //Append div row 2 inside the main div
                $div.append($divRow2);
                //Append the main div to the holidayListings element
                $(".holidayListings").append($div);
            });
        }
        //Attach a click listener to the button whose id is "sortByAlphabet", calling a function every time it is clicked
        $("#sortByAlphabet").click(function () {
            //Change the background and font colour of the button whose id is "sortByAlphabet"
            $("#sortByAlphabet").css({'background-color': '#0080FF', 'color': '#FFF'});
            //Change the background and font colour of the button whose id is "sortByPrice"
            $("#sortByPrice").css({'background-color': '#D4F0FF', 'color': '#0080FF'});
            //Change the background and font colour of the button whose id is "sortByStarRating"
            $("#sortByStarRating").css({'background-color': '#D4F0FF', 'color': '#0080FF'});
            //If the length of the holidays array is greater than 0
            if ($holidaysAvailable.length > 0) {
                //Sort the contents of the holidaysAvailable array, passing it a functon that iterates every two entries in the array...
                //...from start to finish
                $holidaysAvailable.sort(function (a, b) {
                    //Store the hotel name of the b (start/current) entry
                    var aName = a.hotelName.toLowerCase();
                    //Store the hotel name of the b (next) entry
                    var bName = b.hotelName.toLowerCase();
                    //If the sort order equals "alphR"(alphabet reverse)
                    if (sortOrder === "alphR") {
                        //If the name of the start/current is greater than the next, return -1. Otherwise, if the...
                        //name of the start/current is less than the next, return 1. Otherwise, return 0
                        return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
                    //Otherwise
                    } else {
                        //If the name of the start/current is less than the next, return -1. Otherwise, if the...
                        //name of the start/current is greater than the next, return 1. Otherwise, return 0
                        return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                    }
                });
                //If the sort order equals "alphR"(alphabet reverse)
                if (sortOrder === "alphR") {
                    //Set the sort order as "alphF" (alphabet forward)
                    sortOrder = "alphF";
                //Otherwise
                } else {
                    //Set the sort order as "alphF" (alphabet reverse)
                    sortOrder = "alphR";
                }
                //Empty the holidayListings element of all children
                $(".holidayListings").empty();
                //Call the renderEntries method
                renderEntries();
            }
        });
        //Attach a click listener to the button whose id is "sortByPrice", calling a function every time it is clicked
        $("#sortByPrice").click(function () {
            //Change the background and font colour of the button whose id is "sortByAlphabet"
            $("#sortByAlphabet").css({'background-color': '#D4F0FF', 'color': '#0080FF'});
            //Change the background and font colour of the button whose id is "sortByPrice"
            $("#sortByPrice").css({'background-color': '#0080FF', 'color': '#FFF'});
            //Change the background and font colour of the button whose id is "sortByStarRating"
            $("#sortByStarRating").css({'background-color': '#D4F0FF', 'color': '#0080FF'});
            //If the length of the holidaysAvailable array is greater than 0
            if ($holidaysAvailable.length > 0) {
                //Sort the holidaysAvailable array, calling a function that iterates every two entries in the array...
                //...from start to finish
                $holidaysAvailable.sort(function (a, b) {
                    //Get the price value of the a (start/current) holiday and store in a variable
                    var aPrice = a.price;
                    //Get the price value of the a (next) holiday and store in a variable
                    var bPrice = b.price;
                    if (sortOrder === "priceR") {
                        //If the start/current value is greater than the next, return -1. Otherwise, if the...
                        //start/current value is less than the next, return 1. Otherwise, return 0
                        return ((aPrice > bPrice) ? -1 : ((aPrice < bPrice) ? 1 : 0));
                    } else {
                        //If the start/current value is less than the next, return -1. Otherwise, if the...
                        //start/current value is greater than the next, return 1. Otherwise, return 0
                        return ((aPrice < bPrice) ? -1 : ((aPrice > bPrice) ? 1 : 0));
                    }
                });
                //If the sort order is priceR (price reverse)
                if (sortOrder === "priceR") {
                    //Change the sort order as "priceF" (price forward)
                    sortOrder = "priceF";
                //Otherwise
                } else {
                    //Set the sort order as "priceR" (price reverse)
                    sortOrder = "priceR";
                }
                //Empty the holidayListings of all children
                $(".holidayListings").empty();
                //Call the renderEntries method
                renderEntries();
            }
        });
        //Attach a click listener to the button whose id is "sortByStarRating", calling a function every time it is clicked
        $("#sortByStarRating").click(function () {
            //Change the background and font colour of the button whose id is "sortByAlphabet"
            $("#sortByAlphabet").css({'background-color': '#D4F0FF', 'color': '#0080FF'});
            //Change the background and font colour of the button whose id is "sortByPrice"
            $("#sortByPrice").css({'background-color': '#D4F0FF', 'color': '#0080FF'});
            //Change the background and font colour of the button whose id is "sortByStarRating"
            $("#sortByStarRating").css({'background-color': '#0080FF', 'color': '#FFF'});
            if ($holidaysAvailable.length > 0) {
                //Sort the holidaysAvailable array, calling a function that iterates every two entries in the array...
                //...from start to finish
                $holidaysAvailable.sort(function (a, b) {
                    //Get the starRating value of the a (next) holiday and store in a variable
                    var aStar = a.starRating;
                    //Get the starRating value of the a (next) holiday and store in a variable
                    var bStar = b.starRating;
                    //If the sort order is starF (star forward)
                    if (sortOrder === "starF") {
                        //If the start/current value is greater than the next, return -1. Otherwise, if the...
                        //start/current value is less than the next, return 1. Otherwise, return 0
                        return ((aStar < bStar) ? -1 : ((aStar > bStar) ? 1 : 0));
                    } else {
                        //If the start/current value is less than the next, return -1. Otherwise, if the...
                        //start/current value is greater than the next, return 1. Otherwise, return 0
                        return ((aStar > bStar) ? -1 : ((aStar < bStar) ? 1 : 0));
                    }
                });
                //If the sort order is starF (star forward)
                if (sortOrder === "starF") {
                    //Set the sort order as "starR" (star reverse)
                    sortOrder = "starR";
                //Otherwise
                } else {
                    //Set the sort order as "starF" (star forward)
                    sortOrder = "starF";
                }
                //Empty the holidayListings class element of all children
                $(".holidayListings").empty();
                //Call the renderEntries method
                renderEntries();
            }
        });
        //Call the renderEntries method as default
        renderEntries();
    });
});

