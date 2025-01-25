import jwt from 'jsonwebtoken';

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const generateJwtToken = (jwtPayload: JwtPayload): string => {
  const payload = {
    id: jwtPayload.id,
    email: jwtPayload.email,
    role: jwtPayload.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: 60 * 60 * 24 * 30,
  });
};

export const verifyJwtToken = (token: string) => {
  const user = jwt.verify(token, process.env.JWT_SECRET as string);
  return user;
};
