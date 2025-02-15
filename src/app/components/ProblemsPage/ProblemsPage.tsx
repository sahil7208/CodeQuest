import { FC, useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import { IQuestion, questions } from "@/app/modals/questions";
import { FaQuestionCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const ProblemsPage: FC = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/questions", { method: "GET" });
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setQuestions(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);
console.log("questions: ",questions)

questions.map((question)=>{
console.log("question: ",question)
})
  useEffect(() => {
    Object.keys(refs.current).forEach((key) => {
      const content = refs.current[key];
      if (content) {
        if (key === expandedCategory) {
          gsap.fromTo(
            content,
            { x: -200, opacity: 0 },
            { x: 0, height: "auto", opacity: 1, duration: 1, ease: "power2.out" }
          );
        } else {
          gsap.to(content, { x: 200, height: 0, opacity: 0, duration: 0.5, ease: "power2.in" });
        }
      }
    });
  }, [expandedCategory]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  return (
    <div className="min-h-screen bg-[#0c0c29] p-8 z-0">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">
        <span className="bg-gradient-to-r from-purple-500 via-pink-400 to-orange-300 bg-clip-text text-transparent">
          Coding Questions
        </span>
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="loader border-t-4 border-purple-400 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : questions.length === 0 ? (
        <div className="text-center text-gray-400">
          <FaQuestionCircle size={48} className="mx-auto mb-4" />
          No questions available. Please check back later!
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-4">
          {questions.map((category: IQuestion) => (
           
            <div key={category._id as string} className="bg-[#1a1a3b] shadow-lg rounded-lg overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.category)}
                className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg hover:shadow-lg transition-shadow"
              >
                <span>
                  <FaQuestionCircle className="inline-block mr-2" />
                  {category.category}
                </span>
                <IoIosArrowDown
                  className={`transform transition-transform ${
                    expandedCategory === category.category ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Content */}
              <div
                ref={(el) => {
                  refs.current[category.category] = el;
                }}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
               <ul className="divide-y divide-gray-600">
  {category.questions.map((question: questions, index: number) => (
    question?.status === "Unlocked" ? (
      <Link key={index} href={`/problems/${question.id}`}>
        <li
          className="grid grid-cols-3 px-6 py-3 opacity-100 hover:bg-[#2a2a5b] transition-colors"
        >
          <span className="font-medium text-white">
            {question.id}. {question.title}
          </span>
          <span
            className={`px-2 py-1 rounded-md text-xs mx-16 my-2 flex justify-center items-center ${
              question.difficulty === "Easy"
                ? "bg-green-100 text-green-700"
                : question.difficulty === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {question.difficulty}
          </span>
          <span
            className={`text-sm ml-16 ${
              question.status !== "Unlocked"
                ? "text-gray-500"
                : "text-orange-400 font-semibold"
            }`}
          >
            {question.status}
          </span>
        </li>
      </Link>
    ) : (
      <li
        key={question?.id}
        className="grid grid-cols-3 px-6 py-3 opacity-50 cursor-not-allowed"
      >
        <span className="font-medium text-white">
          {question?.id}. {question?.title}
        </span>
        <span
          className={`px-2 py-1 rounded-md text-xs mx-16 my-2 flex justify-center items-center ${
            question?.difficulty === "Easy"
              ? "bg-green-100 text-green-700"
              : question?.difficulty === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {question?.difficulty}
        </span>
        <span
          className={`text-sm ml-16 ${
            question?.status === "🔒Locked"
              ? "text-gray-500"
              : "text-orange-400 font-semibold"
          }`}
        >
          {question?.status}
        </span>
      </li>
    )
  ))}
</ul>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProblemsPage;
