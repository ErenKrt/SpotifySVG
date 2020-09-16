const { default: Axios } = require('axios');
const { response, json } = require('express');
const express = require('express'),engines = require('consolidate'),imageToBase64 = require('image-to-base64');
const app = express()
const port = 3180

const Token="";

app.use(express.static(__dirname + '/HTML'));
app.engine('html', engines.mustache);
app.set('view engine', 'html');


function ResParser(res){
  if(res!=undefined){
    var Bol= res.split('/');
    if(Bol.length==2 && Bol[0]!="" && Bol[1]!=""){
      var _Width= Bol[0];
      var _Height=Bol[1];

      if(_Height<=300){
        _Height=300;
      }
      if(_Width<=330){
        _Width=330;
      }
      return {width:_Width,height:_Height};
    }else{
      return {width:"385",height:"580"};
    }
  }else{
    return  {width:"385",height:"580"};
  }
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function ImageUrlToBase64(Url){
  return new Promise(function(resolve, reject) { 
    imageToBase64(Url)
    .then(
        (response) => {
            resolve(response);
        }
    )
    .catch(
        (error) => {
           resolve("");
        }
    )
 });
}

app.get('/SVG', async (req, res) => {

  var Res=ResParser(req.query.res);

  Axios.get("https://open.spotify.com/get_access_token?reason=transport&productType=web_player",{ 
    headers: 
    {
        'Connection':'keep-alive',
        'accept':'application/json',
        'Sec-Fetch-Dest':'empty',
        'accept-language':'tr',
        'app-platform':'WebPlayer',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
        'spotify-app-version':'1591753763',
        'Sec-Fetch-Site':'same-origin',
        'Sec-Fetch-Mode':'cors',
        'Referer':'https://open.spotify.com/',
        'Cookie':'sp_dc='+Token
    }
  }).then(Response=>{
      var Bearer= Response.data.accessToken;
      Axios.get("https://api.spotify.com/v1/me/player/currently-playing",{headers:{'Authorization':'Bearer '+Bearer}})
      .then(async Resp=>{
          if(Resp!=undefined && Resp!="" && Resp.data!=undefined && Resp.data!=""){
            var Artists=[];
            Resp.data.item.artists.forEach(Artist => {
              Artists.push({
                Name:Artist.name,
                Url: Artist.external_urls.spotify
              });
            });
           

            var Sarki={
              CurrentTime:millisToMinutesAndSeconds(Resp.data.progress_ms),
              MaxTime:millisToMinutesAndSeconds(Resp.data.item.duration_ms),
              Progress:((100/Resp.data.item.duration_ms)*Resp.data.progress_ms),
              Album:{
                Name:Resp.data.item.album.name,
                Image:"data:image/png;base64,"+(await ImageUrlToBase64(Resp.data.item.album.images[0].url)),
                Url:Resp.data.item.album.external_urls.spotify
              },
              Artists:Artists,
              Song:{
                Name:Resp.data.item.name,
                Url:Resp.data.item.external_urls.spotify
              }
            };

            res.cookie("Song",JSON.stringify(Sarki));
            res.contentType("image/svg+xml").render(__dirname+"/HTML/svg.html",{Resolution:Res,HaveSong:true,Song:Sarki});
          }else{
            res.contentType("image/svg+xml").render(__dirname+"/HTML/svg.html",{Resolution:Res,HaveSong:false});
          }
          
      }).catch(err=>{
          res.send({Statu:"Failed",Message:err.message});
      })
  }).catch(err=>{
      res.send({Statu:"Failed",Message:err.message});
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})