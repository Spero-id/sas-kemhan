import HLSPlayer from "../HLSPlayer";

export default function GenerateMediaMTX() {
  return <HLSPlayer src={`stream/${pathSlug}/out.m3u8`}/>;
}
