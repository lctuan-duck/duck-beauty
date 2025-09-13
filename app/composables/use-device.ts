export function useGenerateDeviceId(): string {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return crypto.randomUUID();

    // Vẽ text để tạo fingerprint
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText("duck-device-id", 2, 15);
    ctx.fillStyle = "rgba(102, 200, 0, 0.7)";
    ctx.fillText("duck-beauty", 4, 17);

    const dataUrl = canvas.toDataURL();
    // Lấy thêm thông tin trình duyệt để tăng entropy
    const userAgent = navigator.userAgent;
    // Kết hợp cả hai để tạo hash
    const combined = dataUrl + userAgent;

    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      const chr = combined.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }

    return `${Math.abs(hash).toString(16)}`;
  } catch {
    return crypto.randomUUID();
  }
}
