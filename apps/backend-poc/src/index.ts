import express, { Request, Response } from 'express';
import { createClient } from 'redis';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_for_poc_only';

// Redis Client Setup
const redisClient = createClient({
  url: REDIS_URL
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Connect to Redis
(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (e) {
    console.error('Failed to connect to Redis. Redis features will be unavailable.', e);
  }
})();

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.send('Backend POC is running');
});

/**
 * Endpoint: /lock-slot
 * Method: POST
 * Body: { slotId: string, userId: string, duration?: number }
 * Description: Locks a slot for a specific user for a given duration (default 10 mins).
 */
app.post('/lock-slot', async (req: Request, res: Response) => {
  const { slotId, userId, duration = 600 } = req.body;

  if (!slotId || !userId) {
    return res.status(400).json({ error: 'Missing slotId or userId' });
  }

  const key = `slot:${slotId}`;

  try {
    // Try to set the key only if it doesn't exist (NX) and set expiration (EX)
    const result = await redisClient.set(key, userId, {
      NX: true,
      EX: duration
    });

    if (result === 'OK') {
      return res.status(200).json({ success: true, message: 'Slot locked successfully', slotId, userId });
    } else {
      const currentHolder = await redisClient.get(key);
      if (currentHolder === userId) {
             return res.status(200).json({ success: true, message: 'Slot already locked by you', slotId, userId });
      }
      return res.status(409).json({ success: false, error: 'Slot already locked by another user' });
    }
  } catch (error) {
    console.error('Error locking slot:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * Endpoint: /sign-qr
 * Method: POST
 * Body: { data: object }
 * Description: Generates a signed JWT for the provided data.
 */
app.post('/sign-qr', (req: Request, res: Response) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ error: 'Missing data payload' });
  }

  try {
    // Sign the data with the secret. No expiration for offline verification POC, or set a long one.
    const token = jwt.sign({ data }, JWT_SECRET, { expiresIn: '1d' });
    return res.json({ success: true, token });
  } catch (error) {
    console.error('Error signing QR:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * Endpoint: /verify-qr
 * Method: POST
 * Body: { token: string }
 * Description: Verifies a signed JWT.
 */
app.post('/verify-qr', (req: Request, res: Response) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Missing token' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.json({ success: true, decoded });
    } catch (error) {
        return res.status(401).json({ success: false, error: 'Invalid token' });
    }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
