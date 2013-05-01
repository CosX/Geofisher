
// Change this depending on the name of your PHP file
$(document).ready(function() {
    $.get("http://frigg.hiof.no/h13d23/Backend/listStory/generateJSON.php", function(data){
        for(n in data) {
        	var storyId = data[n].Id;
            var title = data[n].Title;
            var user = data[n].User;
            var about = data[n].About;
            var rating = data[n].Rating;
            var date = data[n].Date;
            var html = "<h4>" + title + "</h4>" + "<p>By: " + user + "<br/>" + about + " <br/> Rating: " + rating + " <br/> <i>" + date + "</i> <span class='story-id' value='" + storyId + "' style='display:none;'>" + storyId + "</span></p>";
            
            $('#logs').append('<a href="#"><li>'+html+ '</a><button class="delete-story" value="'+ storyId +'">Delete story</button></li>');
            
            $('.delete-story').click(function(){
              var Data = {delete:  $(this).val()};
              $.ajax({
                type: "POST",
                url: "http://frigg.hiof.no/h13d23/Backend/listStory/removeStory.php",
                data: Data,
                success:function (data) {
              	 window.location.replace("app.html");;
        	   },
                error: function (data) {
            	   alert("WRONG!")
            	  }
                });
                return false;
              });
            }
        },'json'
    );
});