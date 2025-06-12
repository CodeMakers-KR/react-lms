export const handleFileDownload = (setIsDownloading, src) => {
  setIsDownloading(true);
  const fileUrl = `${src}`;

  fetch(fileUrl, { responseType: "blob" })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = src || "download";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setIsDownloading(false);
    })
    .catch((error) => {
      console.error("파일 다운로드 오류:", error);
      setIsDownloading(false);
    });
};
