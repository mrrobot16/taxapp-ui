"use client";
import { useChat } from "@/hooks";

export const AbsoluteImportDummyButton = ({ text }: { text: string }) => {
  const chat = useChat({ topK: 10 });
  const onClick = async () => {
    console.log("Button clicked");
    await chat.sendMessage("Hello, world!");
  };
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md"
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};
