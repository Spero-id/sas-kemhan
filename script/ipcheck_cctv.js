
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

            console.log('Login response status:', response.status);
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
            console.log('Empty response body from login endpoint');
            return { success: response.ok, status: response.status };
        }

        try {
            const jsonResponse = JSON.parse(responseText);

            if (jsonResponse.url) {
                console.log('Login successful, redirect URL:', jsonResponse.url);
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
     * Fetch CCTV data from API
     * @returns {Promise<Array>} List of device information with IPs
     */
    async getCCTVData() {
        try {
            console.log('Mengambil data dari API CCTV...');

            const response = await fetch(`${this.baseURL}/api/secure/cctv`, {
                headers: {
                    'Cookie': this.cookies,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`Berhasil mendapat ${data.data ? data.data.length : 0} data CCTV`);

            return this._extractDeviceList(data);
        } catch (error) {
            console.error('Failed to get CCTV data:', error);
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
                    id: item.id,
                    ip: ip,
                    name: item.name,
                    rtsp_url: item.rtsp_url,
                    pathSlug: item.path_slug, // Generate pathSlug for each device
                    status: item.status || false // Add device status from API
                });
                console.log(`Data ${index + 1}: ${item.name} - IP: ${ip} - Status: ${item.status ? 'ON' : 'OFF'}`);
            }
        });

        return deviceList;
    }

    /**
     * Turn ON CCTV device
     * @param {Object} deviceInfo - Device information
     * @returns {Promise<Object>} Device ON result
     */
    async turnOnDevice(deviceInfo) {
        try {
            console.log(`Menghidupkan CCTV ${deviceInfo.name}...`);


            const response = await fetch(`${this.baseURL}/api/secure/cctv/${deviceInfo.id}/true`, {
                method: 'POST',
                headers: {
                    'Cookie': this.cookies,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`✅ CCTV berhasil dihidupkan untuk ${deviceInfo.name}`);
            console.log('ON response:', data);

            return { success: true, data: data };
        } catch (error) {
            console.error(`❌ Failed to turn ON CCTV ${deviceInfo.name}:`, error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Turn OFF CCTV device
     * @param {Object} deviceInfo - Device information
     * @returns {Promise<Object>} Device OFF result
     */
    async turnOffDevice(deviceInfo) {
        try {
            console.log(`Mematikan CCTV ${deviceInfo.name}...`);


            const response = await fetch(`${this.baseURL}/api/secure/cctv/${deviceInfo.id}/false`, {
                method: 'POST',
                headers: {
                    'Cookie': this.cookies,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`🔴 CCTV berhasil dimatikan untuk ${deviceInfo.name}`);
            console.log('OFF response:', data);

            return { success: true, data: data };
        } catch (error) {
            console.log(`${this.baseURL}/api/secure/cctv/${deviceInfo.id}/true`)

            console.error(`❌ Failed to turn OFF CCTV ${deviceInfo.name}:`, error);
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
 * API service for CCTV device management
 */
class ApiService {
    /**
     * Control CCTV device based on ping result
     * @param {Object} deviceInfo - Device information
     * @param {string} pingResult - Ping result ('success' or 'failed')
     * @param {ApiClient} apiClient - API client instance
     * @param {string} action - Action to perform ('on' or 'off')
     */
    static async controlCCTVDevice(deviceInfo, pingResult, apiClient, action) {
        const isSuccess = pingResult === 'success';
        console.log(`🚀 Hitting CCTV ${action.toUpperCase()} API untuk ${deviceInfo.name} (${deviceInfo.ip}) - ping ${isSuccess ? 'berhasil' : 'gagal'}`);

        if (apiClient) {
            try {
                let result;
                if (action === 'on') {
                    result = await apiClient.turnOnDevice(deviceInfo);
                } else if (action === 'off') {
                    result = await apiClient.turnOffDevice(deviceInfo);
                } else {
                    throw new Error(`Invalid action: ${action}`);
                }

                if (result.success) {
                    console.log(`🎉 CCTV ${action.toUpperCase()} API berhasil di-hit untuk ${deviceInfo.name}!`);
                } else {
                    console.error(`❌ CCTV ${action.toUpperCase()} API gagal untuk ${deviceInfo.name}: ${result.error}`);
                }
                return result;
            } catch (error) {
                console.error(`❌ Error controlling CCTV ${deviceInfo.name}:`, error.message);
                return { success: false, error: error.message };
            }
        } else {
            console.log(`⏭️ Skip CCTV API untuk ${deviceInfo.name} - tidak ada API client`);
            return { success: false, error: 'No API client' };
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
        const pingCommand = this._getPingCommand(deviceInfo.ip);

        console.log(`Melakukan ping ke ${deviceInfo.name} (${deviceInfo.ip})...`);

        exec(pingCommand, async (error, stdout, stderr) => {
            const result = this._processPingResult(error, stdout, deviceInfo);

            if (ipChecker) {
                await ipChecker.handlePingResult(deviceInfo, result);
            } else {
                console.log(`⚠️ Tidak ada IPChecker instance untuk ${deviceInfo.name}, skip API call`);
            }
        });
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
            console.log(`${deviceInfo.name} (${deviceInfo.ip}): tidak nyambung`);
            return 'failed';
        }

        const isSuccess = this._isPingSuccessful(stdout);
        const status = isSuccess ? 'nyambung' : 'tidak nyambung';
        console.log(`${deviceInfo.name} (${deviceInfo.ip}): ${status}`);

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
        { id: 'fallback-1', ip: '8.8.8.8', name: 'Test CCTV 1', rtsp_url: 'rtsp://8.8.8.8/stream', pathSlug: 'test_cctv_1', status: true },
        { id: 'fallback-2', ip: '1.1.1.1', name: 'Test CCTV 2', rtsp_url: 'rtsp://1.1.1.1/stream', pathSlug: 'test_cctv_2', status: false },
        { id: 'fallback-3', ip: '208.67.222.222', name: 'Test CCTV 3', rtsp_url: 'rtsp://208.67.222.222/stream', pathSlug: 'test_cctv_3', status: true }
    ],
    PING_DELAY: 5000 // milliseconds - interval untuk ping bersamaan ke semua device
};

/**
 * Main application class for CCTV IP checking with authentication
 */
class IPChecker {
    constructor() {
        this.apiClient = new ApiClient();
        this.pingTracker = new Map(); // Track last ping status for each device (true=success, false=failed, undefined=first ping)
        this.failTracker = new Map(); // Track ping failure counts for each device
        this.deviceList = []; // Store device list for cycling
        this.currentDeviceIndex = 0; // Current device being pinged
        this.activePingInterval = null; // Store active interval ID
        this.isParallelPingActive = false; // Flag untuk kontrol parallel ping
        this.pingIntervals = new Map(); // Store interval IDs for each device
        this.deviceMap = new Map(); // Map untuk menyimpan device berdasarkan ID untuk update yang cepat
    }    /**
     * Main execution flow
     */
    async run() {
        console.log('=== CCTV IP CHECKER DENGAN LOGIN SYSTEM ===');
        console.log('Starting CCTV IP checker with authentication...\n');

        try {
            await this._authenticateAndFetchDevices();
        } catch (error) {
            console.error('Error dalam main function:', error.message);
            await this._runFallbackDevices();
        }
    }

    /**
     * Handle ping result and track ping status
     * @param {Object} deviceInfo - Device information
     * @param {string} result - Ping result ('success' or 'failed')
     */
    async handlePingResult(deviceInfo, result) {
        const deviceKey = `${deviceInfo.ip}-${deviceInfo.name}`;
        
        // Refresh device data dari API untuk mendapatkan status terbaru
        const refreshedDeviceInfo = await this.refreshDeviceData(deviceInfo);
        const deviceStatus = refreshedDeviceInfo ? refreshedDeviceInfo.status : deviceInfo.status;

        // Get previous ping status (undefined = first ping, true = last ping success, false = last ping failed)
        const previousStatus = this.pingTracker.get(deviceKey);

        console.log(`📊 ${deviceInfo.name} Status: ${deviceStatus ? 'ON' : 'OFF'}, Ping: ${result === 'success' ? 'SUCCESS' : 'FAILED'}`);

        if (result === 'success') {
            console.log(`✓ ${deviceInfo.name} (${deviceInfo.ip}): ping berhasil`);

            // Logic: Jika device status ON dan ping berhasil, atau device status OFF dan ping berhasil (perlu dihidupkan)
            if (!deviceStatus) {
                // Device status OFF tapi ping berhasil - hidupkan device
                if (previousStatus === false) {
                    console.log(`🎉 ${deviceInfo.name} berhasil ping setelah sebelumnya gagal! Device status OFF, menghidupkan CCTV...`);
                    ApiService.controlCCTVDevice(refreshedDeviceInfo || deviceInfo, result, this.apiClient, 'on');
                } else if (previousStatus === undefined) {
                    console.log(`🎉 ${deviceInfo.name} ping pertama berhasil! Device status OFF, menghidupkan CCTV...`);
                    ApiService.controlCCTVDevice(refreshedDeviceInfo || deviceInfo, result, this.apiClient, 'on');
                } else {
                    console.log(`🔄 ${deviceInfo.name} ping berhasil berturut-turut, device status OFF, menghidupkan CCTV...`);
                    ApiService.controlCCTVDevice(refreshedDeviceInfo || deviceInfo, result, this.apiClient, 'on');
                }
            } else {
                // Device status ON dan ping berhasil - tidak perlu action
                console.log(`✅ ${deviceInfo.name} ping berhasil dan device sudah ON, skip API call`);
            }

            // Set status to success (true)
            this.pingTracker.set(deviceKey, true);
        } else {
            console.log(`✗ ${deviceInfo.name} (${deviceInfo.ip}): ping gagal`);

            // Logic: Jika device status ON tapi ping gagal, matikan device
            // Jika device status OFF dan ping gagal, tidak perlu action
            if (deviceStatus) {
                // Device status ON tapi ping gagal - matikan device
                if (previousStatus === true) {
                    console.log(`❌ ${deviceInfo.name} ping gagal setelah sebelumnya berhasil! Device status ON, mematikan CCTV...`);
                    ApiService.controlCCTVDevice(refreshedDeviceInfo || deviceInfo, result, this.apiClient, 'off');
                } else if (previousStatus === undefined) {
                    console.log(`❌ ${deviceInfo.name} ping pertama gagal! Device status ON, mematikan CCTV...`);
                    ApiService.controlCCTVDevice(refreshedDeviceInfo || deviceInfo, result, this.apiClient, 'off');
                } else {
                    console.log(`🔄 ${deviceInfo.name} ping gagal berturut-turut, device status ON, mematikan CCTV...`);
                    ApiService.controlCCTVDevice(refreshedDeviceInfo || deviceInfo, result, this.apiClient, 'off');
                }
            } else {
                // Device status OFF dan ping gagal - tidak perlu action
                console.log(`⏸️ ${deviceInfo.name} ping gagal dan device sudah OFF, skip API call`);
            }

            // Set status to failed (false)
            this.pingTracker.set(deviceKey, false);
        }

        // Update device di deviceMap dengan data terbaru
        if (refreshedDeviceInfo) {
            this.deviceMap.set(deviceInfo.id, refreshedDeviceInfo);
            // Update juga di deviceList
            const deviceIndex = this.deviceList.findIndex(d => d.id === deviceInfo.id);
            if (deviceIndex !== -1) {
                this.deviceList[deviceIndex] = refreshedDeviceInfo;
            }
        }
    }

    /**
     * Refresh device data from API to get latest status
     * @param {Object} deviceInfo - Current device information
     * @returns {Promise<Object|null>} Updated device information or null if failed
     */
    async refreshDeviceData(deviceInfo) {
        // Skip refresh untuk fallback devices
        if (!deviceInfo.id || deviceInfo.id.toString().startsWith('fallback-')) {
            console.log(`⏭️ Skipping refresh for fallback device ${deviceInfo.name} (no API refresh for fallback)`);
            return deviceInfo;
        }

        try {
            console.log(`🔄 Refreshing device data for ${deviceInfo.name}...`);
            
            // Ambil kembali semua data CCTV dari API
            const updatedDeviceList = await this.apiClient.getCCTVData();
            
            // Cari device yang sesuai berdasarkan ID
            const updatedDevice = updatedDeviceList.find(device => device.id === deviceInfo.id);
            
            if (updatedDevice) {
                console.log(`✅ Device ${deviceInfo.name} refreshed - Status: ${updatedDevice.status ? 'ON' : 'OFF'}`);
                return updatedDevice;
            } else {
                console.log(`⚠️ Device ${deviceInfo.name} tidak ditemukan setelah refresh`);
                return null;
            }
        } catch (error) {
            console.error(`❌ Error refreshing device data for ${deviceInfo.name}:`, error.message);
            console.log(`🔄 Using existing device data for ${deviceInfo.name}`);
            return deviceInfo; // Return original data if refresh fails
        }
    }

    /**
     * Authenticate and fetch devices from API
     * @private
     */
    async _authenticateAndFetchDevices() {
        console.log('=== MEMULAI PROSES LOGIN ===');

        const loginResult = await this.apiClient.login(
            CONFIG.DEFAULT_CREDENTIALS.email,
            CONFIG.DEFAULT_CREDENTIALS.password
        );

        console.log('Login result:', loginResult);

        if (!loginResult.success) {
            console.error('Login gagal, tidak dapat mengakses API CCTV');
            throw new Error('Login failed');
        }

        console.log('\n=== LOGIN BERHASIL - MENGAMBIL DATA CCTV ===');

        const deviceList = await this.apiClient.getCCTVData();

        if (deviceList.length > 0) {
            await this._pingDevices(deviceList);
        } else {
            console.log('Tidak ada IP valid yang ditemukan dari API CCTV');
        }
    }

    /**
     * Ping multiple devices simultaneously
     * @param {Array} deviceList - List of devices to ping
     * @private
     */
    async _pingDevices(deviceList) {
        console.log(`\n=== MELAKUKAN PING KE ${deviceList.length} DEVICE SECARA BERSAMAAN ===`);
        console.log('💡 Logic baru berdasarkan status device:');
        console.log('   - Jika device status OFF dan ping berhasil → HIDUPKAN CCTV');
        console.log('   - Jika device status ON dan ping berhasil → SKIP (sudah ON)');
        console.log('   - Jika device status ON dan ping gagal → MATIKAN CCTV');
        console.log('   - Jika device status OFF dan ping gagal → SKIP (sudah OFF)');
        console.log('💡 Setiap selesai ping akan refresh device data dari API\n');

        // Store device list for parallel ping
        this.deviceList = deviceList;
        this.isParallelPingActive = true;

        // Store devices in map untuk akses cepat berdasarkan ID
        this.deviceMap.clear();
        deviceList.forEach(device => {
            this.deviceMap.set(device.id, device);
        });

        // Display device list
        deviceList.forEach((device, index) => {
            console.log(`[${index + 1}/${deviceList.length}] Device: ${device.name}`);
            console.log(`  IP: ${device.ip}`);
            console.log(`  Status: ${device.status ? 'ON' : 'OFF'}`);
            console.log(`  RTSP URL: ${device.rtsp_url}`);
            console.log(`  Path Slug: ${device.pathSlug}\n`);
        });

        // Start parallel ping for all devices
        this._startParallelPing(deviceList);
    }

    /**
     * Start parallel ping for all devices
     * @param {Array} deviceList - List of devices to ping
     * @private
     */
    _startParallelPing(deviceList) {
        if (!this.isParallelPingActive || deviceList.length === 0) {
            return;
        }

        console.log(`\n🚀 Memulai ping parallel untuk ${deviceList.length} devices...`);

        // Start ping for each device simultaneously
        deviceList.forEach((device, index) => {
            console.log(`🔄 [${index + 1}/${deviceList.length}] Starting parallel ping for ${device.name} (${device.ip})`);
            
            // Ping immediately
            NetworkUtils.pingDevice(device, this);
            
            // Set up interval for continuous ping
            const intervalId = setInterval(() => {
                if (this.isParallelPingActive) {
                    console.log(`🔄 [${index + 1}/${deviceList.length}] Pinging ${device.name} (${device.ip})`);
                    NetworkUtils.pingDevice(device, this);
                } else {
                    clearInterval(intervalId);
                }
            }, CONFIG.PING_DELAY);

            // Store interval ID for cleanup
            this.pingIntervals.set(`${device.ip}-${device.name}`, intervalId);
        });
    }

    /**
     * Stop parallel ping for all devices
     */
    stopParallelPing() {
        this.isParallelPingActive = false;
        
        // Clear all intervals
        for (const [deviceKey, intervalId] of this.pingIntervals.entries()) {
            clearInterval(intervalId);
            console.log(`🛑 Stopped ping for ${deviceKey}`);
        }
        
        this.pingIntervals.clear();
        console.log('🛑 All parallel pings stopped');
    }

    /**
     * Start sequential ping for all devices
     * @private
     */
    _startSequentialPing() {
        if (!this.isSequentialPingActive || this.deviceList.length === 0) {
            return;
        }

        // Get current device
        const currentDevice = this.deviceList[this.currentDeviceIndex];
        console.log(`\n🔄 [${this.currentDeviceIndex + 1}/${this.deviceList.length}] Pinging ${currentDevice.name} (${currentDevice.ip})`);

        // Ping current device
        NetworkUtils.pingDevice(currentDevice, this);

        // Move to next device
        this.currentDeviceIndex = (this.currentDeviceIndex + 1) % this.deviceList.length;

        // Schedule next ping
        setTimeout(() => {
            this._startSequentialPing();
        }, CONFIG.PING_DELAY);
    }

    /**
     * Stop sequential ping
     */
    stopSequentialPing() {
        this.isSequentialPingActive = false;
        console.log('🛑 Sequential ping stopped');
    }

    /**
     * Start continuous ping loop for a device
     * @param {Object} device - Device information
     * @param {number} index - Device index for staggered start
     * @private
     */
    _startDevicePingLoop(device, index) {
        // Stagger the initial start
        setTimeout(() => {
            // Ping immediately, then set up interval
            NetworkUtils.pingDevice(device, this);

            // Continue ping every PING_DELAY milliseconds
            setInterval(() => {
                NetworkUtils.pingDevice(device, this);
            }, CONFIG.PING_DELAY);
        }, index * 500); // Stagger start by 500ms per device
    }

    /**
     * Run fallback devices when main flow fails
     * @private
     */
    async _runFallbackDevices() {
        console.log('\n=== MENGGUNAKAN IP DEFAULT KARENA ERROR ===');
        console.log('💡 Logic baru berdasarkan status device:');
        console.log('   - Jika device status OFF dan ping berhasil → HIDUPKAN CCTV');
        console.log('   - Jika device status ON dan ping berhasil → SKIP (sudah ON)');
        console.log('   - Jika device status ON dan ping gagal → MATIKAN CCTV');
        console.log('   - Jika device status OFF dan ping gagal → SKIP (sudah OFF)');
        console.log('💡 Untuk fallback devices, tidak ada refresh dari API\n');

        // Store fallback devices and start parallel ping
        this.deviceList = CONFIG.FALLBACK_DEVICES;
        this.isParallelPingActive = true;

        // Store fallback devices in map
        this.deviceMap.clear();
        CONFIG.FALLBACK_DEVICES.forEach(device => {
            this.deviceMap.set(device.id, device);
        });

        CONFIG.FALLBACK_DEVICES.forEach((device, index) => {
            console.log(`[${index + 1}/${CONFIG.FALLBACK_DEVICES.length}] Fallback Device: ${device.name}`);
            console.log(`  IP: ${device.ip}`);
            console.log(`  Status: ${device.status ? 'ON' : 'OFF'}`);
            console.log(`  Path Slug: ${device.pathSlug}\n`);
        });

        // Start parallel ping for fallback devices
        this._startParallelPing(CONFIG.FALLBACK_DEVICES);
    }
}

// Application entry point
const ipChecker = new IPChecker();
ipChecker.run();