bankneeded={klakja:"klkjflskd"}
var http=require('http')
var server=http.createServer(function (request,res){



const transactionlist = JSON.stringify({bankneeded

});


    const options = {
        hostname: '127.0.0.1',
        port: 9000,
        path: '/transactionforprocessing',
        method: 'POST',
        headers: {
        'Content-Type': 'text/json',
        'Content-Length': transactionlist.length,
        },
    };
    
    const req = http.request(options, res => {
        console.log('statusCode: ${res.statusCode}');
    
        res.on('data', d => {
        process.stdout.write(d);
        });
    });
    
    req.on('error', error => {
        console.error(error);
    });
    
    req.write(JSON.stringify({bankneeded}));
    req.end();

})
server.listen(2329,'127.0.0.1')


