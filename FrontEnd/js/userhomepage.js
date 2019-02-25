Id="we";

var temp=null;


function FillDetails(){
				$.ajax({
				url: 'http://localhost:5000/userhomepage/getuserdetails/'+Id,
				type: 'GET',
				dataType: 'json', 
				success: function(data)
				{
                                 temp=data; 
                    
                                  console.log(data.users.Username);
                                  document.getElementById("displayUsername").innerHTML="@"+data.users.Username;     
                       		  var table=document.getElementById("mytable");
                                  console.log(data.users.Skills);
				  for (var i=0; i<data.users.Skills.length; i++){
                  		 	var row=table.insertRow(table.length);
                                        row.insertCell(0).innerHTML=i+1;
				        row.insertCell(1).innerHTML=data.users.Skills;
                                }
                               }		      
		              });
}

				     
				
function addskill(){ 
    var values=$('#showselect').val();

    var temp3= values.concat( temp.users.Skills);
    
    
    //console.log(temp.users.Username);
      //console.log(temp.users.Skills);
    var data=
         {
        "Username": temp.users.Username,
        "Password": temp.users.Password,
        "Usertype": temp.users.Usertype,
        "Skills": temp3
    }

    //console.log(data);

   $.ajax({
		url: 'http://localhost:5000/adminhomepage/updateUserskills/'+Id,
        type: 'PUT',
        dataType: 'json',
		data: data,
        success: function(res)
							{
                              //  console.log(res);
							alert("Project has been updated succesfully");
							//window.location="adminhomepage.html";
							}				
        });

}

function showSkills(){
    $.ajax({
        url: 'http://localhost:5000/userhomepage/getskills',
        type: 'GET',
        dataType: 'json', 
        success: function(data){
            console.log("pallavi",data);
            var skills = data.skills;
            for(skillNumber in skills)
                {
                    var skill = skills[skillNumber]['Skillsname'];
                    $("#showselect").append('<option value = "'+skill+'">'+skill+'</option>' )
                }

    
        }
    });
}