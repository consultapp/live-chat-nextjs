import USER_TYPE from "@/fixtures/USER_TYPE";

export interface IChatStrapi {
  data?: {
    id: number;
    attributes: {
      userName: string;
      createdAt: string;
      updatedAt: string;
      slug: string;
    };
  };

  meta?: {};
}

export interface IChat {
  chatSlug?: string;
  error?: string;
}

interface IMessage {
  id: number;
  text: string;
  userType: keyof typeof USER_TYPE;
  createdAt: Date;
  updatedAt: Date;
  chatSlug?: string;
}

interface IUser {
  userType: keyof typeof USER_TYPE;
  token?: string;
}
