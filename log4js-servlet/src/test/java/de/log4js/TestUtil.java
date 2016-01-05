package de.log4js;

import java.io.FileInputStream;

public class TestUtil {

	/**
	 * Converts a file specified by the path, to the String.
	 */
	public static String fileToString(String fileName) {
		if (fileName != null) {
			// String sLine;
			byte[] utf8Bytes;
			String sFile = new String();
			// Reading input by lines:
			try {
				FileInputStream fis = new FileInputStream(fileName);
				int noOfBytes = fis.available();
				if (noOfBytes > 0) {
					utf8Bytes = new byte[noOfBytes];
					fis.read(utf8Bytes);
					sFile = new String(utf8Bytes, "UTF8");
				}
			} catch (Exception ex) {
				return null;
			}
			return sFile;
		}
		return null;
	}

}
