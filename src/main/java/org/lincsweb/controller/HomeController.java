package org.lincsweb.controller;

import flexjson.JSONSerializer;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
 
import java.util.List;

import org.lincsweb.util.Lincs;
import org.lincsweb.data.LincsInfo;


@Controller
@RequestMapping("/home")
public class HomeController {

	 
	private static final Log log = LogFactory.getLog(HomeController.class);
 
	private final static String EXPERIMENTAL = "Experimental";
	private final static String COMPUTATIONAL = "Computational";
	 
      @RequestMapping(method = { RequestMethod.POST, RequestMethod.GET }, headers = "Accept=application/json")
		public ResponseEntity<String> getLincsInfo(@RequestParam("queryType") String queryType) {

			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Type", "application/json; charset=utf-8");

			 Lincs lincs = Lincs.getInstance();
			 
				List<String> tissueTypeList = null;
				List<String> drug1List = null;
				List<String> assayTypeList = null;
				List<String> synergyMeasurementTypeList = null;
				List<String> similarityAlgorithmList = null;
				
				
				try {
					
					if (queryType.equalsIgnoreCase(EXPERIMENTAL))
					{    
						tissueTypeList = addAll(lincs.getAllTissueNames());
						drug1List = addAll(lincs.getCompound1NamesFromExperimental(null,
							null));
					}
					else
					{
						tissueTypeList = addAll(lincs.getComputationaTissueNames());
						drug1List = addAll(lincs.getCompound1NamesFromComputational(null,
									null));
					}
					assayTypeList = addAll(lincs.getAllAssayTypeNames());
					synergyMeasurementTypeList = addAll(lincs
							.getAllMeasurementTypeNames());
					similarityAlgorithmList = addAll(lincs
							.getALLSimilarAlgorithmNames());
				} catch (Exception ex) {
					log.error(ex.getMessage());
				}

				
				LincsInfo lincsInfo = new LincsInfo(tissueTypeList, drug1List,
						assayTypeList,
						synergyMeasurementTypeList,
						similarityAlgorithmList) ;
     
			JSONSerializer jsonSerializer = new JSONSerializer().exclude("*.class");

			// System.out.println(jsonSerializer.deepSerialize(throttleValue));
			return new ResponseEntity<String>(
					jsonSerializer.deepSerialize(lincsInfo), headers, HttpStatus.OK);

		}   
	
	  

	     private List<String> addAll(List<String> list) {
		    if (list != null && list.size() > 0)
			    list.add(0, "All");
		    return list;
	     }
	
	
	// test
		public static void main(String[] args) {

			HomeController homeController = new HomeController();
			 
			 
			 
		}
	
	
}
