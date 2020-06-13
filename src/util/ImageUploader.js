import firebase from '../firebase/firebase';

const imageUploader = (file, fileName, contentIds) => {
  var storage = firebase.storage();

  var storageRef = storage.ref();
  var uploadTask = storageRef.child(fileName).put(file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on(
    'state_changed',
    function (snapshot) {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    },
    function (error) {
      // Handle unsuccessful uploads
      console.log('errorrr', error);
    },
    function () {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('File available at', downloadURL);
      });
    },
  );
};

export default imageUploader;
