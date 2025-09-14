import { axiosClient } from "@/common/utils/AxiosClient";
import { GenerateMediaMTXResponse } from "@/types/GenerateMediaMTX/TypeGenerateMediaMTX";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { NextResponse } from "next/server";


type Device = {
    path_slug: string;
    rtsp_url: string;
    need_convert?: boolean;
};

export const AddPathMediaMTX = async (type: "cctv" | "body-worm" | "helmet", device: Device) => {
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
        if (device.path_slug && device.rtsp_url) {
            config.paths[device.path_slug] = {
                source: !('need_convert' in device) || device.need_convert ? "publisher" : device.rtsp_url,
            };
        }


        console.log(config)

        const yamlStr = yaml.dump(config, { noRefs: true, lineWidth: -1 });
        fs.writeFileSync(filePath, yamlStr, "utf8");
        return "OK";
    } catch (err: any) {
        console.log(err);
        return err.message || "Failed to update MediaMTX configuration";
    }
}
