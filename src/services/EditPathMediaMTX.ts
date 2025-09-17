import yaml from "js-yaml";
import fs from "fs";
import path from "path";

export const EditPathMediaMTX = async (path_slug: string, device: any) => {
    console.log(device.need_convert);

    const MEDIAMTX_STUN = process.env.MEDIAMTX_STUN;
    const MEDIAMTX_ADDITIONAL_HOSTS = (process.env.MEDIAMTX_ADDITIONAL_HOSTS ?? '').split(',').map(h => h.trim()).filter(Boolean);
    try {
        const filePath = path.join(process.cwd(), "config/mediamtx.yml");
        let config: any;
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, "utf8");
            config = yaml.load(fileContent) || {};
        } else {
            config = {
                rtmp: true,
                rtmpAddress: ":1935",
                webrtc: true,
                webrtcAddress: ":8889",
                webrtcEncryption: false,
                webrtcAllowOrigin: "*",
                webrtcTrustedProxies: [],
                webrtcLocalUDPAddress: ":8189",
                webrtcLocalTCPAddress: '',
                api: true,
                apiAddress: ':9997',
                webrtcIPsFromInterfaces: false,
                webrtcIPsFromInterfacesList: [],
                webrtcAdditionalHosts: [MEDIAMTX_ADDITIONAL_HOSTS.join(',')],
                webrtcICEServers2: [
                    {
                        url: MEDIAMTX_STUN,
                    },
                ],
                authInternalUsers: [
                    {
                        user: "any",
                        permissions: [
                            { action: "api" },
                            { action: "publish" },
                            { action: "read" }
                        ]
                    }
                ],
                webrtcHandshakeTimeout: "10s",
                webrtcTrackGatherTimeout: "2s",
                webrtcSTUNGatherTimeout: "5s",
                paths: {},
            };
        }


        if (!config.paths) config.paths = {};
        if (path_slug) {
            config.paths[path_slug] = {
                source: !('need_convert' in device) || device.need_convert ? "publisher" : device.rtsp_url,
            };
        }


        const yamlStr = yaml.dump(config, { noRefs: true, lineWidth: -1 });
        fs.writeFileSync(filePath, yamlStr, "utf8");
        return "OK";
    } catch (err: any) {
        console.log(err);
        return err.message || "Failed to update MediaMTX configuration";
    }
}
