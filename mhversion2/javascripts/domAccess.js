
define (['jquery'], function($) {
  
  var outputTarget = $("#movContainer");

  return {
    getDom : function () {
     return outputTarget;
    }
  };
});