import { IConfig, DeleteResponse, UploadResponse } from "./types";
declare class S3Client {
    private config;
    constructor(config: IConfig);
    uploadFile(file: File, newFileName?: string): Promise<UploadResponse>;
    deleteFile(fileName: string): Promise<DeleteResponse>;
}
export default S3Client;
