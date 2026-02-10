import { compare, genSalt, hash } from "bcryptjs";
import { ICryptoService } from "../interfaces/ICryptoService";

export class CryptoService implements ICryptoService {
    private salt = 12
    public async hashText(text: string): Promise<string> {
        const saltGenerated = await genSalt(this.salt);
        return await hash(text, saltGenerated)
    }
    public async compareText(text: string, hashText: string): Promise<boolean> {
        return await compare(text, hashText)
    }
}