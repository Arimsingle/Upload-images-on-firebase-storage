import React, { useState, useEffect } from "react";
import { storage } from "./firebase/firebase.js";

function App() {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState([]);

  useEffect(() => {
    getImageFirebase();
  }, [file]);
  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then(() => {
          setFile(null);
        });
    });
  }

  const getImageFirebase = async () => {
    const storageFirebase = storage.ref();
    storageFirebase
      .child("/images")
      .listAll()
      .then(async (res) => {
        return await res.items.map((nameImg) => {
          return storageFirebase
            .child(`/images/${nameImg.name}`)
            .getDownloadURL()
            .then((url) => {
              return { url, name: nameImg.name };
            });
        });
      })
      .then((res) => {
        Promise.all(res).then((values) => {
          setImg(values);
        });
      });
  };
  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleChange} />
        <button disabled={!file}>upload to firebase</button>
      </form>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {img.length > 0
          ? img.map((ImgUrl, index) => {
              return (
                <div key={index}>
                  <p style={{ textAlign: "center" }}>
                    {ImgUrl.name.slice(0, ImgUrl.name.length - 4)}
                  </p>
                  <img
                    src={ImgUrl.url}
                    alt=""
                    style={{ width: "300px", height: "300px" }}
                  />
                </div>
              );
            })
          : "No image"}
      </div>
    </div>
  );
}
export default App;
