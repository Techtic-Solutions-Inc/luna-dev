import http from 'http';

const PORT = 8001;

const galleryItems = [
  {
    id: '1',
    title: 'Modern home exterior',
    image_url:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=85',
    description: 'Just listed marketing template',
  },
  {
    id: '2',
    title: 'Luxury kitchen',
    image_url:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=700&q=85',
    description: 'Dream home showcase',
  },
  {
    id: '3',
    title: 'Living room staging',
    image_url:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=85',
    description: 'Interior design post',
  },
  {
    id: '4',
    title: 'Poolside retreat',
    image_url:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=85',
    description: 'Luxury listing highlight',
  },
  {
    id: '5',
    title: 'Urban loft',
    image_url:
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=700&q=85',
    description: 'City living feature',
  },
  {
    id: '6',
    title: 'Coastal property',
    image_url:
      'https://images.unsplash.com/photo-1605276374101-dee2a0ed3cd6?auto=format&fit=crop&w=700&q=85',
    description: 'Waterfront listing feature',
  },
];

const sendJson = (res, statusCode, body) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(JSON.stringify(body));
};

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return;
  }

  const url = new URL(req.url ?? '/', `http://localhost:${PORT}`);

  if (req.method === 'GET' && url.pathname === '/api/visitor/home/search') {
    sendJson(res, 200, {
      success: true,
      message: 'OK',
      data: { items: galleryItems },
    });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/visitor/home/subscribe') {
    sendJson(res, 201, {
      success: true,
      message: 'Subscribed successfully',
      data: { id: 'sub_mock_1' },
    });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/visitor/home/terms-acceptance') {
    sendJson(res, 201, {
      success: true,
      message: 'Terms accepted',
    });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/auth/login') {
    sendJson(res, 201, {
      success: true,
      message: 'Login successful',
      data: {
        id: 'mock_user',
        name: 'Mock User',
        full_name: 'Mock User',
        first_name: 'Mock',
        last_name: 'User',
        email: 'mock@example.com',
        phone: null,
        token: 'mock-token',
        accessToken: 'mock-token',
        refreshToken: 'mock-refresh',
        tokenType: 'Bearer',
      },
    });
    return;
  }

  if (url.pathname === '/health') {
    sendJson(res, 200, { status: 'ok' });
    return;
  }

  sendJson(res, 404, { success: false, message: 'Not Found' });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Mock API listening on http://localhost:${PORT}`);
});
