import { useState } from "react";
import axios from "axios";

export function Text_area() {
  const [text, settext] = useState("");
  const [ans, setans] = useState("");

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#111418] group/design-root overflow-x-hidden justify-center items-center"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="flex flex-col items-center w-full max-w-[512px] px-4">
        <h1 className="text-white text-3xl font-bold leading-tight text-center pb-6 pt-6">
          Ask a question
        </h1>
        <p className="text-white text-base font-normal leading-normal text-center pb-6">
          Your question with deep knowledge and expertise.
        </p>

        <div className="w-full">
          <textarea
            placeholder="Type your question here"
            value={text}
            onChange={(e) => settext(e.target.value)}
            className="w-full resize-none overflow-hidden rounded-xl text-white focus:outline-none bg-[#283039] placeholder:text-[#9cabba] p-4 text-base leading-normal min-h-[150px] focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end w-full mt-4">
          <button
            className="flex items-center justify-center rounded-full h-10 px-6 bg-[#0d80f2] text-white text-sm font-bold leading-normal"
            onClick={async () => {
              await axios
                .post("https://backend-theta-ten-18.vercel.app/gpt", { question: text })
                .then((res) => {
                  setans(res.data.ans);
                });
            }}
          >
            Submit
          </button>
        </div>

        {ans && (
          <div className="bg-[#1f252f] text-white rounded-xl p-4 mt-6 w-full">
            <h2 className="text-lg font-semibold mb-2">Answer:</h2>
            <pre className="whitespace-pre-wrap">{ans}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
