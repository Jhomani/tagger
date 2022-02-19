declare interface InTags {
  tags: Array<{key: number; label: string}>;
  banner: {
    id?: number,
    tags?: Array<{key: number; label: string}>;
    createdAt?: number,
    updatedAt?: number,
    title?: string,
    imageUrl?: string,
    thumbnailUrl?: string,
  }
}

declare interface MainStorage {
  tags: InTags;
  app: InAppState;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare interface PromiseAcc {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}
