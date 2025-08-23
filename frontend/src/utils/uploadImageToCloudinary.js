const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const UPLOAD_OPTIONS = {
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxFilenameLength: 100,
};

export const secureImageUpload = async (file) => {
    // Input Validation 
    if (!file || !(file instanceof File)) {
        throw new Error('Invalid file object provided');
    }

    // File Name Sanitization
    const sanitizedFilename = file.name
        .replace(/[^a-zA-Z0-9_\-.]/g, '')
        .substring(0, UPLOAD_OPTIONS.maxFilenameLength);

    // File Type Validation
    if (!UPLOAD_OPTIONS.allowedMimeTypes.includes(file.type)) {
        throw new Error(`Unsupported file type. Allowed types: ${UPLOAD_OPTIONS.allowedMimeTypes.join(', ')}`);
    }

    // File Size Validation 
    if (file.size > UPLOAD_OPTIONS.maxFileSize) {
        throw new Error(`File exceeds maximum size of ${UPLOAD_OPTIONS.maxFileSize / (1024 * 1024)}MB`);
    }

    const formData = new FormData();
    formData.append('file', file, sanitizedFilename);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
        // Secure Request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

        const response = await fetch(CLOUDINARY_API_URL, {
            method: 'POST',
            body: formData,
            signal: controller.signal,
            credentials: 'omit', // Don't send cookies
        });
        clearTimeout(timeoutId);

        // Response Validation
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `Upload failed with status ${response.status}`);
        }

        const result = await response.json();

        // Output Validation
        if (!result?.secure_url || !result?.publicid) {
            throw new Error('Invalid response structure from Cloudinary');
        }

        console.log(result.secure_url);

        return  result.secure_url;

    } catch (error) {
        // Secure Error Handling
        console.error('Secure upload failed:', error.name, error.message);
        // Consider sending to security monitoring system
        throw new Error('Image upload failed. Please try again.'); 
    }
};
