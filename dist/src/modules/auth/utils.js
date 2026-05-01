import bcrypt from "bcryptjs";
export async function hashPassword(password) {
	return await bcrypt.hash(password, 13); // owasp 10 - 13 rounds
}
export async function isPasswordValid(password, hashPassword) {
	return await bcrypt.compare(password, hashPassword);
}
