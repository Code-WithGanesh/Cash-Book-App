const express = require("express");
const app = express();
const mysql = require("mysql2");
const ejs = require('ejs');

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))

app.listen(8080, (req, res) => {
  console.log("Server is Running on 8080");
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "CASH_BOOK",
  password: "Ganesh123",
});

//show all transaction :-
app.get("/cashTable",(req,res)=>{
    let q="select * from cashbook"
    connection.query(q,(err,result)=>{
        let total=0;
        if(err){
            console.log(err);
           return res.send("some error found")
        }

         result.forEach((item) => {
      if (item.type == "IN") {
        total += item.amount;
      } else if (item.type == "OUT") {
        total = total - item.amount;
      }
    });
        return res.render("show.ejs",{result,balance:total})
    })
})


// app.get("/cashbook", (req, res) => {
//   let q = "select * from cashbook";
//   connection.query(q, (err, result) => {
//     let total = 0;
//     if (err) {
//       console.log(err);
//       res.send("some error found..");
//     }

//     result.forEach((item) => {
//       if (item.type == "IN") {
//         total += item.amount;
//       } else if (item.type == "OUT") {
//         total = total - item.amount;
//       }
//     });
//     return res.send({ balance: total})
//   });
// });

app.get("/cash/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/cash",(req,res)=>{
   let {type,amount}=req.body;
   let q="insert into cashbook (type,amount) values (?,?)"

   connection.query(q,[type,amount],(err,result)=>{
    if(err){
        console.log(err)
        res.send("some error found")
    }
    return res.redirect("/cashtable")
   
   })
})


