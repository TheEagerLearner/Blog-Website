const express=require("express");
const bodyp=require("body-parser");
const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/blog",{userNewParseUrl:true});

const app=express();
app.set("view engine","ejs");
app.use(bodyp.urlencoded({extended:true}));
app.use(express.static("public"));


const postSchema=new mongoose.Schema({
  heading:String,
  description:String
});

const Data=mongoose.model("post",postSchema);

app.get("/",function(request,response){

  Data.find({},function(err,found){
    if(err){
      console.log(err);
    }
    else{
      console.log(found);
      response.render("index",{posts:found});
    }

  });

});

app.get("/about",function(request,response){



  response.render("about");

});

app.get("/contact",function(request,response){

  response.render("contact",);

});




app.post("/content",function(request,response){

var title=request.body.title;
var desc=request.body.description;
  const data=new Data({
    heading:title,
    description:desc
  });
  data.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("Done!");
    }
  });
  response.render("wow");
});

app.post("/delete",function(request,response){

  var dat=request.body.btn;
  console.log(dat);
  Data.findByIdAndRemove(dat,function(err){
    if(err)
    {
      console.log(err);
    }
    else
    {
      console.log("Done!");
      response.render("wow");

    }
  });


});

app.post("/update",function(request,response){

  var dat=request.body.upt;
  Data.updateOne({_id:dat},{heading:request.body.head,description:request.body.bod},function(err){
    if(err)
    {
      console.log(err);
    }
    else
    {
    console.log("Changes saved!");

    response.render("wow");

    }
  });

});


const UserSchema=new mongoose.Schema({
  username:String,
  password:String
});

const UserModel=mongoose.model("user",UserSchema);

app.get("/login",function(request,response){
  response.render("login");
});

app.post("/login",function(request,response){

  var name=request.body.username;
  var pass=request.body.password;

  UserModel.findOne({username:name,password:pass},function(err,found){
    if(err)
    {
      console.log(err);
    }
    else
    {
      if(found){
      if(found.password===pass){
        response.render("wow");
      }
      else
      {
        console.log(pass+"+"+word);
      }

    }
  }
  });

});

app.post("/change",function(request,response){

  Data.find({},function(err,found){

    response.render("changes",{posts:found});

  });
});

app.post("/con",function(request,response){


    Data.find({},function(err,found){
      if(err){
        console.log("SomeError occurred -->"+err);
      }
      else {

        response.render("content",{posts:found});

      }
    });

});

app.listen(process.env.PORT || 3000,function(){

  console.log("Server has started");

});
