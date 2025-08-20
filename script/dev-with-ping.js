#!/usr/bin/env node

const { spawn } = require('child_process');
const http = require('http');

/**
 * Wait for Next.js dev server to be ready
 * @param {string} url - URL to check
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<boolean>}
 */
function waitForServer(url = 'http://localhost:3000', timeout = 30000) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        
        function checkServer() {
            const req = http.get(url, (res) => {
                if (res.statusCode < 400) {
                    console.log('✅ Next.js dev server is ready!');
                    resolve(true);
                } else {
                    retry();
                }
                req.destroy();
            });

            req.on('error', () => {
                retry();
            });

            req.setTimeout(1000, () => {
                req.destroy();
                retry();
            });
        }

        function retry() {
            if (Date.now() - startTime > timeout) {
                reject(new Error('Timeout waiting for Next.js dev server'));
                return;
            }
            setTimeout(checkServer, 1000);
        }

        checkServer();
    });
}

/**
 * Start Next.js dev server and wait for it to be ready
 */
async function startDevWithPing() {
    console.log('🚀 Starting Next.js dev server...');
    
    // Start Next.js dev server
    const nextProcess = spawn('npx', ['next', 'dev'], {
        stdio: 'inherit',
        cwd: process.cwd()
    });

    // Handle Next.js process errors
    nextProcess.on('error', (error) => {
        console.error('❌ Failed to start Next.js dev server:', error);
        process.exit(1);
    });

    try {
        // Wait for Next.js to be ready
        console.log('⏳ Waiting for Next.js dev server to be ready...');
        await waitForServer();
        
        // Start the IP check scripts
        console.log('🔄 Starting IP check scripts...');
        const pingProcessCCTV = spawn('node', ['script/ipcheck_cctv.js'], {
            stdio: 'inherit',
            cwd: process.cwd()
        });

        const pingProcessBodyCam = spawn('node', ['script/ipcheck_bodycam.js'], {
            stdio: 'inherit',
            cwd: process.cwd()
        });

        pingProcessCCTV.on('error', (error) => {
            console.error('❌ Failed to start CCTV IP check script:', error);
        });

        pingProcessBodyCam.on('error', (error) => {
            console.error('❌ Failed to start Body Cam IP check script:', error);
        });

        // Handle process termination
        process.on('SIGINT', () => {
            console.log('\n🛑 Shutting down...');
            nextProcess.kill('SIGTERM');
            pingProcessCCTV.kill('SIGTERM');
            pingProcessBodyCam.kill('SIGTERM');
            process.exit(0);
        });

        process.on('SIGTERM', () => {
            nextProcess.kill('SIGTERM');
            pingProcessCCTV.kill('SIGTERM');
            pingProcessBodyCam.kill('SIGTERM');
            process.exit(0);
        });

    } catch (error) {
        console.error('❌ Error:', error.message);
        nextProcess.kill('SIGTERM');
        process.exit(1);
    }
}

// Start the process
startDevWithPing();
