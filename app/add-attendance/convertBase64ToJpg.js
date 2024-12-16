export const convertBase64ImageToJpg = async (base64String) => {
    if (!base64String.startsWith("data:image")) {
        throw new Error("Invalid Base64 image string.");
      }
  
      // Extract Base64 content and MIME type
      const [header, base64Data] = base64String.split(",");
      const mimeMatch = header.match(/:(.*?);/);
      if (!mimeMatch) {
        throw new Error("MIME type not found in Base64 string.");
      }
  
      const mimeType = mimeMatch[1];
  
      // Convert Base64 content to a byte array
      const byteString = atob(base64Data);
      const byteArray = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
      }
  
      // Create a Blob from the byte array
      const imageBlob = new Blob([byteArray], { type: "image/jpg" });
      return imageBlob;
};
  