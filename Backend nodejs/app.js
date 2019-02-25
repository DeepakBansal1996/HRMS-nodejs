const express = require('express');
const app = express();
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const port = 5000;
//deepak start
require('./model/project');
const projectmodel=mongoose.model('project');

require('./model/users');
const usermodel=mongoose.model('users');

require('./model/skills');
const skillmodel=mongoose.model('skills');
//deepak end
app.listen(port, function(){
    console.log(`Server is running on port : ${port}`);
});

//allowing bodyparser and cors
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())
app.use (cors('*','*','*'));

//Connecting to mongoose
mongoose.connect('mongodb://localhost/HRMS',{
useMongoClient:true
})
.then(()=>console.log('Mongodb Connected'))
.catch(err =>console.log(err));

//Creating a Middleware
app.use(function(req, res, next){
console.log('Hello');
req.name='abc';
next(); 
});


//index route for Login GETAPI
//route for verifying user and rendering the page according to it's usertype
app.get('/login', (req, res)=>{
    // console.log(req.body);
    Usermodel.findOne({Username:req.body.Username},async (err,user)=>{
      // console.log(user);
      if(!!Username) {return res.status(404).send("Incorrect username");}
      var Password = await bcrypt.compare(req.body.Password,Usermodel.Password);
      // console.log(validpass);
      if(!password){
          return res.status(400).send("you've entered incorrect password");
        }
        else{
          var usertoken = jwt.sign({ Username:Usermodel.Username},'bootcamp');
          return res.header('x-auth-usertoken',usertoken).send(Usermodel.type);
        }
    });
});


//route for adminhomepage GETAPI
//Showing project list to the admin usertype
app.get('/adminhomepage/getprojects', (req, res)=>{
    //start deepak
    projectmodel.find({})
.then(project => { res.send({project:project})})
   //end deepak	
});
//route for userhomepage GETAPI
//Showing userdet ails(profile picture, name, skills) to the user usertype
//deepak
app.get('/userhomepage/getuserdetails/:Username', (req, res)=>{
    usermod.findOne({
	Username:req.params.Username
})
.then(users => { res.send({users:users})})
    });
//end deepak
});

/*route for Userhomepage DeleteApi
app.delete('/adminhomepage', (req, res)=>{
    console.log('Delete Projects or admin details');
)};
*/



//deepak
//update user skills
app.put('/adminhomepage/updateUserskills/:Username',(req,res)=>{
usermod.findOne({
  Username:req.params.Username
})

.then(users => {
      
      users.Username = req.body.Username;
      users.Password = req.body.Password;
      users.Usertype = req.body.Usertype;
      users.Skills = req.body["Skills[]"];
      console.log(req.body["Skills[]"]); 
      users.save()
      });

   });
//end deepak       


//route for Adminhomepage Add User
//Admin can add Users(uid, password, usertype) to the User collection using this route
app.post('/adminhomepage/adduser', (req, res)=>{
    console.log('Add User');
    // start deepak
    console.log(req.body);
   const user={
   	Username:(req.body.Username),
   	Password:(req.body.Password),
   	Usertype:(req.body.Usertype)
   }
   new usermodel(user)
   .save()
   .then(()=> console.log('done.........'))
   .catch(err =>console.log(err));
   //end deepak
});
  
//route for Adminhomepage Add Skills
//Admin can create/add skills to the skill collection using this route
app.post('/adminhomepage/addskills', (req, res)=>{
    console.log(req.body);
    // start deepak
   const skill={
    Skillsname:(req.body)
   }
   new skillmodel(skill)
   .save()
   .then(()=> console.log('done.........'))
   .catch(err =>console.log(err));
   //end deepak
});
   
//route for Adminhomepage Add Project
//Admin can create/add Projects to the Project collection using this route
app.post('/adminhomepage/addprojects', (req, res)=>{
    console.log(req.body);
        // start deepak
	const project={
   	Projectname:(req.body.Projectname),
   	Projectdesc:(req.body.Projectdesc),
   	Techstack:(req.body['Techstack[]']),
   	Userassigned:(req.body.Usersassigned)
   }
   new projectmodel(project)
   .save()
   .then(()=> console.log('done.........'))
   .catch(err =>console.log(err));
   //end deepak
   });
   

//deepak
//get projects api
app.get('/adminhomepage/getprojects', (req,res)=>{

projectmod.find({})
.then(project => { res.send({project:project})})
});
//end deepak
//route for Adminhomepage delete Project
//Admin can delete Projects to the Project collection using this route
app.delete('/adminhomepage/deleteprojects/:id', (req,res)=>{

projectmodel.deleteOne({_id:req.params.id})
.then(()=> res.send({}))
.catch(err =>console.log(err));
});
   
 
   
   
//route for userhomepage adding new skills
//user can update his skill through this route
app.post('/userhomepage/addskills', (req, res)=>{
 console.log('Add Userskills');

});

//route for userhomepage deleteskills
//user can delete his skill through this route
app.delete('/userhomepage/deleteskills', (req, res)=>{
 console.log('delete Userskills');

});