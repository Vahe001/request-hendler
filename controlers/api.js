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

    if(!postdata.urls || (postdata.urls.length == 1 && !postdata.urls[0]))
    {
        return res.send("error")
    }

    console.log(postdata.urls);

    let all_requests = postdata.urls.map(url => {
        return new Promise((resolve, reject) => {
            let options = {
                url: url,
                method: 'POST',
                form: postdata.data
            };

            request(options, function (error, response, body) {
                if (error) return reject(error);

                return resolve(body);
            });
        });
    });

    Promise.all(all_requests).then(results => {
        return res.send(results);
    }).catch(err => {
        return res.send(err);
    });



    })
  }
}

module.exports = new api_v1();
