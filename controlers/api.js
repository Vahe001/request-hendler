const request = require("request")
const axios = require("axios");

class api_v1 {
  initilaize(app){

    app.post("/", (req,res)=>{

    let postdata ={
      urls: req.body.urls.split(","),
      data: req.body.data,
      hook_time: Date.now()
    }

    if(!postdata.urls || (postdata.urls.length == 1 && !postdata.urls[0])){
        return res.send("error")
    }

    res.send("Thanks for your post request. \n Request is handling");

    let all_requests = postdata.urls.map(url => {

        return new Promise((resolve, reject) => {
            let request_obj = {
                options : {
                url: url,
                method: 'POST',
                form: postdata.data
            },
            count: 0
        }
        var id = setInterval(function(){
            request(request_obj.options, function (error, response, body) {
            if (error) {
                if(request_obj.count === 5) clearInterval(id);
                request_obj.count++;
                console.log(request_obj.count)
                reject(false)
            }
            console.log(request_obj.count)
            console.log(body)
            clearInterval(id);
            resolve(true)
            })
    }, 10000)

    }).then(data=>{
        console.log(data)
    }).catch(err =>{
        console.log(err);
    });

    });


    })
  }
}

module.exports = new api_v1();
