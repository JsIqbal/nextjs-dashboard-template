"use client";

import Heading from "@/components/heading";
import { MessageSquareIcon } from "lucide-react";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ChatPage = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const { toast } = useToast();

  const sendMessage = async (e) => {
    e.preventDefault();
    if (prompt.trim() === "") return;
    try {
      let res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          history: messages,
        }),
      });

      res = await res.json();
      print(res);

      setMessages((prev) => [...prev, ...res.message]);
      setPrompt("");
    } catch (err) {
      toast({
        variant: "destructive",
        description: "An error occurred while sending the message.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-[95%] px-6 md:px-10 lg:px-[7%] xl:px-[10%] 2xl:px-[20%]">
      <div className="w-full">
        {messages.length === 0 ? (
          <div className="flex flex-col gap-10 justify-center items-center">
            <Heading
              title="Chatting"
              description="Chat with a friendly AI ChatBot"
              Icon={MessageSquareIcon}
              iconColor="text-blue-900"
              bgColor="bg-blue-400"
            />
            <div>
              <i className="text-2xl text-muted-foreground">
                Send a message to start the Conversation
              </i>
            </div>
          </div>
        ) : (
          <div className="w-full  flex flex-col gap-3 overflow-auto">
            {messages.map((message) => {
              return (
                <div
                  key={message.message}
                  className={cn(
                    "p-3 text-start font-sans font-semibold flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div className="flex flex-col items-start gap-3">
                    <div className="relative w-16 h-12 ">
                      <Image fill alt="Logo" src="/logo.png" />
                    </div>
                    <div className="p-3 rounded-2xl text-white bg-[#5B96F7]">
                      {message.message}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex w-full flex-col">
        <form onSubmit={sendMessage} className="flex mb-6 lg:mb-10 shadow-lg">
          <Input
            type="text"
            placeholder="Ask me anything!"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="rounded-r-none "
          />
          <Button type="submit" className="rounded-l-none">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
