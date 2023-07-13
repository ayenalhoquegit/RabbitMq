const amqp = require('amqplib')
connect()
async function connect(){
    try{
        const amqpServer = "amqp://localhost:5672";
        const conection = await amqp.connect(amqpServer);
        const channel = await conection.createChannel();
        await channel.assertQueue("jobs");

        channel.consume("jobs", (msg)=>{
            const input = JSON.parse(msg.content.toString());
            console.log(`Recieved job with input ${input.number}`)
            console.log("Waiting for messages...")
        })
        
    }catch(ex){
        console.log(ex)
    }
}