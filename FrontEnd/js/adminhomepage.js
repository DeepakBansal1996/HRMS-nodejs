function showprojects(){							
			$.ajax	({
				url: "http://localhost:5000/adminhomepage/getprojects",
				type: 'GET',
				dataType: 'json', 
				success: function(data)
				{
                    console.log(data);
                
				 var table=document.getElementById("mytable");
				 for (var i=0; i<data.project.length; i++){
				 var row=table.insertRow(table.length);
                     //console.log(data[i])
                 row.insertCell(0).innerHTML=i+1;
				 row.insertCell(1).innerHTML=data.project[i].Projectname;
				 row.insertCell(2).innerHTML=data.project[i].Projectdesc;
                 row.insertCell(3).innerHTML=data.project[i].Techstack; 
				 row.insertCell(4).innerHTML="<input type='button' value='Update Project' class='btn btn-lg btn-warning mx-2'data-toggle='modal' data-target='#updateProjects' editbutton' onclick=\'getprojectdetails(\""+data.project[i]+"\")'>";
				 row.insertCell(5).innerHTML="<input type='button' value='Delete project' class=' btn btn-lg btn-danger deletebutton' onclick=\'deleteproject(\""+data.project[i]._id+"\")'>";
                
				     }
		      } 
		});
}
function createtechstack(){
     $.ajax({
        url: 'http://localhost:5000/userhomepage/getskills',
        type: 'GET',
        dataType: 'json', 
        success: function(data){
            var skills = data.skills;
            for(skillNumber in skills)
                {
                    var skill = skills[skillNumber]['Skillsname'];
                    $("#TechStack").append('<option value = "'+skill+'">'+skill+'</option>' )
                }

    
        }
    });
}


function adduser(){
	var username = document.getElementById("useradduser").value;
    var password = document.getElementById("passwordadduser").value;
	var usertype = document.getElementById("usertypeadduser").value;
	var datafornewuser={
		"Username": username,
		"Password": password,
		"Usertype": usertype,
        "Skills": "none"
		}
	$.ajax({
		url: 'http://localhost:5000/adminhomepage/adduser',
        type: 'POST',
        dataType: 'json',
	data: datafornewuser,
        success: function(res){
                      alert("User has been added");
					  window.location="adminhomepage.html";
         }
							
        });
}


function addskill(){
	var skillname = document.getElementById("skillnameaddskill").value;
	
	var datafornewskill={
		"Skillsname": skillname
		
	}
	$.ajax({
		url: 'http://localhost:5000/adminhomepage/addskill',
        type: 'POST',
        dataType: 'json',
		data: datafornewskill,
        success: function(res)
								{
						alert("Skill has been added");
						window.location="adminhomepage.html";
								}
        });
}

function addproject(){
    
		var projectname = document.getElementById("projectnameaddproject").value;
		var projectdesc = document.getElementById("projectdescaddproject").value;
		var techstack = $('#TechStack').val(); //document.getElementById("techstackaddproject").value
		var recommendations = document.getElementById("recommendationsaddproject").value;
         console.log(techstack);
	var datafornewproject={
		"Projectname" : projectname,
		"Projectdesc": projectdesc,
		"Techstack": techstack,
		"Usersassigned": recommendations,
	}
	$.ajax({
		url: 'http://localhost:5000/adminhomepage/addproject',
        type: 'POST',
        dataType: 'json',
		data: datafornewproject,
        success: function(res)
							{
                      alert("Project has been added");
					  window.location="adminhomepage.html";
							}				
        });
}


function updateproject(Id){
		var projectname = document.getElementById("projectnameupdateproject").value;
		var projectdesc = document.getElementById("projectdescupdateproject").value;
		var techstack = document.getElementById("techstackupdateproject").value;
		var recommendations = document.getElementById("recommendationsupdateproject").value;
	var dataforupdateproject={
		"Projectname" : projectname,
		"Projectdesc": projectdesc,
		"Techstack": techstack,
		"Usersassigned": recommendations
	}
	$.ajax({
		url: 'http://localhost:5000/adminhomepage/updateproject/'+Id,
        type: 'PUT',
        dataType: 'json',
		data: dataforupdateproject,
        success: function(res)
							{
							alert("Project has been updated succesfully");
							window.location="adminhomepage.html";
							}				
        });
}



function deleteproject(Id){
	alert("are you sure you want to delete this project, Changes may be not be reversible");
    console.log(Id);
        $.ajax({
		url: 'http://localhost:5000/adminhomepage/deleteproject/'+Id,
        type: 'DELETE',
        dataType: 'json',
        success: function(res){
            console.log(res);
			alert("Project has been deleted succesfully");
			window.location="adminhomepage.html";			
            }
        });
}