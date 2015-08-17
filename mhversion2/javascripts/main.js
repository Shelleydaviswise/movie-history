requirejs.config({
 baseUrl: './javascripts',
 paths: {
   'jquery': '../bower_components/jquery/dist/jquery.min',
   'hbs': '../bower_components/require-handlebars-plugin/hbs',
   'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
   'firebase': '../bower_components/firebase/firebase',
   'lodash': '../bower_components/lodash/lodash.min',
   'bootstrap-rating': '../bower_components/bootstrap-rating/bootstrap-rating.min'
 },
 shim: {
   'bootstrap': ['jquery'],
   'bootstrap-rating': ['bootstrap'],
   'firebase': {
     exports: 'Firebase'
   }
 }
});


requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "addMovies", "watched", "wishlist", "domAccess", "bootstrap-rating"], 
function($, _, _firebase, Handlebars, bootstrap, add, movies, watched, dom, bsrating){

 var target = dom.getDom();

 console.log('target',target);
 var fbRef = new Firebase("https://moviehistoryv2.firebaseio.com/movie-history");
     fbRef.set({
       movie:{
         title: "a",
         poster: "b",
         rating: "c",
         watched: true,
         wishlist: false
       }
   });
  var moviesFB;

//Pulling out Firebase Object
 fbRef.child("movie").on("value", function(snapshot) {
      console.log('snapshot',snapshot);
      moviesFB = (snapshot.val());
      console.log('snapshot.val()', snapshot.val());
      loadMovies(moviesFB);
     
   });
 console.log('moviesFB',moviesFB);

// Handlebars requires an object so this block turns  movies retrieved from Firebase 
// and pushes each to an array of objects.  The #each function requires and array to loop over.
  
  // Initial population of landing page with Firebase wishlist
    function loadMovies(moviesFB) {
     require(['hbs!../templates/getwishlistmov'], function(template) {
      console.log('movieFB2', moviesFB);
      var arrayMovies = [];
      arrayMovies.push(moviesFB);
      // arrayMovies.push({
      //   title: 'hello',
      //   poster: 'hi',
      //   rating: 'c',
      //   watched: 'true',
      //   wishlist: 'false'
      // });
      var tempObj = {};
      tempObj.movies = arrayMovies;
       $(target).html(template(tempObj));
     });
   }
  
    $("#searchButton").click(function(evt){
            console.log(evt);
            add.getMovies(function(movie) {
            tempMovies = movie; 
            });

            $("#searchBox").val('');

      function loadMovies(tempMovies) {
           require(['hbs!../templates/getwishlistmov'], function(template) {
            console.log('tempMovies', tempMovies);
            var arrayNewMovies = [];
            arrayNewMovies.push(tempMovies);
            console.log(arrayNewMovies)
            // arrayMovies.push({
            //   title: 'hello',
            //   poster: 'hi',
            //   rating: 'c',
            //   watched: 'true',
            //   wishlist: 'false'
            // });
            var tempObj = {};
            tempObj.movies = arrayNewMovies;
             $(target).html(template(tempObj));
           });
          };
        });

 // $(document).on('click', '.btnWatched', function(){
 //   if key = _.findKey(moviesFB, 'watched', false, function(w){
 //     console.log(w.movie.watched);
 //   });
 // }
 // );




//bottom bracket   
});
