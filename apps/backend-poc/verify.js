const http = require('http');

const BASE_URL = 'http://localhost:3000';

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
            const parsed = JSON.parse(data);
            resolve({ status: res.statusCode, body: parsed });
        } catch (e) {
            resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function run() {
  console.log('Waiting for server...');
  let retries = 10;
  while (retries > 0) {
    try {
      await request('GET', '/health');
      break;
    } catch (e) {
      retries--;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  if (retries === 0) {
    console.error('Server failing to start');
    process.exit(1);
  }

  console.log('Server is up!');

  // Test 1: Lock Slot
  console.log('Test 1: Lock Slot (User 1)');
  try {
    const res1 = await request('POST', '/lock-slot', { slotId: '101', userId: 'user1' });
    console.log(res1.status, res1.body);
    if (res1.status !== 200) console.error('Failed to lock slot (Expected if Redis is down)');
  } catch(e) { console.error(e.message); }

  // Test 2: Lock Slot Again (User 1)
  console.log('Test 2: Lock Slot Again (User 1)');
  try {
    const res2 = await request('POST', '/lock-slot', { slotId: '101', userId: 'user1' });
    console.log(res2.status, res2.body);
    if (res2.status !== 200) console.error('Failed to re-lock slot');
   } catch(e) { console.error(e.message); }

  // Test 3: Lock Slot (User 2)
  console.log('Test 3: Lock Slot (User 2)');
  try {
    const res3 = await request('POST', '/lock-slot', { slotId: '101', userId: 'user2' });
    console.log(res3.status, res3.body);
    if (res3.status !== 409) console.error('Failed to prevent lock by another user');
   } catch(e) { console.error(e.message); }

  // Test 4: Sign QR
  console.log('Test 4: Sign QR');
  let token;
  try {
    const res4 = await request('POST', '/sign-qr', { data: { ticketId: 'abc-123' } });
    console.log(res4.status, res4.body);
    if (res4.status !== 200 || !res4.body.token) throw new Error('Failed to sign QR');
    token = res4.body.token;
  } catch(e) { console.error(e.message); }

  // Test 5: Verify QR
  if (token) {
    console.log('Test 5: Verify QR');
    try {
        const res5 = await request('POST', '/verify-qr', { token: token });
        console.log(res5.status, res5.body);
        if (res5.status !== 200 || res5.body.decoded.data.ticketId !== 'abc-123') throw new Error('Failed to verify QR');
    } catch(e) { console.error(e.message); }
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
