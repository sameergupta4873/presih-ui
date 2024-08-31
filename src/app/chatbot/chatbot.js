import { useState } from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react"
import { marked } from 'marked';
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {

    const genAI = new GoogleGenerativeAI("AIzaSyB9HaGAccXloFLTllgCWb9Yiwi92oNbqj8");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
            history: [
              {
                role: "user",
                parts: [{ text: "Hello" }],
              },
              {
                role: "model",
                parts: [{ text: "Hello, I'm Superscholar, your digital guide to the Prime Minister's Special Scholarship Scheme (PMSSS)! I'm here to assist you with all your queries regarding the PMSSS and help you understand how to submit your documents digitally through our new streamlined system. Whether you need information about eligibility criteria, required documents, the application process, or the status of your scholarship disbursement, I'm here to help! Ask me anything about the PMSSS, and I'll guide you through it step-by-step to ensure a smooth and efficient scholarship application experience." }],
              },
              {
                role: "user",
                parts: [{ text: "What are the eligibility criteria for PMSSS?" }],
              },
              {
                role: "model",
                parts: [{ text: "To be eligible for the PMSSS, you must meet the following criteria:\n\n1. You should be a domicile of Jammu & Kashmir or Ladakh.\n2. You must have passed 10+2 from the J&K Board or the CBSE-affiliated schools in J&K.\n3. Your family’s annual income should not exceed INR 8 lakh.\n4. You should have secured admission outside J&K under the supernumerary quota in the institutions identified by the Government of India.\n\nIf you need more details or have questions about any specific requirement, feel free to ask!" }],
              },
              {
                role: "user",
                parts: [{ text: "What documents do I need to submit for PMSSS?" }],
              },
              {
                role: "model",
                parts: [{ text: "For the PMSSS application, you need to submit the following documents:\n\n1. Domicile Certificate of J&K or Ladakh.\n2. 10+2 Marksheets.\n3. Family Income Certificate (not exceeding INR 8 lakh per annum).\n4. Allotment Letter issued by the college/institute where admission has been secured.\n5. Aadhaar Card or any valid government-issued ID proof.\n\nIf you need guidance on how to upload these documents digitally, I can help with that too!" }],
              },
            ],
          });

          const [typing, setTyping] = useState(false);
          const [messages, setMessages] = useState([
              {
                  message: "Hello, I'm Superscholar, your digital guide to the Prime Minister's Special Scholarship Scheme (PMSSS)! I'm here to assist you with all your queries regarding the PMSSS and help you understand how to submit your documents digitally through our new streamlined system. Whether you need information about eligibility criteria, required documents, the application process, or the status of your scholarship disbursement, I'm here to help! Ask me anything about the PMSSS, and I'll guide you through it step-by-step to ensure a smooth and efficient scholarship application experience.",
                  sender: 'chatbot',
                  direction: 'incoming'
              }
          ]);
      
          const handleSend = async (message) => {
              const newMessage = {
                  message: message,
                  sender: 'user',
                  direction: 'outgoing'
              };
      
              setMessages(prevMessages => [...prevMessages, newMessage]);
      
              setTyping(true);
      
              await responseFromChatbot(message);
          };
      
          const responseFromChatbot = async (message) => {

              let result = await chat.sendMessage(message);

              let htmlMessage = marked.parse(result.response.text())
      
              const chatbotMessage = {
                  message: htmlMessage,
                  sender: "chatbot",
                  direction: 'incoming'
              };
      
              setMessages(prevMessages => [...prevMessages, chatbotMessage]);
              setTyping(false);
          };

    return (
        <div>
            <div class="rounded-lg" style={{height: '550px', width : '400px', paddingTop: '100px'}}>
                <div class="flex items-center gap-4 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 p-1">
                    <img class="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="" />
                    <div class="font-medium dark:text-black">
                        <div>SuperScholar Chatbot</div>
                    </div>
                </div> 
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                            typingIndicator= {typing ? <TypingIndicator content="chatbot is typing.."/> : null }
                        >
                            {messages. map((message, index) => {
                                return <Message key={index} model={message} />
                            })}
                        </MessageList>
                        <MessageInput placeholder="type message here" onSend={handleSend}/>
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    )
}

export {Chatbot};