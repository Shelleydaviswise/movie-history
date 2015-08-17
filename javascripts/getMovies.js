define(["jquery"], function($) {

  return {
    getMovie: function(callbackfunction) {
      var title = $("#titleInput").val().toLowerCase();
    
      $.ajax({
          url: "http://www.omdbapi.com/?s="+title+"&y=&plot=short&r=json",        
        }).done(function(data) {
          
          
          console.log("data", data);
          callbackfunction.call(this, data);
          
      });

    }

  };

});

