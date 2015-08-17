define(["hbs!../templates/movie", "bootstrap-rating", "jquery"],
function(movieTemplate, bsrating, $) {
  var templateObj = {};
  templateObj.movie = movieTemplate;
  return templateObj;
});