import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

// export async function testAi() {
//     model.invoke("What is the capital of Bangladesh?")
//         .then((response) => {
//             console.log("AI Response:", response.text);
//         })
//         .catch((error) => {
//             console.error("Error invoking AI model:", error);
//         });
// }