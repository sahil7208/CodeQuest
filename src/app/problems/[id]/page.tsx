"use client";
import { FC, useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { Squestions } from "@/app/modals/SpecificQuestions";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java"; // Java syntax
import { oneDark } from '@codemirror/theme-one-dark';
import gsap from "gsap";
import { EditorView } from '@codemirror/view';
import { useRouter } from "next/navigation";




const ProblemDetailsPage: FC = () => {
  const { id } = useParams();
  const [code, setCode] = useState<String>();
  const [loading, setLoading] = useState(false);
  const [loadingforSubmit, setLoadingforSubmit] = useState(false);
  const [loadingforRun, setLoadingforRun] = useState(false);
  const [compilerResult, setCompilerResult] = useState("");
  const [questions, setQuestions] = useState<Squestions | null>(null);
  const [results, setResults] = useState<string[]>([]);
  const [flip,setFlip] = useState(false)
  const [canSubmit, setCanSubmit] = useState<Boolean>(false);
  const [isRunDisabled,setIsRunDisabled] = useState(false)
const [showRewrite,setShowRewrite] = useState(false)
 


  const compilerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/SpecificQuestions/${id}`, {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch questions")
        }
        const data: Squestions = await res.json();
        console.log(data);
        setQuestions(data);
      } catch (err: any) {
        console.log(err)
      }
    }
    fetchQuestions();
  }, [id])

  console.log("questions at s:", questions)



  const handleRun = async () => {

    // Simulate a compilation process

    if (!questions || !questions.testCases || !code?.trim()) {
      alert("Plese provide code")
      return;
    }
    setLoadingforRun(true);
    setIsRunDisabled(true);

    const compiler = compilerRef.current;
    if(compiler){
      gsap
      .timeline()
      .to(compiler,{rotateY: 180,opacity:0, duration: 0.5, })

      .call( () => {
        setFlip(true);
      })
      .to(compiler, { rotateY: 0,opacity:1, duration: 1 })
    }
     
        const testResults: string[] = [];



    try {
      for (const testCase of questions?.testCases) {
        const generateStdin = (testCase: any) => {
          const questionTitle = questions.title.toLowerCase();
          console.log("question title: ", questionTitle)
          if (questionTitle.includes("two sum")) {
            const numsString = testCase.input.match(/\[.*\]/)[0]; // Extract the array part, e.g., "[2,7,11,15]"
            const nums = JSON.parse(numsString); // Parse it into a JavaScript array
            const target = testCase.target;

            // Construct `stdin`
            // const size = nums.length;
            const numsAsString = nums.join(" ");
            return `${numsAsString}\n${target}`;
          } else if (questionTitle.includes("best time to buy and sell stocks")) {
            const numsString = testCase.input.match(/\[.*\]/)[0];
            const nums = JSON.parse(numsString);
            const numsAsString = nums.join(" ");
            return `${numsAsString}`;
          } else if (questionTitle.includes("reverse string")) {
            const numsString = testCase.input.match(/\[.*\]/)[0];
            const nums = JSON.parse(numsString);
            const numsAsString = nums.join(" ");
            return `${numsAsString}`;
          } else if (questionTitle.includes("longest palindromic substring")) {
            const inputString = testCase.input.match(/"([^"]+)"/)?.[1]; // Extract the content inside quotes
            if (inputString) {
              return inputString.split("").join(" "); // Split characters and join with spaces
            }

          } else if (questionTitle.includes("reverse linked list")) {
            const numsString = testCase.input.match(/\[.*\]/)[0];
            const nums = JSON.parse(numsString);
            const numsAsString = nums.join(" ");
            return `${numsAsString}`;
          } else if (questionTitle.includes("detect cycle in linked list")) {
            const numsString = testCase.input.match(/\[.*\]/)[0];
            const nums = JSON.parse(numsString);
            const numsAsString = nums.join(" ");
            return `${numsAsString}\n${testCase.target}`;
          } else if (questionTitle.includes("valid parentheses")) {
            const numsString = testCase.input.match(/"([^"]+)"/)?.[1];

            const numsAsString = numsString.split("").join("");
            return `${numsAsString}`;
          } else if (questionTitle.includes("min stack")) {
            // Extract input arrays using regular expressions
            const matches = testCase.input.match(/\[.*?\](?=\s*\[|\s*$)/g);  // Match each array (with non-greedy behavior)

            const numsString1 = matches[0];  // First array (["MinStack", "push", "push", "push", "getMin", "pop", "top", "getMin"])
            const numsString2 = matches[1];  // Second array ([[], [-2], [0], [-3], [], [], [], []])

            console.log("numsString1: ", numsString1);
            console.log("numsString2: ", numsString2);

            // Parse the input arrays from strings into JavaScript objects
            const operations = JSON.parse(numsString1);  // This will be the operations array ["MinStack", "push", "push", "push", "getMin", "pop", "top", "getMin"]
            const values = JSON.parse(numsString2);  // This will be the values array [[], [-2], [0], [-3], [], [], [], []]

            // Format the strings as needed
            const operationsAsString = operations.join(" ");
            const valuesAsString = values.map((value: any) => JSON.stringify(value)).join(" ");

            // Return formatted string
            return `${operationsAsString}\n${numsString2}`;
          }

          else if (questionTitle.includes("largest rectangle in histogram")) {
            const numsString = testCase.input.match(/\[.*\]/)[0];
            const nums = JSON.parse(numsString);
            const numsAsString = nums.join(" ");
            return `${numsAsString}`;
          } else if (questionTitle.includes("implement queue using stacks ")) {
            const numsString = testCase.input.match(/\[.*\]/)[0];
            const nums = JSON.parse(numsString);
            const numsAsString = nums.join(" ");
            return `${numsAsString}`;
          } else if (questionTitle.includes("sliding window maximum")) {
            const numsString = testCase.input.match(/\[.*\]/)[0];
            const nums = JSON.parse(numsString);
            const numsAsString = nums.join(" ");
            return `${numsAsString}\n${testCase.target}`;
          }
          else if (questionTitle.includes("circular queue")) {
            const numsString = testCase.input.match(/\[.*\]/)[0];
            const nums = JSON.parse(numsString);
            const numsAsString = nums.join(" ");
            return `${numsAsString}`;
          }
          else if (questionTitle.includes("maximum depth of binary tree")) {
            const numsString = testCase.input.match(/\[.*\]/)[0];
            const nums = JSON.parse(numsString);
            const numsAsString = nums.join(" ");
            return `${numsAsString}`;
          }
          else if (questionTitle.includes("validate binary tree")) {
            const numsString = testCase.input.match(/\[.*\]/)[0];
            const nums = JSON.parse(numsString);
            const numsAsString = nums.join(" ");
            return `${numsAsString}`;
          }
          else if (questionTitle.includes("serialize and deserialize")) {
            const numsString = testCase.input.match(/\[.*\]/)[0];
            const nums = JSON.parse(numsString);
            const numsAsString = nums.join(" ");
            return `${numsAsString}`;
          } else if (questionTitle.includes("graph valid tree")) {
            const numsString = testCase.input.match(/\[.*\]/)[0];
            const nums = JSON.parse(numsString);
            const numsAsString = nums.join(" ");
            return `${numsAsString}`;
          } else if (questionTitle.includes("course schedule")) {
            const numsString = testCase.input.match(/\[.*\]/)[0];
            const nums = JSON.parse(numsString);
            const numsAsString = nums.join(" ");
            return `${numsAsString}`;
          } else if (questionTitle.includes("minimum spanning tree")) {
            const numsString = testCase.input.match(/\[.*\]/)[0];
            const nums = JSON.parse(numsString);
            const numsAsString = nums.join(" ");
            return `${numsAsString}`;
          } else if (questionTitle.includes("climbing stairs")) {
            const numsString = testCase.input.match(/\[.*\]/)[0];
            const nums = JSON.parse(numsString);
            const numsAsString = nums.join(" ");
            return `${numsAsString}`;
          } else if (questionTitle.includes("longest increasing subsequence")) {
            const numsString = testCase.input.match(/\[.*\]/)[0];
            const nums = JSON.parse(numsString);
            const numsAsString = nums.join(" ");
            return `${numsAsString}`;
          } else if (questionTitle.includes("edit distance")) {
            const numsString = testCase.input.match(/\[.*\]/)[0];
            const nums = JSON.parse(numsString);
            const numsAsString = nums.join(" ");
            return `${numsAsString}`;
          }
        };
        console.log("Generated stdin: ", generateStdin(testCase));
        const SubmissionData = JSON.stringify({
          language_id: '62',
          source_code: code,
          stdin: generateStdin(testCase),
          redirect_stderr_to_stdout: true,
        })
        const submissionResponse = await axios.post("/api/judge0/submissions", SubmissionData, {
          headers: {
            'x-rapidapi-key': '58493a33a0msh7bc55e0a5784767p1a9e4ejsn8a774b36e82b',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
          },
        });
        console.log("Submission response:", submissionResponse.data);
        const token = submissionResponse.data.token;

        const resultResponse = await new Promise((resolve) => {
          setTimeout(async () => {
            const result = await axios.get(`/api/judge0/submissions/${token}`,
              {
                params: {
                  base64_encoded: 'true',
                  fields: '*'
                },
                headers: {
                  'x-rapidapi-key': '58493a33a0msh7bc55e0a5784767p1a9e4ejsn8a774b36e82b',
                  'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
                }
              }
            );
            resolve(result.data);
          }, 3000);
        })

        const result = resultResponse as any;
        console.log("result: ", result)
        console.log("status id: ", result.status_id);
        console.log("status description : ", result.status.description);
        console.log("stdOut: ", result.stdout)
        const decodedStdout = atob(result.stdout)
        console.log("decoded: ", decodedStdout)
        const actualOutput = decodedStdout ? decodedStdout.trim() : "Error or no output";
        console.log("actual output: ", actualOutput)

        const isCorrect = actualOutput.trim() === testCase.expectedOutput.replace(/[\[\],"']/g, "").replace(/(\d)(?=\d)/g, '$1 ').trim();
        console.log("expected output: ", testCase.expectedOutput.replace(/[\[\],"']/g, "").replace(/(\d)(?=\d)/g, '$1 ').trim());
        
        if(isCorrect){
          setTimeout(() => {setCanSubmit(true);},5000)
          

        }else{
          setCanSubmit(false)
          setIsRunDisabled(false)
        }

        testResults.push(`Test Case: Input(${testCase.input}) - Expected(${testCase.expectedOutput}) - Actual(${actualOutput}) - ${isCorrect ? "✔️ Passed" : "❌ Failed"}`)
      }
      setResults(testResults);
      // gsap.fromTo('.result-container', { opacity: 0 }, { opacity: 1, duration: 1 });
    } catch (error: any) {
      testResults.push("Error occurred while running the code.");
      setResults(testResults);
      console.log(error);
      setIsRunDisabled(false)
    }
    finally {
      setLoadingforRun(false)
      
    }
     
    
  };
  const router = useRouter();
  const handleSubmit = async () => {
    if (!canSubmit) {
      alert("Please pass all test cases before submission.");
      return;
    }
   
  
    setLoadingforSubmit(true);
    try {
      const currentId = Number(id);
      console.log("Current Question ID:", currentId);
  
      // Step 1: Set the current question status to completed
      const responseforStatus = await fetch(`/api/submit/${currentId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "completed" }),
      });
  
      if (!responseforStatus.ok) {
        throw new Error("Failed to update question status");
      }

      // Update question status via API
      const nextId = Number(id) + 1;
      console.log("nextID: ",nextId)
      const response = await fetch(`/api/submit/${nextId}/unlock`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to update question status");
      }
  
      // Update local state to reflect the unlocked status
     
  
      setCompilerResult("Code submitted");
       router.push("/problemset");
    } catch (err) {
      console.error("Error updating question status:", err);
      setCompilerResult("Failed to unlock question. Please try again.");
    } finally {
      setLoadingforSubmit(false);
    }
  };
  
  const handleRewriteCode = () => {
   // setCode("");  // Clear the code so user can re-enter it
   setFlip(false);
  };


  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-400 to-orange-300 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Question Details */}
        {questions ? (
          <div className="bg-[#0c0c29] text-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-4 text-purple-300">
              {questions.id}. {questions.title}
            </h1>
            <button 
  onClick={() => router.back()} 
  className="back-button z-10 absolute top-[3rem] left-[1rem] bg-[#0c0c29] text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-300 hover:text-black transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center space-x-2"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
  </svg>
  <span>Back</span>
</button>
            <p className="text-md mb-6">
              <strong className="text-purple-300 text-xl">Description:</strong>
              <br />
              <br />
              {questions.description.map((line, index) => (
                <span key={index} className="">
                  {line}
                  <br />
                  <br />
                </span>
              ))}
            </p>
            <h2 className="text-2xl font-bold mb-4 text-pink-300">Test Cases:</h2>
            <ul className="space-y-2">
              {questions.testCases.map((test, index) => (
                <li key={index} className="p-4 bg-purple-500/20 rounded-md shadow-md">
                  <strong>{index + 1}. Input:</strong> {test.input}
                  {test.target && (
                    <>
                      <strong>{", "}target:</strong> {test.target}
                    </>
                  )}
                  <br />
                  <strong className="ml-4">Expected Output:</strong> {test.expectedOutput}
                </li>
              ))}
            </ul>

          </div>
        ) : (
          <div className="flex justify-center items-center h-96">
          <div className="loader border-t-4 border-[#0c0c29] rounded-full w-12 h-12 animate-spin"></div>
        </div>
        )}

        {/* Right Column: Code Editor & Results */}
       
        <div   className="bg-[#0c0c29] text-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4  text-purple-300">Code Compiler</h2>
          {!flip ? (
<div ref={compilerRef}>
          <CodeMirror 
            value={code?.toString()}
            height="400px"
            theme={oneDark}
           
            onChange={(value) => setCode(value)}
            className="rounded-xl "
            extensions={[
              java(), // Java language support
              EditorView.lineWrapping, // Enables line wrapping
            ]}
          />
          </div>
          ):(
            results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result, index) => {
                  const isPassed = result.includes("✔️");
                  const resultClass = isPassed ? "text-green-400" : "text-red-400";
      
                  return (
                    <div
                      key={index}
                      className="p-4 bg-gray-800 rounded-md shadow-md border border-gray-700 hover:shadow-lg transition"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-lg">
                          Test Case {index + 1}:
                        </p>
                        <span
                          className={`text-2xl ${isPassed ? "text-green-400" : "text-red-400"}`}
                        >
                          {isPassed ? "✔️" : "❌"}
                        </span>
                      </div>
                      <p>
                        <strong className="text-purple-300">Input:</strong>{" "}
                        <span className="text-white">{result.match(/Input\((.*?)\)/)?.[1]}</span>
                      </p>
                      <p>
                        <strong className="text-pink-300">Expected:</strong>{" "}
                        <span className="text-white">{result.match(/Expected\((.*?)\)/)?.[1]}</span>
                      </p>
                      <p>
                        <strong className="text-orange-300">Actual:</strong>{" "}
                        <span className={`${isPassed ? "text-green-300" : "text-red-300"}`}>
                          {result.match(/Actual\((.*?)\)/)?.[1]}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex justify-center items-center h-96">
          <div className="loader border-t-4 border-purple-400 rounded-full w-12 h-12 animate-spin"></div>
        </div>
            )
                  )}
          <div className="flex gap-5 mt-4">
            <button
              onClick={handleRun}
              disabled={loadingforRun || isRunDisabled}
              className={`w-1/4 py-2 ${(loadingforRun || isRunDisabled) ? "bg-purple-300 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-700"
                } text-white font-semibold rounded-lg transition`}
            >
              {loadingforRun ? "Running..." : "Run"}
            </button>
            {flip && 
            <button
          className="rewrite-button bg-purple-500 w-24 rounded"
          onClick={handleRewriteCode}
        >
          Edit Code
        </button>
}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || loadingforSubmit}
              className={`w-1/4 py-2 ${!loadingforSubmit && !canSubmit ? "bg-purple-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                } text-white font-semibold rounded-lg transition`}
            >
              {loadingforSubmit ? "Submitting..." : "Submit"}
            </button>
          </div>
         
          </div>
          
      
      </div>
    </div>
  );
};

export default ProblemDetailsPage;


