export type PresignResponse = {
  uploads: Array<{ key: string; uploadUrl: string; mimeType: string }>;
};

export type GetPresignedURLRes = {
  uploads: {
    key: string;
    uploadUrl: string;
    mimeType: string;
  }[];
};

export type GetPresignedURLReq = {
  mimeTypes: string[];
};
