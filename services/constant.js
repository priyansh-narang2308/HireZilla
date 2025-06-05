import { Calendar, LayoutDashboardIcon, List, Settings, WalletCards } from "lucide-react";

export const SidebarOptions = [
  {
    name: "Dashboard",
    icon: LayoutDashboardIcon,
    path: "/dashboard"
  },
  {
    name: "Scheduled Interview",
    icon: Calendar,
    path: "/scheduled-interview"
  },
  {
    name: "My Interviews",
    icon: List,
    path: "/all-interview"
  },
  {
    name: "Billing",
    icon: WalletCards,
    path: "/billing"
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings"
  }
];
export const QUESTION_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: {{jobTitle}}
Job Description:{{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}
📝 Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.
 Format your response in JSON format with array list of questions.
 Give the number of questions according to the {{duration}} provided .
format: interviewQuestions=[
{
  question:"",
  type:'Technical/Behavioral/Experience/Problem Solving/Leadership'
},{
...
}]
Respond ONLY with raw JSON. Do NOT include any explanation, description, or markdown formatting.
Response should start and end with just a JSON array.
🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`;


export const FEEDBACK_PROMPT =`{{conversation}}
Depends on this Interview Conversation between assistant and user,
Give me feedback for user interview. Give me rating out of 10 for Technical Skills, Communication, Problem Solving, Experience. Also give me summary in 3 lines about the interview and one line to let me know whether it is recommended for hire or not with a message. Give me response in JSON format.

{
  "feedback": {
    "rating": {
      "technicalSkills": 5,
      "communication": 6,
      "problemSolving": 4,
      "experience": 7
    },
    "summary": "<in 3 lines>",
    "recommendation": "",
    "recommendationMsg": ""
  }
}
`