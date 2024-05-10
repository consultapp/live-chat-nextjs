export interface IChat {
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

interface IMessage {
  id: number;
  attributes: {
    text: string;
    userType: keyof typeof USER_ROLE;
    createdAt: Date;
    updatedAt: Date;
    chatSlug?: string;
  };
}
