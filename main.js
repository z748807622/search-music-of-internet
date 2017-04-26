var express = require('express');
var bodyParser = require('body-parser');
var find = require('./models/find');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));

app.post('/find',function (req,res) {
    var name = req.body.name;
    var method = req.body.method;
    //res.send('123');
    console.log(name+method)
    switch(method){
    	case 'baidu':find.baidu(res,name,function(data){
    		res.json(data);
    		return;
    	})
    	break;
    	case 'kugou':find.kugou(res,name,function(data){
    		res.json(data);
    		return;
    	})
    	break;
    	default:
    }
});
app.listen(3000);
