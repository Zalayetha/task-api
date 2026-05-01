import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
	return await bcrypt.hash(password, 13); // owasp 10 - 13 rounds
}
export async function isPasswordValid(password: string, hashPassword: string) {
	return await bcrypt.compare(password, hashPassword);
}
