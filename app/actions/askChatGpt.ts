"use server";
import OpenAI from "openai";
import { IMessage, ISendMessages } from "@/types";
import USER_TYPE from "@/fixtures/USER_TYPE";
import { generateHash } from "@/functions/generateHash";

const openai = new OpenAI();

export async function askChatGpt(message: IMessage): Promise<ISendMessages> {
  console.log("generateHash", await generateHash(message.text));
  // const completion = await openai.chat.completions.create({
  //   messages: [
  //     {
  //       role:
  //         message.userType === USER_TYPE.user
  //           ? USER_TYPE.user
  //           : USER_TYPE.assistant,
  //       content: message.text,
  //     },
  //   ],
  //   model: "gpt-3.5-turbo",
  // });

  // console.log(completion.choices[0]);

  return { messages: [message] };
}
