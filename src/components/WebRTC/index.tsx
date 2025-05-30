// components/WebRTCPlayer.js
import React, { useEffect, useRef, useState } from 'react';

const WebRTCPlayer = ({ mediaMtxServerUrl, streamPath }) => {
  const videoRef = useRef(null);
  const pcRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fungsi initWebRTC hanya akan dipanggil di sisi klien (browser)
    const initWebRTC = async () => {
      if (!videoRef.current) return;

      setLoading(true);
      setError(null);

      try {
        const pc = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] // Sesuaikan jika Anda punya server STUN/TURN lain
        });
        pcRef.current = pc;

        pc.ontrack = (event) => {
          console.log('Stream added:', event.track.kind);
          if (videoRef.current && event.streams && event.streams[0]) {
            videoRef.current.srcObject = event.streams[0];
            setLoading(false);
          }
        };

        pc.oniceconnectionstatechange = () => {
          console.log('ICE connection state:', pc.iceConnectionState);
          if (pc.iceConnectionState === 'failed' || pc.iceConnectionState === 'disconnected') {
            setError('ICE connection failed or disconnected.');
            setLoading(false);
          } else if (pc.iceConnectionState === 'connected') {
            setLoading(false);
          }
        };

        pc.onicecandidate = async (event) => {
          if (event.candidate) {
            // Kirim ICE candidate ke MediaMTX
            try {
              const response = await fetch(`${mediaMtxServerUrl}/${streamPath}/whep`, {
                method: 'PATCH',
                body: JSON.stringify(event.candidate),
                headers: { 'Content-Type': 'application/trickle-ice-sdpfrag' }
              });
              if (!response.ok) {
                console.error('Failed to send ICE candidate:', response.statusText);
              }
            } catch (patchError) {
              console.error('Error sending ICE candidate:', patchError);
            }
          }
        };

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        // Kirim SDP Offer ke MediaMTX
        const response = await fetch(`${mediaMtxServerUrl}/${streamPath}/whep`, {
          method: 'POST',
          body: offer.sdp,
          headers: { 'Content-Type': 'application/sdp' }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const answerSdp = await response.text();
        await pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: answerSdp }));

      } catch (err) {
        console.error('Error starting WebRTC:', err);
        setError(`Failed to load stream: ${err.message}`);
        setLoading(false);
      }
    };

    // Pastikan kode berjalan hanya di lingkungan browser
    if (typeof window !== 'undefined') {
      initWebRTC();
    }

    // Cleanup function: Tutup RTCPeerConnection saat komponen di-unmount
    return () => {
      if (pcRef.current) {
        pcRef.current.close();
        pcRef.current = null;
        console.log('WebRTC connection closed.');
      }
    };
  }, [mediaMtxServerUrl, streamPath]); // Re-run effect jika prop berubah

  return (
    <div>
      {loading && <p>Loading stream...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <video
        ref={videoRef}
        controls
        autoPlay
        playsInline // Penting untuk autoplay di perangkat mobile
        style={{ width: '100%', maxWidth: '800px', display: loading || error ? 'none' : 'block' }}
      ></video>
    </div>
  );
};

export default WebRTCPlayer;