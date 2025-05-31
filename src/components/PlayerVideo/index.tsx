'use client'

import { useEffect, useRef, useState } from 'react'

export default function RecorderPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recordedBlobsRef = useRef<Blob[]>([])

  const [isRecording, setIsRecording] = useState(false)

  // Fungsi untuk inisiasi WebRTC ke MediaMTX
  const startWebRTC = async () => {
    const pc = new RTCPeerConnection()

    pc.ontrack = (event) => {
      if (videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = event.streams[0]
      }
    }

    pc.addTransceiver('video', { direction: 'recvonly' })
    pc.addTransceiver('audio', { direction: 'recvonly' }) // jika ada audio

    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)

    // Kirim offer ke MediaMTX signaling server
    const res = await fetch('http://localhost:8889/camera1', {
      method: 'POST',
      body: new RTCSessionDescription(offer).sdp,
      headers: {
        'Content-Type': 'application/sdp',
      },
    })

    console.log(res)

    const answer = await res.text()
    await pc.setRemoteDescription(new RTCSessionDescription({
      type: 'answer',
      sdp: answer
    }))
  }

  // Mulai rekam
  const startRecording = async () => {
    if (!videoRef.current || !videoRef.current.srcObject) {
      alert('Tidak ada stream video yang tersedia untuk direkam.')
      return
    }

    const stream = videoRef.current.srcObject as MediaStream
    recordedBlobsRef.current = []

    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: 'video/webm; codecs=vp9,opus'
    })

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedBlobsRef.current.push(event.data)
      }
    }

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(recordedBlobsRef.current, { type: 'video/webm' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'rekaman.webm'
      a.click()
      URL.revokeObjectURL(url)
    }

    mediaRecorderRef.current.start()
    setIsRecording(true)
  }

  // Berhenti rekam
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  useEffect(() => {
    startWebRTC()
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Rekam Video WebRTC</h1>

      {/* Video Player */}
      <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', maxWidth: '640px', border: '1px solid #ccc' }} />

      {/* Tombol Kontrol */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={startRecording} disabled={isRecording}>
          🔴 Mulai Rekam
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          ■ Berhenti Rekam
        </button>
      </div>
    </div>
  )
}