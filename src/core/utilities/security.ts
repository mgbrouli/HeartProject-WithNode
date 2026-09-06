import argon2 from 'argon2';

export const hashGenerate = async (password: string): Promise<string> => {
    return argon2.hash(password, {
        type: argon2.argon2id,
    });
}

export const verifyHash = async (password: string, hash: string): Promise<boolean> => {
    try {
        return await argon2.verify(hash, password);
    } catch (error) {
        console.error(error)
        return false;
    }

}