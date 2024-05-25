import USER_TYPE from "@/fixtures/USER_TYPE";
import { IMessage } from "@/types";

export interface IChat {
  slug?: string;
  error?: string;
}

export type IChatListElement = {
  id: number;
} & IChatStrapi;

export type IMessage = {
  id: number;
} & IMessageStrapi;

export interface IUser {
  userType: keyof typeof USER_TYPE;
  token?: string;
}

export interface INewMessage {
  text: string;
  slug: string;
  userType: string;
}

export interface IChatStrapi {
  userName: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface IMessageStrapi {
  text: string;
  userType: keyof typeof USER_TYPE;
  createdAt: string;
  updatedAt: string;
  chatSlug: string;
}

type TArray<T> = { id: number; attributes: T }[];
type TOne<T> = { id: number; attributes: T };

export interface IStrapiResponse<T> {
  data: T | null | undefined;
  error?: {
    status?: number;
    name?: string;
    message?: string;
    details?: {};
  };
  meta?: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface IAddMessages {
  messages?: IMessage[];
  error?: string;
}
