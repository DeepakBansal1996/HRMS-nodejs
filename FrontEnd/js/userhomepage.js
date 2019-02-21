function showdetails(){							
			$.ajax	({
				url: "http://localhost:5000/userhomepage/getuserdetails",
				type: 'GET',
				dataType: 'json', 
				success: function(data)
				{
                    console.log(data);     
                    
	var datafornewskill = {
         var name = document.getElementById("displayUsername").value;
             var skills = document.getElementById("mytable").value;
				 var table=document.getElementById("mytable");
				 for (var i=0; i<data.project.length; i++){
				 var row=table.insertRow(table.length);
//                     //console.log(data[i])
                 row.insertCell(0).innerHTML=i+1;
				 row.insertCell(1).innerHTML=data.project[i].Name;
				 row.insertCell(2).innerHTML=data.project[i].Skills;
//                 row.insertCell(3).innerHTML=data.project[i].Techstack; 
//				 row.insertCell(2).innerHTML="<input type='button' value='Click To View' class='editbutton' onclick=\'updateskill(\""+data.project[i]._id+"\")'>"
//				 row.insertCell(3).innerHTML="<input type='button' value='Click To View' class='deletebutton' onclick=deleteskill(\""+data.project[i]._id+"\")'>"
				     }
		      } 
		});
}


function addskill(){ 
	var skillname = document.getElementById("showselect").value;  
	var datafornewskill = {
		"Skillname": skillname
	}
	$.ajax({
		url: 'http://localhost:5000/userhomepage/addskill',
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