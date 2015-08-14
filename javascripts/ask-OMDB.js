define(["jquery"], function($) {

  return {
    getMovie: function(callback, title) {
      console.log('get movie running');
      console.log(title);
      $.ajax({
          url: "http://www.omdbapi.com/?t=" + title +"&y=&plot=short&r=json"
        }).done(function(data) {
          
          
          console.log("data", data);
          callback(data);
          
      });

    }

  };

});
