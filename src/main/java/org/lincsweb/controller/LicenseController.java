package org.lincsweb.controller;

 

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
 
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
 
import org.lincsweb.util.LincsLicense;

import flexjson.JSONSerializer;
 


@Controller
@RequestMapping("/license")
public class LicenseController {

	 
      @RequestMapping(method = { RequestMethod.POST, RequestMethod.GET }, headers = "Accept=application/json")
		public ResponseEntity<String> getLincsLicense() {

			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json; charset=utf-8");

			 LincsLicense lincsLicense = LincsLicense.getInstance();
			 
				JSONSerializer jsonSerializer = new JSONSerializer().exclude("*.class");

			 
				return new ResponseEntity<String>(
						jsonSerializer.deepSerialize(lincsLicense.getLicense()), headers, HttpStatus.OK);
			 
      }
	  
 
	
	// test
		public static void main(String[] args) {

			LicenseController licenseController = new LicenseController();
			 
			licenseController.getLincsLicense();
			 
		}
	
	
}
