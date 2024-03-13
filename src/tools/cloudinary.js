const cloudinary = require ( "cloudinary" ); 

  // teléchargement d'image
  const cloudinaryUploadFiles = async (fileToUpload) => {
    try {
      const data = await cloudinary.uploader.upload(fileToUpload, {
        resource_type: "auto",
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error (cloudinary)");
    }
  };

  // suppresion files
  const cloudinaryRemoveFile = async (fileId) => {
    try {
      const result = await cloudinary.uploader.destroy(fileId);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error (cloudinary)");
    }
  };

  module.exports = {
    cloudinary,
    cloudinaryRemoveFile,
    cloudinaryUploadFiles,
  };

