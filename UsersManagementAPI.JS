var http = require('http');
var express = require('express');
var CryptoJS = require("crypto-js");
var check = require('express-validator');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

class User {

  constructor(Email, Password, Name, Age, AddedDate){
    this.Email=Email,
    this.Password=CryptoJS.MD5(Password),
    this.Name=Name,
    this.Age=Age,
    this.AddedDate=AddedDate;
  }

}

let Users =[];


let u1 = new  User('u@g.com', '0000','u1',13,'18/1/2020');
Users.push(u1);
let u2 = new  User('uas@g.com', '0000','u1',13,'18/1/2020');
Users.push(u2);
console.log('user added');

  function format(str){
    str = str.trim();
    str = str.toLowerCase(str);
    return str;
  }

  //search function
     function searchEmail (email){
        let val = -1;
         Users.forEach((user)=>{
          if(user.Email === email){
            val = user;
            }
          });
          return val;
        }

  //Delete function
    function deleteUserMethod(email){
      Users = Users.filter((user)=>{
        return user.Email!=email;
      });

    }

  //search request
    app.post('/user/search', (req, res)=>{
        var email = req.body.Email;
        email = validator(email);
        let search = Promise.resolve(searchEmail(email));

        search.then((result)=>{
          if(result===-1){
            res.send('User Not found');
          }else{
            res.send(result);
          }
        }).catch((er)=>{
          res.send(er);
        });
      });

  //Edit request
  app.post('/user/edit', (req, res)=>{
      let email = req.body.Email;
      let name = req.body.Name;
      let pass = req.body.Password;
      let age = req.body.Age;

      email = format(email);
      name = format(name);

      if(!Number.isInteger(age)){
        res.end('Enter a valid age');
      }else{

      let search = Promise.resolve(searchEmail(email));
      search.then((result)=>{
        if(result===-1){
          res.send('User Not found');
        }else{
          result.Name = name;
          result.Age = age;
          result.Password =CryptoJS.MD5(pass);
          res.send(result);
        }
      }).catch((er)=>{
        res.send(er);
      });
    }

  });

  //Delete request
  app.post('/user/delete',(req,res)=>{
    let email = req.body.Email;
    email = format(email);
    let search = Promise.resolve(searchEmail(email));

    search.then((result)=>{
      if(result== -1){
        res.send(false);
      }else{
        let deleteUser =Promise.resolve(deleteUserMethod(email));
        deleteUser.then(()=>{
            res.send(true);
        }).catch((er)=>{
          res.send(er;
        });

      }
    }).catch((er)=>{
      res.send(er);
    })
  });

  app.get('/user/list',(req, res)=>{
    res.send(Users);
  });




app.listen(3500);
