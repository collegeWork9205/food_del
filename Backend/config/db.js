import mongoose from 'mongoose';

export const connectDb= async()=>{
    await mongoose.connect('mongodb://AnkitYadav:ankit9953@ac-dsxjlhy-shard-00-00.gcbwsiq.mongodb.net:27017,ac-dsxjlhy-shard-00-01.gcbwsiq.mongodb.net:27017,ac-dsxjlhy-shard-00-02.gcbwsiq.mongodb.net:27017/food-del?ssl=true&replicaSet=atlas-14700a-shard-0&authSource=admin&appName=Cluster0')
    console.log("Database is connected");
}
