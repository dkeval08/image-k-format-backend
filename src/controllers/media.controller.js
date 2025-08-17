import cloudinary from "../utils/cloudinary.js";

// Original upload function
export const mediaUpload = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "uploads",
    });

    console.log("Cloudinary Upload Result:", uploadResult);

    return res.status(200).json({
      success: true,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      original: {
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        size: uploadResult.bytes,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message, success: false });
  }
};

// Image transformation function
export const transformImage = async (req, res) => {
  try {
    const { public_id, transformations } = req.body;

    if (!public_id) {
      return res.status(400).json({ error: "Public ID is required" });
    }

    // Build transformation options
    const transformOptions = {};

    if (transformations.format) {
      transformOptions.format = transformations.format;
    }

    if (transformations.quality) {
      transformOptions.quality = transformations.quality;
    }

    if (transformations.width || transformations.height) {
      transformOptions.width = transformations.width;
      transformOptions.height = transformations.height;
      transformOptions.crop = transformations.crop || "fill";
    }

    if (transformations.enhance) {
      transformOptions.effect = "enhance";
    }

    if (transformations.brightness) {
      transformOptions.effect = `brightness:${transformations.brightness}`;
    }

    if (transformations.contrast) {
      transformOptions.effect = `contrast:${transformations.contrast}`;
    }

    if (transformations.saturation) {
      transformOptions.effect = `saturation:${transformations.saturation}`;
    }

    if (transformations.blur) {
      transformOptions.effect = `blur:${transformations.blur}`;
    }

    if (transformations.sharpen) {
      transformOptions.effect = `sharpen:${transformations.sharpen}`;
    }

    // Generate transformed URL
    const transformedUrl = cloudinary.url(public_id, transformOptions);

    return res.status(200).json({
      success: true,
      transformed_url: transformedUrl,
      transformations: transformOptions,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message, success: false });
  }
};

// Get image information
export const getImageInfo = async (req, res) => {
  try {
    const { public_id } = req.params;

    const result = await cloudinary.api.resource(public_id);

    return res.status(200).json({
      success: true,
      info: {
        public_id: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
        size: result.bytes,
        created_at: result.created_at,
        url: result.secure_url,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message, success: false });
  }
};

// Auto-optimize image
export const optimizeImage = async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({ error: "Public ID is required" });
    }

    // Auto optimization with Cloudinary
    const optimizedUrl = cloudinary.url(public_id, {
      quality: "auto",
      fetch_format: "auto",
    });

    return res.status(200).json({
      success: true,
      optimized_url: optimizedUrl,
      optimization: "auto",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message, success: false });
  }
};

// Background removal (requires Cloudinary AI package)
export const removeBackground = async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({ error: "Public ID is required" });
    }

    const bgRemovedUrl = cloudinary.url(public_id, {
      effect: "background_removal",
    });

    return res.status(200).json({
      success: true,
      bg_removed_url: bgRemovedUrl,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message, success: false });
  }
};
