
const { exec } = require('child_process');
const os = require('os');
const https = require('https');
const { URL } = require('url');

/**
 * API Client for authentication and data fetching
 */
class ApiClient {
    constructor(baseURL = 'http://localhost:3000') {
        this.baseURL = baseURL;
        this.cookies = '';
        this.csrfToken = '';
    }

    /**
     * Get CSRF token for authentication
     * @returns {Promise<string>} CSRF token
     */
    async getCsrfToken() {
        try {
            const response = await fetch(`${this.baseURL}/api/auth/csrf`);
            const data = await response.json();
            this.csrfToken = data.csrfToken;

            this._extractCookies(response);

            return this.csrfToken;
        } catch (error) {
            console.error('Failed to get CSRF token:', error);
            throw error;
        }
    }

    /**
     * Extract cookies from response headers
     * @param {Response} response - Fetch response object
     * @private
     */
    _extractCookies(response) {
        const setCookie = response.headers.get('set-cookie');
        if (setCookie) {
            this.cookies = setCookie;
        }
    }

    /**
     * Login to the system with credentials
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise<Object>} Login result
     */
    async login(email, password) {
        try {
            await this.getCsrfToken();
            const formData = this._createLoginFormData(email, password);

            const response = await fetch(`${this.baseURL}/api/auth/signin/credentials`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': this.cookies
                },
                body: formData.toString()
            });

            this._extractCookies(response);

            return this._processLoginResponse(response);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    /**
     * Create form data for login
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {URLSearchParams} Form data
     * @private
     */
    _createLoginFormData(email, password) {
        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('csrfToken', this.csrfToken);
        formData.append('callbackUrl', this.baseURL);
        formData.append('json', 'true');
        return formData;
    }

    /**
     * Process login response
     * @param {Response} response - Fetch response
     * @returns {Promise<Object>} Processed login result
     * @private
     */
    async _processLoginResponse(response) {
        const responseText = await response.text();

        if (!responseText || responseText.trim() === '') {
            return { success: response.ok, status: response.status };
        }

        try {
            const jsonResponse = JSON.parse(responseText);

            if (jsonResponse.url) {
                return { success: true, status: response.status, data: jsonResponse };
            }

            if (jsonResponse.error) {
                console.error('Login failed:', jsonResponse.error);
                return { success: false, status: response.status, error: jsonResponse.error };
            }

            return jsonResponse;
        } catch (parseError) {
            return { success: response.ok, status: response.status };
        }
    }

