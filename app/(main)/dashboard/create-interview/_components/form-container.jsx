import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  MessagesSquare,
  Briefcase,
  Brain,
  Users,
  Sparkles,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const interviewTypes = [
  { label: "Technical", icon: Code2, color: "bg-blue-100 text-blue-700" },
  { label: "Behavioral", icon: MessagesSquare, color: "bg-gray-100 text-gray-700" },
  { label: "Experience", icon: Briefcase, color: "bg-indigo-100 text-indigo-700" },
  { label: "Problem Solving", icon: Brain, color: "bg-yellow-100 text-yellow-700" },
  { label: "Leadership", icon: Users, color: "bg-purple-100 text-purple-700" },
];

const FormContainer = ({ onHandleInputChange }) => {

  const [interviewType, setInterviewType] = useState([]);

  useEffect(()=>{
    if(interviewType){
      onHandleInputChange("type",interviewType)
    }
  },[interviewType])

  const addInterviewType=(type)=>{
    
  }

  return (
    <div className="p-6 rounded-2xl bg-white shadow-2xl space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-1 text-gray-700">Job Position</h3>
        <Input placeholder="e.g. Senior Frontend Developer" onChange={(e) => onHandleInputChange("jobPosition", e.target.value)} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-1 text-gray-700">Job Description</h3>
        <Textarea placeholder="Enter detailed job description..." className="min-h-[120px]" onChange={(e) => onHandleInputChange("jobDescription", e.target.value)} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-1 text-gray-700">Interview Duration</h3>
        <Select onValueChange={(value) => onHandleInputChange("duration", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 minutes</SelectItem>
            <SelectItem value="15">15 minutes</SelectItem>
            <SelectItem value="30">30 minutes</SelectItem>
            <SelectItem value="45">45 minutes</SelectItem>
            <SelectItem value="60">1 hour</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Interview Types</h3>
        <div className="flex flex-wrap gap-2">
          {interviewTypes.map(({ label, icon: Icon, color }) => {
            const isSelected = interviewType.includes(label);

            return (
              <Badge
                onClick={() =>
                  setInterviewType(prev =>
                    isSelected
                      ? prev.filter(item => item !== label)
                      : [...prev, label]
                  )
                }
                key={label}
                className={`
        flex cursor-pointer items-center gap-2 px-4 py-1 text-sm font-medium rounded-full
        transition-colors duration-200
        ${color}
        ${isSelected ? "border-2 border-black  ring-offset-1 ring-black" : ""}
      `}
              >
                <Icon size={16} />
                {label}
              </Badge>
            );
          })}

        </div>
      </div>
      <div className="flex justify-end mt-7">

        <Button className={"font-medium cursor-pointer"}> <Sparkles /> Generate Questions</Button>
      </div>
    </div>
  );
};

export default FormContainer;
