const express = require("express");
const methodOverride = require("method-override"); 
const app = express();
const port = 8000;
const path = require("path");
const { v4: uuidv4 } = require("uuid");


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    type:"Bussiness",
    username: "MSCoding",
    content: "i love Programming",
  },
  {
    id: uuidv4(),
    type:"Marketing",
    username: "GsLearning",
    content: "i love Coding",
  },
  {
    id: uuidv4(),
    type:"Technology",
    username: "lsProgramming",
    content: "i love growing",
  },
  {
    id: uuidv4(),
    type:"Art",
    username: "GsLearning",
    content: "i love Coding",
  },
  {
    id: uuidv4(),
    type:"Science",
    username: "lsProgramming",
    content: "i love growing",
  },
];
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

//     *********for creating new post or blog ***********
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// ********** for add new data with previous data***********
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

// ********** for finding the data from all post using ID*********
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  console.log(post);
  res.render("show.ejs", { post });
});

// *********** for update post data content**********
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newcontent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content=newcontent;
  res.redirect("/posts");
});

// ***************delete post*************
app.delete("/posts/:id",(req,res)=>{
  let { id } = req.params;
  posts= posts.filter((p) => id !== p.id);  
  res.redirect("/posts");
})

// ***************Edit post*************
app.get("/posts/:id/edit",(req,res)=>{
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
   res.render("edit.ejs",{post})
})

//  ******** for / page default page**********
app.get("/", (req, res) => {
  res.render("landingpage.ejs" ,{posts});
});

// ********* login page****************
app.get("/login", (req, res) => {
  res.render("signin.ejs");
});

// ********* Signup page****************
app.get("/signup", (req, res) => {
  res.render("signUp.ejs");
});

// ********* forgot page****************
app.get("/forgot", (req, res) => {
  res.render("forgot.ejs");
});

// ********* About page****************
app.get("/about", (req, res) => {
  res.render("About.ejs");
});

// ********* Contact page****************
app.get("/contact", (req, res) => {
  res.render("Contactus.ejs");
});

// ***** for listing the port ********
app.listen(port, () => {
  console.log("port is listen on port :8000");
});
