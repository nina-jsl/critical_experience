"use client";
import React from "react";
import { useState } from "react";
import Question from "@/components/Question";
import Story from "@/components/Story";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Nav from "@/components/Nav";
import Alert from "@/components/Alert"

const DoctorPage = () => {
  const stories: string[] = [
    "The doctor’s journey begins in medical school. They dedicate their entire life to reading, taking exams, and practicing surgeries. They feel pressure to perform, with constant fear of failure. While passionate at first, the grueling process leaves them exhausted and emotionally drained.",
    "As a newly minted doctor, they face real patients and life-or-death situations. The stress is immense, and the responsibility feels suffocating. Every mistake or failure feels like a personal catastrophe. They enter each room with fear in their heart, uncertain if they will succeed..",
    "Years of coping with patients' suffering and death begin to harden the doctor’s emotions. They’ve seen too much pain, and to protect themselves, they start to detach. What once brought compassion now brings a sense of routine. Empathy fades as they begin to treat patients more like tasks to be checked off, no longer emotionally engaging with their suffering.",
    "Over time, the doctor becomes more focused on maximizing profit than on patient care. They start raising the cost of treatments, recommending unnecessary procedures, and limiting the number of patients they see each day to increase their personal income. The once ethical healer has turned into a business-minded operator, driven by greed.",
    "After years of emotional exhaustion, the doctor now only does the bare minimum. They’ve burned out completely. Once ambitious, they now avoid complex cases and opt for easier patients or procedures. Their passion for medicine is gone, and they no longer care about helping others—they just want to get through the day.",
    "As the doctor nears the end of their career, they reflect on the paths they’ve taken. Once full of hope and idealism, they’ve become detached, profit-driven, and disillusioned. They wonder if they’ve lost who they truly were or if this was always part of their journey. Have they become something else, or was this their true self all along?",
  ];

  const questions: string[] = [
    "Before we begin, what comes to mind when you think of a doctor? What do you believe their job entails, and how do you imagine they feel while doing their work?",
    "What do you think it takes to become a doctor? How do you think a doctor feels during this stage of their training?",
    "How do you imagine a doctor feels in their first year on the job? What kind of challenges might they face as they transition from training to practice?",
    "What happens when a doctor has seen too much suffering? How do you think their ability to connect with patients changes over time?",
    "When doctors start focusing on profits rather than patients, how do you think it affects their behavior? What drives this change in priorities?",
    "How do you think a doctor feels when they reach burnout? What impact does it have on their ability to care for patients?",
  ];

  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentStage, setCurrentState] = useState<number>(0);
  const [isStoryVisible, setIsStoryVisible] = useState<boolean>(false);
  const [background, setBackground] = useState<string>("bg-white");
  const [isSummaryVisible, setIsSummaryVisible] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleAnswerSubmit = (answer: string) => {
    const updatedAnswers: string[] = [...userAnswers];
    updatedAnswers[currentStage] = answer;
    setUserAnswers(updatedAnswers);
    if (currentStage === questions.length - 1) {
      // If the last question has been answered, show the summary
      setIsSummaryVisible(true);
    } else {
      setIsStoryVisible(true); // Show the story after submitting the answer
    }
  };

  const goToNextStage = () => {
    if (currentStage < stories.length - 1) {
      setCurrentState(currentStage + 1);
      changeBackground(currentStage + 1);
      setIsStoryVisible(false);
    } else {
      console.log("All stages completed");
      setIsSummaryVisible(true);
    }
  };

  const changeBackground = (stage: number) => {
    const backgroundClasses: string[] = [
      "bg-blue-200", // Stage 1 - Med school
      "bg-yellow-100", // Stage 2 - Fear in the industry
      "bg-gray-300", // Stage 3 - Desensitization
      "bg-red-200", // Stage 4 - Corruption
      "bg-black text-white", // Stage 5 - Burnout
    ];
    setBackground(backgroundClasses[stage]);
  };

  const handleAlert = () => {};
  return (
    <div className="h-screen overflow-hidden">
      <Nav />
      <div className="z-0 h-[90%] flex flex-row justify-center items-center">
        {isStoryVisible ? (
          // Show the Story component after submitting the answer
          <Story storyText={stories[currentStage]} backgroundClass={background}>
            <button
              className="mt-4 bg-transparent px-4 py-2 rounded-md flex items-center hover:text-blue-500"
              onClick={goToNextStage}
            >
              Next{" "}
              <FaArrowRight className="ml-2 text-sm hover:text-blue-500 bg-transparent" />
            </button>
          </Story>
        ) : (
          // Show the Question component before showing the story
          <Question
            questionText={questions[currentStage]}
            onSubmitAnswer={handleAnswerSubmit}
          />
        )}
      </div>

      {isSummaryVisible && (
        <div>
          {/* Render the last question */}
          <Question
            questionText={questions[questions.length - 1]}
            onSubmitAnswer={handleAnswerSubmit}
          />
          {/* The last question ends, and the summary is shown */}
          <div className="absolute top-0 left-0 w-screen h-screen bg-white z-10 flex justify-center items-center">
            <div>
              <h3>
                This is how your perception of a doctor has evolved over time...
              </h3>
              <ul>
                {userAnswers.map((answer, index) => (
                  <li key={index}>{`Stage ${index + 1}: ${answer}`}</li>
                ))}
              </ul>
              <div className="flex w-full justify-end">
                <button
                  className="end-button bg-blue-500 px-4 py-2 text-white rounded-md"
                  onClick={handleAlert}
                >
                  End
                </button>
              </div>
            </div>
            <div className = "absolute top-0 left-0 z-20">
              {showAlert && (<Alert />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPage;
