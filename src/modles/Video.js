import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    createdAt: { type: Date, required: true, default: Date.now },
    hashtags: [{type:String, trim: true}],
    meta:{
        views: {type: Number, default: 0, required: true},
        rating: {type: Number, default: 0, required: true}
    }
})

videoSchema.pre("save", function() {
    this.hashtags = this.hashtags[0].split(",").map(function(word){
        if(word.startsWith("#")){
            return word
        } else{
            return `#${word}`
        }
    })
})

const videoModel = mongoose.model("Video", videoSchema)

export default videoModel