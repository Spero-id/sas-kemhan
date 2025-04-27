export default function VideoUpload() {
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      // 1MB
      alert("Gambar terlalu besar, maksimal 1MB.");
      return;
    }
  };

  return <input type="file" accept="image/*" onChange={handleUploadImage} />;
}
