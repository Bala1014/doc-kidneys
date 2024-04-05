const express = require("express");
const bodyParser = require("body-parser");

const port = 3001;

const app = express();
app.use(bodyParser.json());


let users = [{
    name : "john",
    age: 41,
    kidneys : [{
        health : "false"
    },{
        health : "true"
    }]
},{
    name : "doe",
    age: 43,
    kidneys : [{
        health : "true"
    },{
        health : "true"
    }]
}]

app.get('/getUserData', (req,res)=>{
    const username = req.body.username;
    // console.log(username);

    let numOfKidneys = 0;
    let i = 0
    for(i ; i < users.length; i++){
        if(users[i].name == username){
            console.log("yes user found");
            numOfKidneys = users[i].kidneys.length;
            break;
        }
    }

    let goodKidneys = 0, badKidneys = 0;
    for(let j = 0; j < users[i].kidneys.length; j++){
        if(users[i].kidneys[j].health == "false")badKidneys++;
        else if(users[i].kidneys[j].health == "true")goodKidneys++;
    }

    // let kid1 = users[i].kidneys[0].health === "true" ? "good" : "bad";
    // let kid2 = users[i].kidneys[1].health === "true" ? "good" : "bad";
    
    console.log(users[i].kidneys);
    res.send(`recieved, number of kidneys are ${numOfKidneys}, good-> ${goodKidneys} & bad-> ${badKidneys}`);
});

app.post('/addKidney', (req,res)=>{
    const input = req.body.health;
    console.log(input);
    let username = req.body.name;

    let i = 0
    for(i ; i < users.length; i++){
        if(users[i].name == username){
            console.log("yes");
            break;
        }
    }
    if(input == "good")users[i].kidneys.push({
        health : "true"
    })
    else if(input == "bad")users[i].kidneys.push({
        health : "false"
    })

    res.json({
        msg : "done"
    })
});

app.put('/replaceKidney', (req,res)=>{
    let username = req.body.name;
    let i = 0
    for(i ; i < users.length; i++){
        if(users[i].name == username){
            console.log("yes");
            break;
        }
    }

    if(noOfGoodKidneys(username,i) != users[i].kidneys.length){
        for(let j = 0; j < users[i].kidneys.length; j++){
            if(users[i].kidneys[j].health == "false"){
                users[i].kidneys[j].health = "true";
            }
            // else if(users[i].kidneys[j].health == "true")goodKidneys++;
        }
    
    
        res.json({msg : "all bad kidneys replaced" });
    }
    else{
        res.status(411).json({msg : "no bad kidneys present"})
    }

    
});

app.delete('/deleteKidneys', (req,res)=>{
    let username = req.body.username;
    let i = 0
    for(i ; i < users.length; i++){
        if(users[i].name == username){
            console.log("yes");
            break;
        }
    }

    if(noOfBadKidneys(username,i) > 0){
        const newKidneys = [];
        for(let j = 0; j < users[i].kidneys.length; j++){
            if(users[i].kidneys[j].health == "true"){
                // users[i].kidneys[j].health = "true";
                newKidneys.push({
                    health : "true"
                });
            }
        }
    
        users[i].kidneys = newKidneys;
        res.json({msg : "bad kidneys removed" });
    }
    else{
        res.status(411).json({msg : "no bad kidneys present to make healthy"});
    }

    
});
let noOfBadKidneys = (username,i)=>{
    let cnt = 0;

    for(let j = 0; j < users[i].kidneys.length; j++){
        if(users[i].kidneys[j].health == "false")cnt++;
    }

    return cnt;

}
let noOfGoodKidneys = (username,i)=>{
    let cnt = 0;

    for(let j = 0; j < users[i].kidneys.length; j++){
        if(users[i].kidneys[j].health == "true")cnt++;
    }

    return cnt;

}


app.get('/', (req, res)=>{
    res.send("server is ON and actively listing to requests");
});


app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});


