package org.lincsweb.controller;

 

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
 
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
 
import org.lincsweb.data.LincsFieldInfo;
import org.lincsweb.util.LincsFields;
 

import flexjson.JSONSerializer;
 


@Controller
@RequestMapping("/field")
public class LincsDescriptionController {

	 
      @RequestMapping(method = { RequestMethod.POST, RequestMethod.GET }, headers = "Accept=application/json")
		public ResponseEntity<String> getLincsFieldDescriptions() {

			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json; charset=utf-8");
 
			LincsFieldInfo  lincsFieldInfo = LincsFields.getInstance().getLincsFieldInfo();
			 
			JSONSerializer jsonSerializer = new JSONSerializer().exclude("*.class");

			 
				return new ResponseEntity<String>(
						jsonSerializer.deepSerialize(lincsFieldInfo), headers, HttpStatus.OK);
			 
      }
	  
 

  	// test
  		public static void main(String[] args) {

  			LincsDescriptionController lincsDescriptionController = new LincsDescriptionController();
  			 
  			lincsDescriptionController.getLincsFieldDescriptions();
  			 
  		}
  	
	 
	
}
