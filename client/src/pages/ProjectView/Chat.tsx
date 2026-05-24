import { useGetChatHistoryQuery, type Message } from "@/api/project";
import Button2 from "@/components/Button2";
import InputField from "@/components/InputField";
import { useOrgContext } from "@/context/OrgContext";
import { useProjectContext } from "@/context/ProjectContext";
import { useEffect, useState } from "react";
import { socket } from "@/socket";

export default function Chat() {
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const project = useProjectContext();
  const org = useOrgContext();

  const { data: chatHistory } = useGetChatHistoryQuery({
    orgId: org.org.id,
    projectId: project.projectData.id,
  });

  const sendChat = () => {
    if (!chatMessage.trim()) return;
    socket.emit("send-message", {
      projectId: project.projectData.id,
      message: chatMessage,
    });
    setChatMessage("");
  };

  useEffect(() => {
    if (chatHistory) setMessages(chatHistory);
    console.log("chat history: ", chatHistory);
  }, [chatHistory]);

  useEffect(() => {
    socket.on("new-message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("new-message");
    };
  }, []);

  return (
    <div>
      <p>chatti</p>
      {messages.map((msg) => (
        <p key={msg.id}>
          {msg.user.username}: {msg.message}
        </p>
      ))}
      <InputField
        name=""
        value={chatMessage}
        type="text"
        handleChange={setChatMessage}
      />
      <Button2 name="Send" changeHandler={sendChat} />
    </div>
  );
}
