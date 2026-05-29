const mongoose = require('mongoose');

/**
 * -job description : string
 * -resume : string
 * -self description : string
 * 
 * -matchscore : number
 * 
 * -Technical questions : [{
 *          questions : ""
 *          intention : ""
 *          answer : ""
 *          }]
 * 
 * -Behavioral question : [{
 *          question : ""
 *          intention : ""
 *          answer : ""
 *          
 *          }]
 * 
 * -skill gaps : [{
 *          skills : ""
 *          severity : ""
 *          type : string
 *          enum : ['low', 'med' , 'high']          
 *          }]
 * 
 * -preparation plan : [{
 *          days : number
 *          focus : string
 *          tasks : [string]
 *          }]
 * 
 */

const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"technical question required"]
    },
    intention:{
        type:String,
        required:[true,"intention required"]
    },
    answer:{
        type:String,
        required:[true,"technical answer required"]
    }
},{
    _id:false
})

const BehavioralQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"behavioral question required"]
    },
    intention:{
        type:String,
        required:[true,"intention required"]
    },
    answer:{
        type:String,
        required:[true,"behavioral answer required"]
    }
},{
    _id:false
})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"skills are required"]
    },
    severity:{
        type:String,
        enum:["low", "medium" ,"high"],
        required:[true, "severity is req.."]
    }
},{
    _id:false
})

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"day is required"]
    },
    focus:{
        type:String,
        required:[true,"Focus is required"]
    },
    tasks:[{
        type:String,
        required:[true,"Tasks are required"]
    }]
},{
    _id:false
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required: [true, "Job description is required"]
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore:{
        type: Number,
        min: 0,
        max:100
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [BehavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "users"        
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    }
},{
    timestamps: true
})

const interviewReportModel = mongoose.model("InterviewReport",interviewReportSchema);

module.exports = interviewReportModel;