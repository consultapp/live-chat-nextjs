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
