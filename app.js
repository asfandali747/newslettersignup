const express=require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https= require("https")
const { url } = require("inspector")
const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/", function(req,res){

    const firstName = req.body.Fname
    const lastName = req.body.Lname
    const Email =req.body.email
    
    var data = {
        members: [
            {
            email_address: Email,
            status:"subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
            }
        ]
    }

    const JsonData = JSON.stringify(data)

    const url = "https://us21.api.mailchimp.com/3.0/lists/e127f464ac"
    
    const options ={
        method:"POST",
        auth: "asfand:0199de790a01d22cf5fa25f3ceb6b6e4-us21"

    }
    
    const request = https.request(url, options, function(response){
        
        if (response.statusCode === 200){
            res.sendFile(__dirname+"/success.html")
        } else {
            res.sendFile(__dirname+"/failure.html")
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data))
        })

    })


    request.write(JsonData)
    request.end()

})

app.listen(3000, function(req,res){
    console.log("server is running on port 3000")
})


// Api key:

// 0199de790a01d22cf5fa25f3ceb6b6e4-us21

// Id
// e127f464ac