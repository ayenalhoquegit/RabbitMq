const amqp = require('amqplib')
const msg = {number:process.argv[2]}
connect()
async function connect(){
    try{
        const amqpServer = "amqp://localhost:5672";
        const conection = await amqp.connect(amqpServer);
        const channel = await conection.createChannel();
        await channel.assertQueue("jobs");
        await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
        console.log(`Job sent successfully ${msg.number}`);
        await channel.close();
        await conection.close();
    }catch(ex){
        console.log(ex)
    }
}