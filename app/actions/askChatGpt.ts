"use server";
import OpenAI from "openai";
import { IMessage, IAddMessages } from "@/types";
import USER_TYPE from "@/fixtures/USER_TYPE";

const openai = new OpenAI();

export async function askChatGpt(message: IMessage): Promise<IAddMessages> {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role:
          message.userType === USER_TYPE.user
            ? USER_TYPE.user
            : USER_TYPE.assistant,
        content: message.text,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);

  return { messages: [message] };
}
