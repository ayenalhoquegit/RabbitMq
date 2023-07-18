const amqp = require('amqplib')
connect()
async function connect(){
    try{
        const msg = process.argv.slice(2).join(' ') || 'Hello World!';
        const exchange = "logs";
        const amqpServer = "amqp://localhost:5672";
        const conection = await amqp.connect(amqpServer);
        const channel = await conection.createChannel();
        channel.assertExchange(exchange, 'fanout', {durable: false});
        channel.publish(exchange, '', Buffer.from(msg));
        console.log(`Log sent successfully ${msg}`);
        setTimeout(async function() {
            await channel.close();
        await conection.close();
        }, 500);
        
    }catch(ex){
        console.log(ex)
    }
}