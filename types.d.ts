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
  text: string;
  userType: keyof typeof USER_TYPE;
  createdAt: Date;
  updatedAt: Date;
  chatSlug?: string;
}
