package com.bs.util;

import java.io.FileNotFoundException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

import io.jsonwebtoken.io.IOException;

public class ImageProcessUtils {
 

	public static String saveImage(String base64Image, String ImageName) throws IOException {
		if (base64Image == null)
			return null;
		Path imagePath = null;
		try {
			String[] parts = base64Image.split("::");
			String fileType = parts[0];
			String imageData = parts[1];

			// Convert base64 string to byte array
			byte[] imageBytes = Base64.getDecoder().decode(imageData);

			// Create save directory if it does not exist
			Path fileSaveDir = Paths.get("src/main/resources/static/images/users");
			if (!Files.exists(fileSaveDir)) {
				Files.createDirectories(fileSaveDir);
			}
			// Get file path of saved image file
			imagePath = fileSaveDir.resolve(ImageName + "." + fileType);

			Files.write(imagePath, imageBytes);

		} catch (Exception e) {
			e.printStackTrace();
			throw new IOException("Could not save image file", e);
		}
		return imagePath.toString();
	}

	public static String loadImageAsBase64(String imagePath) throws Exception {
		Path filePath = Paths.get(imagePath);

		if (!Files.exists(filePath)) {
			throw new FileNotFoundException("File not found: " + imagePath);
		}

		byte[] imageBytes = Files.readAllBytes(filePath);
		String imageData = Base64.getEncoder().encodeToString(imageBytes);

		return imageData;
	}

	public static boolean deleteImage(String imagePath) throws IOException {
		try {
			Path filePath = Paths.get(imagePath);

			if (!Files.exists(filePath)) {
				throw new FileNotFoundException("File not found: " + imagePath);
			}

			Files.delete(filePath);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			throw new IOException("Could not delete image file", e);
		}
	}
	
	public static String updateImage(String base64Image, String oldImagePath, String newImageName) throws IOException {
	    // Delete old image
	    if (oldImagePath != null) {
	        boolean isDeleted = ImageProcessUtils.deleteImage(oldImagePath);
	        if (!isDeleted) {
	            throw new IOException("Could not delete old image file");
	        }
	    }
	    // Save new image
	    String newImagePath = ImageProcessUtils.saveImage(base64Image, newImageName);
	    return newImagePath;
	}


}
