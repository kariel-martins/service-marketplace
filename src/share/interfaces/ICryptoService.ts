export interface ICryptoService {
    hashText(text: string): Promise<string>;
    compareText(text: string, hashText: string): Promise<boolean>
}