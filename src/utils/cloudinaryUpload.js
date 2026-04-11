// Cloudinary Upload Utility for Admin Dashboard

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload image or video to Cloudinary
 * @param {File} file - Image or video file to upload
 * @returns {Promise<Object>} Object with downloadURL and public_id
 */
export const uploadToCloudinary = async (file) => {
  try {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      throw new Error('Cloudinary configuration missing. Check your .env file.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
    // Determine resource type based on file type
    const resourceType = file.type.startsWith('video/') ? 'video' : 'image';
    
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;

    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Upload failed');
    }

    const data = await response.json();
    
    return {
      downloadURL: data.secure_url,
      publicId: data.public_id,
      resourceType: data.resource_type,
      format: data.format,
      width: data.width,
      height: data.height,
      bytes: data.bytes
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

/**
 * Delete image or video from Cloudinary (requires backend)
 * Note: This requires server-side implementation with Cloudinary API credentials
 * For now, manual deletion via Cloudinary Dashboard is required
 * @param {string} publicId - Cloudinary public_id
 */
export const deleteFromCloudinary = async (publicId) => {
  console.warn('Delete from Cloudinary requires server-side implementation');
  console.log('Please delete manually from Cloudinary Dashboard:', publicId);
  // This would require a backend endpoint with Cloudinary API secret
};
