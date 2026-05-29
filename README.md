# 🤖 AI Interview Generator

> 🚀 **Live Demo:** [ai-interview-report-p935.vercel.app](https://ai-interview-report-p935.vercel.app)

An AI-powered full-stack web application that analyzes your resume, self description and job description to generate a personalized interview preparation plan — including technical questions, behavioral questions, skill gap analysis, a day-by-day preparation roadmap, and a downloadable AI-generated resume PDF.

---

## ✨ Features

- **🔐 Authentication** — Secure register, login, and logout with JWT cookies
- **📄 Resume Upload** — Upload your resume as a PDF (up to 3MB)
- **🧠 AI Report Generation** — Powered by Google Gemini, generates:
  - Match score between your profile and the job
  - Technical interview questions with intentions and model answers
  - Behavioral interview questions with intentions and model answers
  - Skill gap analysis with severity levels (low / medium / high)
  - Day-by-day preparation roadmap with tasks
- **📥 AI Resume PDF Download** — Generates and downloads an AI-tailored resume as a PDF using Puppeteer
- **📋 Past Reports** — View all previously generated interview reports

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- React Router
- Axios
- SCSS

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Multer (file uploads)
- pdf-parse (PDF text extraction)
- Puppeteer (PDF generation)
- Google Gemini API (`@google/genai`)

## ⚙️ Local Setup

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-interview-generator.git
cd ai-interview-generator
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_API_KEY=your_google_gemini_api_key
```

Start the backend server:

```bash
node server.js
# or with nodemon
nodemon server.js
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `GOOGLE_API_KEY` | Google Gemini API key |

---

## 📡 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register a new user | Public |
| POST | `/login` | Login and receive JWT cookie | Public |
| GET | `/logout` | Logout and clear cookie | Public |
| GET | `/get-me` | Get logged-in user details | Private |

### Interview Routes — `/api/interview`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/` | Generate a new interview report | Private |
| GET | `/` | Get all reports for logged-in user | Private |
| GET | `/report/:interviewId` | Get a specific report by ID | Private |
| POST | `/resume/pdf/:interviewReportId` | Download AI-generated resume PDF | Private |

---

## 🚀 Usage

1. **Register / Login** to your account
2. On the home page, paste the **job description** of the role you're targeting
3. Upload your **resume PDF** or write a **self description**
4. Click **Generate My Interview Strategy**
5. View your personalized report:
   - Browse **Technical** and **Behavioral** questions
   - Check your **Skill Gaps** and **Match Score**
   - Follow the **Preparation Roadmap**
6. Download your **AI-tailored resume PDF** from the report page

---

## 📌 Notes

- Resume upload limit is **3MB**
- AI generation takes approximately **20–30 seconds**
- Powered by **Google Gemini 2.0 Flash**

---

## 👨‍💻 Author

**Aryan Singh**  
3rd Year Btech Student | ABES Engineering College
