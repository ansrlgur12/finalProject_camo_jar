import React, { useState } from "react";
import { storage } from '../../firebase/firebaseConfig';

const ImageTest = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [downloadUrls, setDownloadUrls] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setSelectedFiles([...selectedFiles, ...filesArray]);
  };

  const handleUpload = async () => {
    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        return fileRef.getDownloadURL();
      });

      const urls = await Promise.all(uploadPromises);
      setDownloadUrls(urls);
    } catch (error) {
      console.log(error);
      throw new Error('이미지 업로드에 실패하였습니다.');
    }
  };

  return (
    <>
      <div>
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <div className="preview-container">
        {selectedFiles.map((file) => (
          <img
            key={file.name}
            src={URL.createObjectURL(file)}
            alt={file.name}
            style={{ maxWidth: "200px", maxHeight: "200px" }}
            className="preview-image"
          />
        ))}
      </div>
      <div>
        {downloadUrls.map((url, index) => (
          <p key={index}>{url}</p>
        ))}
      </div>
    </>
  );
};

export default ImageTest;
