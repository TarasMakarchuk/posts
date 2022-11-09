import * as bcrypt from 'bcryptjs';

const SALT = 5;

export const hashedPassword = async (password): Promise<string> => await bcrypt.hash(password, SALT);

export const comparePasswords = async (password1, password2): Promise<boolean> => await bcrypt.compare(password1, password2);