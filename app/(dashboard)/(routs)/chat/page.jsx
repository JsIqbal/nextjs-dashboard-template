"use client";

import Heading from "@/components/heading";
import { MessageSquareIcon } from "lucide-react";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import LoadingButton from "@/components/loading-button";

const ChatPage = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (e) => {
    e.preventDefault();
    setLoadingMessage(true);
    if (prompt.trim() === "") return;
    try {
      history = messages
      setMessages((prev) => [...prev, {role: "user", message: prompt.trim()}])
      let res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          history,
        }),
      });

      res = await res.json();
      setMessages((prev) => [...prev, {role: "assitant", message: res.generatedText}]);
      setLoadingMessage(false);
      setPrompt("");
    } catch (err) {
      toast({
        variant: "destructive",
        description: "An error occurred while sending the message.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-[93%] px-6 md:px-10 lg:px-[7%] xl:px-[10%] 2xl:px-[20%]">
      <div className="w-full">
        <div className="flex flex-col gap-10 justify-center items-center py-8">
          <Heading
            title="Chatting"
            description="Chat with a friendly AI ChatBot"
            Icon={MessageSquareIcon}
            iconColor="text-blue-900"
            bgColor="bg-blue-400"
          />
          {messages.length === 0 && (
            <div>
              <i className="text-2xl text-muted-foreground">
                Send a message to start the Conversation
              </i>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-3 overflow-auto pb-16">
          {messages.map((message) => (
            <div
              key={message.message}
              className={cn(
                "p-3 text-start font-sans font-semibold flex",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "flex flex-col items-start after:w-[50%]",
                  message.role === "user"
                    ? "items-end gap-5"
                    : "items-start gap-3"
                )}
              >
                <div
                  className={cn(
                    "relative w-12 h-6 flex flex-col",
                    message.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  {message.role === "user" ? (
                    <UserButton className="h-10 w-10 pb-3" />
                  ) : (
                    <Image fill alt="Logo" src="/logo-new.png" />
                  )}
                </div>
                <div
                  className={cn(
                    " p-3 rounded-2xl text-white bg-blue-500",
                    message.role === "user"
                      ? "rounded-tr-none"
                      : "rounded-tl-none"
                  )}
                >
                  {message.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col gap-5">
        {
          loadingMessage && <LoadingButton text="Generating"/>
        }
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
