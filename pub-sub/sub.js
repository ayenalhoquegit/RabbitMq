const amqp = require('amqplib')
const exchange = "logs";
connect()
async function connect(){
    try{
        const amqpServer = "amqp://localhost:5672";
        const conection = await amqp.connect(amqpServer);
        const channel = await conection.createChannel();
        channel.assertExchange(exchange, 'fanout', {durable: false});

        // channel.assertQueue('', {
        //     exclusive: true
        //   }, (error2, q)=> {
        //     if (error2) {
        //       throw error2;
        //     }
        //     console.log(" [*] Waiting for messages in %s", q.queue);
        //     channel.bindQueue(q.queue, exchange, '');
      
        //     channel.consume(q.queue, (msg) =>{
        //       if(msg.content) {
        //           console.log(" [x] %s", msg.content.toString());
        //         }
        //     }, {
        //       noAck: true
        //     });
        //   });

        channel.assertQueue('', {exclusive: true});
        channel.bindQueue('', exchange, '');
        channel.consume('', (msg)=>{
          console.log("Waiting for messages...")
          if (msg.content) {
            console.log(" [x] %s", msg.content.toString());
          }   
        },{noAck: true})

    }catch(ex){
        console.log(ex)
    }
}