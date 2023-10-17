// Automatically downloads a file in the browser
export const downloadFile = (fileData: Blob, filename: string) => {
  const href = URL.createObjectURL(fileData);
  const link = document.createElement('a');
  link.href = href;
  link.setAttribute('download', filename);

  document.body.appendChild(link);
  link.click();

  // cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};
