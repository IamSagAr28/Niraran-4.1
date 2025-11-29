const { spawn } = require('child_process');
const http = require('http');

process.env.DEBUG = 'true';

function waitForServer(startProcess) {
  return new Promise((resolve, reject) => {
    const handleData = data => {
      const out = data.toString();
      process.stdout.write(out);
      if (out.includes('Server running on http://localhost:3000')) {
        resolve();
      }
    };
    startProcess.stdout.on('data', handleData);
    startProcess.stderr.on('data', handleData);
    startProcess.on('error', (err) => reject(err));
    setTimeout(() => reject(new Error('Server did not start within 10s')), 10000);
  });
}

async function run() {
  console.log('[test-oauth-debug] Starting test server...');
  const path = require('path');
  const serverDir = path.resolve(__dirname, '..');
  const serverProcess = spawn('node', ['index.js'], { cwd: serverDir, env: process.env });

  try {
    await waitForServer(serverProcess);

    console.log('[test-oauth-debug] Server started, running checks...');

    // 1) HEAD request to auth/google to get Location header
    await new Promise((resolve) => {
      const req = http.request({ method: 'HEAD', host: 'localhost', port: 3000, path: '/auth/google' }, (res) => {
        console.log('[test-oauth-debug] /auth/google HEAD Status:', res.statusCode);
        console.log('[test-oauth-debug] Location header:', res.headers['location'] || res.headers['Location']);
        resolve();
      });
      req.on('error', (e) => { console.error('[test-oauth-debug] Request error:', e); resolve(); });
      req.end();
    });

    // 2) GET /auth/debug
    await new Promise((resolve) => {
      const req = http.request({ method: 'GET', host: 'localhost', port: 3000, path: '/auth/debug' }, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          console.log('[test-oauth-debug] /auth/debug Status:', res.statusCode);
          console.log('[test-oauth-debug] /auth/debug JSON:', body);
          resolve();
        });
      });
      req.on('error', (e) => { console.error('[test-oauth-debug] Request error:', e); resolve(); });
      req.end();
    });

  } catch (e) {
    console.error('[test-oauth-debug] Error:', e.message);
  } finally {
    console.log('[test-oauth-debug] Stopping server...');
    serverProcess.kill('SIGTERM');
  }
}

run();
