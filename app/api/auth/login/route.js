import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

// บัญชีทดลอง (Demo User)
const demoUser = {
  username: 'demoUser',
  password: 'password123'
};

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (username === demoUser.username) {
      const passwordMatch = password === demoUser.password;
      if (!passwordMatch) {
        return new Response(JSON.stringify({ error: 'Username or password is incorrect' }), { status: 401 });
      }

      //JWT token บัญชีทดลอง
      const token = jwt.sign({ username: demoUser.username }, secret, { expiresIn: '4h' });

      return new Response(JSON.stringify({ token }), { status: 200 });
    }

    return new Response(JSON.stringify({ error: 'Username or password is incorrect' }), { status: 401 });
  } catch (error) {
    console.error('Error in login:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
