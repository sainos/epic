var image_cell_template = "<div class='col-sm-3 image-cell'><div class='nasa-image'><img></div><div class='image-caption'></div><div class='image-coords'></div></div>";
var date_tmpl = "begin=YEAR-MONTH-DAY";
var myApiKey = "LYQ6Pxd0LSM4J22vZVCR0NCaZjywaJ6v4VF17WoU";

var example_image_url = "https://api.nasa.gov/EPIC/archive/natural/2015/06/13/png/epic_1b_20150613110250_01.png?api_key=YOUR_API_KEY";
var epic_natural_archive_base = "https://api.nasa.gov/EPIC/archive/natural/";
var api_url_query_base = "https://epic.gsfc.nasa.gov/api/natural/date/";

// ==========================================================
// START JS: synchronize the javascript to the DOM loading
// ==========================================================
$(document).ready(function() {

  // ========================================================
  // SECTION 1:  process on click events
  // ========================================================
  $('#get-images-btn').on('click', api_search);

  // process the "future" img element dynamically generated
  $("div").on("click", "img", function(){
    console.log(this.src);
    // call render_highres() and display the high resolution
  });

  // ========================================================
  // TASK 1:  build the search AJAX call on NASA EPIC
  // ========================================================
  // Do the actual search in this function
  function api_search(e) {

    // get the value of the input search text box => date
    // var date = ?
    var date = $("#search_date").val();
    console.log(date);


    // build an info object to hold the search term and API key
    var info = {
      year: "",
      month: "",
      day: "",
      api_key: ""
    };

    var date_array = date.split('-');
    info.year = date_array[0];
    info.month = date_array[1];
    info.day = date_array[2];
    info.api_key = myApiKey;

    // build the search url and sling it into the URL request HTML element
     var search_url = "https://epic.gsfc.nasa.gov/api/natural/date/" + info.year + "-" + info.month + "-" + info.day + "?api_key=" + info.api_key;
     console.log(search_url);
    // sling it!

    // make the jQuery AJAX call!
    $.ajax({
      url: search_url,
      success: function(data) {
        render_images(data,info);
      },
      cache: false
    });
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ========================================================

  // ========================================================
  // TASK 2: perform all image grid rendering operations
  // ========================================================


  function render_images(data,info) {
    // get NASA earth data from search results data

    console.log(data.length);

    var images = [];
    for (var i = 0; i < data.length; i++) {
      // build an array of objects that captures all of the key image data
      // => image url
      // => centroid coordinates to be displayed in the caption area
      // => image date to be displayed in the caption area (under thumbnail)
      images.push({
        img_url: "https://api.nasa.gov/EPIC/archive/natural/" + info.year + "/" + info.month + "/" + info.day + "/png/" + data[i].image + ".png?api_key=" + myApiKey,
        cent_coor: "lat: " + data[i].centroid_coordinates.lat + " lon: " + data[i].centroid_coordinates.lon,
        img_date: data[i].date
      });

    }


    // select the image grid and clear out the previous render (if any)
    var earth_dom = $('#image-grid');
    earth_dom.empty();
    console.log(images[0].img_date);

    for (var j = 0; j < data.length; j++) {

      if((j % 4) === 0) {
        var new_row = "<div class=" + '"row"' + ">";
        $('div.well').append(new_row);
      }

      var str = "<div class='col-sm-3 image-cell'><div class='nasa-image'><img src =" + '"' + images[j].img_url + '"' + "></div><div class='image-caption'></div><div class='image-coords'></div></div>";
      var capt = images[j].img_date;
      var coords = images[j].cent_coor;
      $('div.well:last').append(str);
      $('div.image-caption:last').append(capt);
      $('div.image-coords:last').append(coords);
    }

    // render all images in an iterative loop here!
  }

  // ========================================================
  // TASK 3: perform single high resolution rendering
  // ========================================================
  // function to render the high resolution image
  function render_highres(src_url) {
    // use jQuery to select and maniupate the portion of the DOM => #image-grid
    //  to insert your high resolution image

    $("div").on("click", "img", function(){
    // render your high resolution image within the #image-grid id html element
    });
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ========================================================
});
