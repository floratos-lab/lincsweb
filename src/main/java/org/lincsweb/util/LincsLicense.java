package org.lincsweb.util;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.io.IOException;

public class LincsLicense {

	private static final String LICENSES_FILE = "/license.txt";
	String license = "License is not available.";
	static LincsLicense instance = null;

	public LincsLicense() {
		InputStream inputStream = null;
		try {
			inputStream = this.getClass().getClassLoader()
					.getResourceAsStream(LICENSES_FILE);
			if (inputStream != null) {
				InputStreamReader is = new InputStreamReader(inputStream);
				StringBuilder sb = new StringBuilder();
				BufferedReader br = new BufferedReader(is);
				String read = br.readLine();

				while (read != null) {
					sb.append(read);
					read = br.readLine();

				}

				license = sb.toString();

			}
		} catch (IOException ie) {

			ie.printStackTrace();
		}
	}

	public static LincsLicense getInstance() {
		if (instance == null)
			instance = new LincsLicense();

		return instance;
	}

	public String getLicense() {
		return license;
	}

}