    /**
     * Fetch body-worm data from API
     * @returns {Promise<Array>} List of device information with IPs
     */
    async getBodyWormData() {
        try {
            const response = await fetch(`${this.baseURL}/api/secure/body-worm`, {
                headers: {
                    'Cookie': this.cookies,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`Got ${data.data ? data.data.length : 0} body-worm devices`);

            return this._extractDeviceList(data);
        } catch (error) {
            console.error('Failed to get body-worm data:', error);
            throw error;
        }
    }

    /**
     * Extract device list from API response
     * @param {Object} data - API response data
     * @returns {Array} List of device information
     * @private
     */
    _extractDeviceList(data) {
        if (!data.status || !data.data) {
            throw new Error('Invalid response format');
        }

        const deviceList = [];
        data.data.forEach((item, index) => {
            const ip = extractIPFromRTSP(item.rtsp_url);
            if (ip) {
                deviceList.push({
                    ip: ip,
                    name: item.name,
                    rtsp_url: item.rtsp_url,
                    pathSlug: item.path_slug,
                    status: item.status || false
                });
            }
        });

        return deviceList;
    }

    /**
     * Start stream for a device
     * @param {Object} deviceInfo - Device information
     * @returns {Promise<Object>} Stream start result
     */
    async startStream(deviceInfo) {
        try {
            if (deviceInfo.status === true) {
                return { success: false, skipped: true, message: 'Stream skipped - status is true' };
            }

            const streamData = {
                pathSlug: deviceInfo.pathSlug,
                rtspUrl: deviceInfo.rtsp_url,
                type: 3,
                audio: true
            };

            const response = await fetch(`${this.baseURL}/api/secure/stream/start`, {
                method: 'POST',
                headers: {
                    'Cookie': this.cookies,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(streamData)
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`✅ Stream started for ${deviceInfo.name}`);

            return { success: true, data: data };
        } catch (error) {
            console.error(`❌ Failed to start stream for ${deviceInfo.name}:`, error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Stop stream for a device
     * @param {Object} deviceInfo - Device information
     * @returns {Promise<Object>} Stream stop result
     */
    async stopStream(deviceInfo) {
        try {
            const streamData = {
                pathSlug: deviceInfo.pathSlug
            };

            const response = await fetch(`${this.baseURL}/api/secure/stream/stop`, {
                method: 'POST',
                headers: {
                    'Cookie': this.cookies,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(streamData)
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`🛑 Stream stopped for ${deviceInfo.name}`);

            // Hit API to set device status to false
            const statusResponse = await fetch(`${this.baseURL}/api/secure/cctv/${deviceInfo.id}/false`, {
                method: 'POST',
                headers: {
                    'Cookie': this.cookies,
                    'Content-Type': 'application/json'
                },
            });

            if (!statusResponse.ok) {
                console.error(`❌ Failed to update device status for ${deviceInfo.name}`);
            }

            return { success: true, data: data };
        } catch (error) {
            console.error(`❌ Failed to stop stream for ${deviceInfo.name}:`, error);
            return { success: false, error: error.message };
        }
    }
}

/**
 * Extract IP address from RTSP URL
 * @param {string} rtspUrl - RTSP URL
 * @returns {string|null} IP address or null if invalid
 */
function extractIPFromRTSP(rtspUrl) {
    try {
        const parsedUrl = new URL(rtspUrl);
        return parsedUrl.hostname;
    } catch (error) {
        console.error('Error parsing RTSP URL:', rtspUrl, error.message);
        return null;
    }
}

/**
 * API service for stream management
 */
class ApiService {
    /**
     * Start stream for device via API client
     * @param {Object} deviceInfo - Device information
     * @param {string} pingResult - Ping result ('success' or 'failed')
     * @param {ApiClient} apiClient - API client instance
     */
    static async startDeviceStream(deviceInfo, pingResult, apiClient) {
        const isSuccess = pingResult === 'success';

        if (isSuccess && apiClient) {
            try {
                const result = await apiClient.startStream(deviceInfo);
                if (result.success) {
                    // Hit API to set device status to true
                    const statusResponse = await fetch(`${apiClient.baseURL}/api/secure/cctv/${deviceInfo.id}/true`, {
                        method: 'POST',
                        headers: {
                            'Cookie': apiClient.cookies,
                            'Content-Type': 'application/json'
                        },
                    });

                    if (!statusResponse.ok) {
                        console.error(`❌ Failed to update device status for ${deviceInfo.name}`);
                    }
                } else {
                    console.error(`❌ Stream start failed for ${deviceInfo.name}: ${result.error}`);
                }
                return result;
            } catch (error) {
                console.error(`❌ Error starting stream for ${deviceInfo.name}:`, error.message);
                return { success: false, error: error.message };
            }
        } else {
            return { success: false, error: 'Ping failed or no API client' };
        }
    }

    /**
     * Stop stream for device via API client
     * @param {Object} deviceInfo - Device information
     * @param {string} pingResult - Ping result ('success' or 'failed')
     * @param {ApiClient} apiClient - API client instance
     */
    static async stopDeviceStream(deviceInfo, pingResult, apiClient) {
        const isFailed = pingResult === 'failed';

        if (isFailed && apiClient) {
            try {
                const result = await apiClient.stopStream(deviceInfo);
                if (!result.success) {
                    console.error(`❌ Stream stop failed for ${deviceInfo.name}: ${result.error}`);
                }
                return result;
            } catch (error) {
                console.error(`❌ Error stopping stream for ${deviceInfo.name}:`, error.message);
                return { success: false, error: error.message };
            }
        } else {
            return { success: false, error: 'Ping success or no API client' };
        }
    }
}

/**
 * Network utilities for ping operations
 */
class NetworkUtils {
    /**
     * Ping an IP address and notify API based on result
     * @param {Object} deviceInfo - Device information
     * @param {IPChecker} ipChecker - Reference to main IPChecker instance
     */
    static pingDevice(deviceInfo, ipChecker = null) {
        return new Promise((resolve) => {
            const pingCommand = this._getPingCommand(deviceInfo.ip);

            exec(pingCommand, (error, stdout, stderr) => {
                const result = this._processPingResult(error, stdout, deviceInfo);

                if (ipChecker) {
                    ipChecker.handlePingResult(deviceInfo, result);
                }

                resolve(result);
            });
        });
    }

    /**
     * Ping multiple devices in parallel with batch processing
     * @param {Array} deviceList - List of devices to ping
     * @param {IPChecker} ipChecker - Reference to main IPChecker instance
     * @param {number} batchSize - Number of devices to ping simultaneously
     * @returns {Promise<Array>} Results of ping operations
     */
    static async pingDevicesParallel(deviceList, ipChecker = null, batchSize = 5) {
        const results = [];
        
        // Process devices in batches to avoid overwhelming the system
        for (let i = 0; i < deviceList.length; i += batchSize) {
            const batch = deviceList.slice(i, i + batchSize);
            
            console.log(`Ping batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(deviceList.length/batchSize)} (${batch.length} devices)`);
            
            // Ping all devices in current batch simultaneously
            const batchPromises = batch.map(device => 
                this.pingDevice(device, ipChecker)
            );
            
            // Wait for all pings in this batch to complete
            const batchResults = await Promise.all(batchPromises);
            results.push(...batchResults);
            
            // Small delay between batches to prevent system overload
            if (i + batchSize < deviceList.length) {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
        
        return results;
    }

    /**
     * Get ping command based on OS
     * @param {string} ip - IP address to ping
     * @returns {string} Ping command
     * @private
     */
    static _getPingCommand(ip) {
        const isWindows = os.platform() === 'win32';
        return isWindows ? `ping -n 1 ${ip}` : `ping -c 1 ${ip}`;
    }

    /**
     * Process ping result and log output
     * @param {Error|null} error - Execution error
     * @param {string} stdout - Command output
     * @param {Object} deviceInfo - Device information
     * @returns {string} 'success' or 'failed'
     * @private
     */
    static _processPingResult(error, stdout, deviceInfo) {
        if (error) {
            console.log(`${deviceInfo.name}: offline`);
            return 'failed';
        }

        const isSuccess = this._isPingSuccessful(stdout);
        const status = isSuccess ? 'online' : 'offline';
        console.log(`${deviceInfo.name}: ${status}`);

        return isSuccess ? 'success' : 'failed';
    }

    /**
     * Check if ping was successful based on output
     * @param {string} stdout - Ping command output
     * @returns {boolean} True if ping successful
     * @private
     */
    static _isPingSuccessful(stdout) {
        const isWindows = os.platform() === 'win32';

        if (isWindows) {
            return stdout.includes('TTL=');
        } else {
            return stdout.includes('1 received') || stdout.includes('1 packets received');
        }
    }
}

/**
 * Application configuration
 */
const CONFIG = {
    DEFAULT_CREDENTIALS: {
        email: 'admin@example.com',
        password: '123456'
    },
    FALLBACK_DEVICES: [
        { ip: '8.8.8.8', name: 'Google DNS 1', rtsp_url: 'rtsp://8.8.8.8/stream', pathSlug: 'fallback_device_1', status: false },
        { ip: '1.1.1.1', name: 'Cloudflare DNS', rtsp_url: 'rtsp://1.1.1.1/stream', pathSlug: 'fallback_device_2', status: false }
    ],
    PING_DELAY: 2000, // milliseconds between each device ping (untuk sequential mode)
    REFRESH_DELAY: 10000, // milliseconds delay before starting new cycle after refresh
    PARALLEL_BATCH_SIZE: 5, // jumlah device yang di-ping secara bersamaan
    PARALLEL_CYCLE_DELAY: 15000 // milliseconds delay between parallel ping cycles
};

/**
 * Main application class for IP checking with authentication
 */
class IPChecker {
    constructor() {
        this.apiClient = new ApiClient();
        this.pingTracker = new Map(); // Track last ping status for each device (true=success, false=failed, undefined=first ping)
        this.failTracker = new Map(); // Track ping failure counts for each device
        this.deviceList = []; // Store device list for cycling
        this.currentDeviceIndex = 0; // Current device being pinged
        this.activePingInterval = null; // Store active interval ID
        this.activeIntervals = new Map(); // Store all active intervals for cleanup
        this.isRefreshing = false; // Flag to prevent multiple refresh operations
    }

    /**
     * Main execution flow
     */
    async run() {
        console.log('=== IP CHECKER STARTING ===\n');

        try {
            await this._authenticateAndFetchDevices();
        } catch (error) {
            console.error('Error in main function:', error.message);
            await this._runFallbackDevices();
        }
    }

    /**
     * Handle ping result and track ping status
     * @param {Object} deviceInfo - Device information
     * @param {string} result - Ping result ('success' or 'failed')
     */
    handlePingResult(deviceInfo, result) {
        const deviceKey = `${deviceInfo.ip}-${deviceInfo.name}`;

        // Get previous ping status (undefined = first ping, true = last ping success, false = last ping failed)
        const previousStatus = this.pingTracker.get(deviceKey);

        if (result === 'success') {
            // Logika berdasarkan status dan ping
            if (deviceInfo.status === true) {
                // Status true + ping success = skip API
                console.log(`⏭️ ${deviceInfo.name}: Status=true, Ping=success → Skip API`);
            } else {
                // Status false/undefined + ping success
                if (previousStatus === false) {
                    console.log(`🔄 ${deviceInfo.name}: Starting stream (was offline)`);
                    ApiService.startDeviceStream(deviceInfo, result, this.apiClient);
                } else if (previousStatus === undefined) {
                    console.log(`🔄 ${deviceInfo.name}: Starting stream (first ping)`);
                    ApiService.startDeviceStream(deviceInfo, result, this.apiClient);
                }
            }

            // Set status to success (true)
            this.pingTracker.set(deviceKey, true);
        } else {
            // Logika berdasarkan status dan ping
            if (deviceInfo.status === true) {
                // Status true + ping failed = stop stream
                if (previousStatus === true) {
                    console.log(`🛑 ${deviceInfo.name}: Stopping stream (went offline)`);
                    ApiService.stopDeviceStream(deviceInfo, result, this.apiClient);
                } else if (previousStatus === undefined) {
                    console.log(`🛑 ${deviceInfo.name}: Stopping stream (first ping failed)`);
                    ApiService.stopDeviceStream(deviceInfo, result, this.apiClient);
                }
            }
            
            // Set status to failed (false)
            this.pingTracker.set(deviceKey, false);
        }
    }

    /**
     * Authenticate and fetch devices from API
     * @private
     */
    async _authenticateAndFetchDevices() {
        console.log('Logging in...');

        const loginResult = await this.apiClient.login(
            CONFIG.DEFAULT_CREDENTIALS.email,
            CONFIG.DEFAULT_CREDENTIALS.password
        );

        if (!loginResult.success) {
            console.error('Login failed');
            throw new Error('Login failed');
        }

        console.log('✅ Login successful');

        const deviceList = await this.apiClient.getBodyWormData();

        if (deviceList.length > 0) {
            this.deviceList = deviceList;
            await this._pingDevicesCyclic(deviceList);
        } else {
            console.log('No valid IPs found from API');
        }
    }

    /**
     * Ping multiple devices with delay in cycles
     * @param {Array} deviceList - List of devices to ping
     * @private
     */
    async _pingDevicesCyclic(deviceList) {
        console.log(`\nStarting ping cycle for ${deviceList.length} devices`);
        
        // Clear any existing intervals
        this._clearAllIntervals();

        // Start the parallel ping process
        this._startParallelPing();
    }

    /**
     * Start parallel ping process
     * @private
     */
    async _startParallelPing() {
        if (this.deviceList.length === 0) {
            console.log('⚠️ No devices to ping');
            return;
        }

        console.log(`Starting ping cycle (${this.deviceList.length} devices, batch size: ${CONFIG.PARALLEL_BATCH_SIZE})`);

        // Ping all devices in parallel batches
        const results = await NetworkUtils.pingDevicesParallel(
            this.deviceList, 
            this, 
            CONFIG.PARALLEL_BATCH_SIZE
        );

        console.log(`✅ Ping cycle complete - Success: ${results.filter(r => r === 'success').length}, Failed: ${results.filter(r => r === 'failed').length}`);

        // Schedule next cycle
        console.log(`⏳ Next cycle in ${CONFIG.PARALLEL_CYCLE_DELAY/1000}s...`);
        
        this.activePingInterval = setTimeout(() => {
            this._refreshDeviceList();
        }, CONFIG.PARALLEL_CYCLE_DELAY);
    }

    /**
     * Ping the next device in the cycle (DEPRECATED - kept for backward compatibility)
     * @private
     */
    async _pingNextDevice() {
        console.log('⚠️ _pingNextDevice is deprecated, using parallel ping instead');
        return this._startParallelPing();
    }

    /**
     * Refresh device list by fetching from API again
     * @private
     */
    async _refreshDeviceList() {
        if (this.isRefreshing) {
            return;
        }

        this.isRefreshing = true;

        try {
            const newDeviceList = await this.apiClient.getBodyWormData();
            
            if (newDeviceList.length > 0) {
                // Compare with existing device list
                const addedDevices = this._compareDeviceLists(this.deviceList, newDeviceList);
                
                // Update device list
                this.deviceList = newDeviceList;
                
                if (addedDevices.length > 0) {
                    console.log(`🆕 New devices: ${addedDevices.map(d => d.name).join(', ')}`);
                }
                
                // Start new parallel ping cycle with updated list
                setTimeout(() => {
                    this._startParallelPing();
                }, CONFIG.REFRESH_DELAY);
                
            } else {
                console.log('⚠️ No devices found, using previous list');
                setTimeout(() => {
                    this._startParallelPing();
                }, CONFIG.REFRESH_DELAY);
            }
            
        } catch (error) {
            console.error('❌ Error refreshing device list:', error.message);
            
            setTimeout(() => {
                this._startParallelPing();
            }, CONFIG.REFRESH_DELAY);
        } finally {
            this.isRefreshing = false;
        }
    }

    /**
     * Compare device lists to find new devices
     * @param {Array} oldList - Previous device list
     * @param {Array} newList - New device list
     * @returns {Array} New devices that weren't in old list
     * @private
     */
    _compareDeviceLists(oldList, newList) {
        const oldIPs = new Set(oldList.map(device => device.ip));
        return newList.filter(device => !oldIPs.has(device.ip));
    }

    /**
     * Clear all active intervals
     * @private
     */
    _clearAllIntervals() {
        this.activeIntervals.forEach((intervalId, deviceKey) => {
            clearInterval(intervalId);
        });
        this.activeIntervals.clear();
        
        if (this.activePingInterval) {
            clearInterval(this.activePingInterval);
            this.activePingInterval = null;
        }
    }

    /**
     * Run fallback devices when main flow fails
     * @private
     */
    async _runFallbackDevices() {
        console.log('\n=== USING FALLBACK DEVICES ===');

        this.deviceList = CONFIG.FALLBACK_DEVICES;
        await this._pingDevicesCyclic(CONFIG.FALLBACK_DEVICES);
    }
}

// Application entry point
const ipChecker = new IPChecker();
ipChecker.run();