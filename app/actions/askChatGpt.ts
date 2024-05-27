"use server";
import OpenAI from "openai";
import { IMessage, IAddMessages } from "@/types";

const openai = new OpenAI();

export async function askChatGpt(message: IMessage): Promise<IAddMessages> {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: message.userType !== "ai" ? message.userType : "user",
        content: message.text,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);

  return { messages: [message] };
}
