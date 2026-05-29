const {GoogleGenAI} = require("@google/genai");
const {z} = require("zod");
const {zodToJsonSchema} = require("zod-to-json-schema");
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLE_API_KEY
})  

const AiInterviewReportSchema = z.object({
    matchScore: z.number().describe("The match score between the candidate and the job description, on a scale of 0 to 100"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The Technical Question that can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking the question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approch to take, what are the common mistakes to avoid")
    })).describe("Technical questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The Behavioral Question that can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking the question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approch to take, what are the common mistakes to avoid")
    })).describe("Behavioral questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill that the candidate is lacking and needs to improve"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap, whether it is low, medium or high"),
    })).describe("The skill gaps that the candidate has, along with the severity of each skill gap"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan,starting from 1"),
        focus: z.string().describe("The main focus of that day in the preparation plan"),
        tasks: z.array(z.string()).describe("The tasks to be done on that day in the preparation plan")
    })).describe("The preparation plan for the candidate, with daily focus and tasks to be done"),
    title: z.string().describe("The title of the job for which the interview report is generated")
})

async function generateInterviewReport({resume,selfDescription,jobDescription}){

    const prompt = `Generate an interview report for a candidate based on the following information:
                    resume: ${resume}

                    selfDescription: ${selfDescription}

                    jobDescription: ${jobDescription}
                    
`
    const response = await ai.models.generateContent({
        model:"gemini-3-flash-preview",
        contents: prompt,
        config:{
            responseMimeType:"application/json",
             responseSchema: {               
                type: "object",
                required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"],
                properties: {
                    title:{type: "string", description: "The title of the job for which the interview report is generated"},
                    
                    matchScore: {
                        type: "number",
                        description: "Match score between candidate and job description, 0 to 100"
                    },
                    technicalQuestions: {
                        type: "array",
                        items: {
                            type: "object",
                            required: ["question", "intention", "answer"],
                            properties: {
                                question: { type: "string" },
                                intention: { type: "string" },
                                answer: { type: "string" }
                            }
                        }
                    },
                    behavioralQuestions: {
                        type: "array",
                        items: {
                            type: "object",
                            required: ["question", "intention", "answer"],
                            properties: {
                                question: { type: "string" },
                                intention: { type: "string" },
                                answer: { type: "string" }
                            }
                        }
                    },
                    skillGaps: {
                        type: "array",
                        items: {
                            type: "object",
                            required: ["skill", "severity"],
                            properties: {
                                skill: { type: "string" },
                                severity: { type: "string", enum: ["low", "medium", "high"] }
                            }
                        }
                    },
                    preparationPlan: {
                        type: "array",
                        items: {
                            type: "object",
                            required: ["day", "focus", "tasks"],
                            properties: {
                                day: { type: "number" },
                                focus: { type: "string" },
                                tasks: {
                                    type: "array",
                                    items: { type: "string" }
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    return JSON.parse(response.text)
}


async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        }
    })


    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}

module.exports = { generateInterviewReport, generateResumePdf }