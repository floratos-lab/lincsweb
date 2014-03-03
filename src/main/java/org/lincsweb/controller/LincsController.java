package org.lincsweb.controller;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import flexjson.JSONSerializer;
import flexjson.JSONDeserializer;

import org.lincsweb.util.Lincs;
import org.geworkbench.service.lincs.data.xsd.ExperimentalData;
import org.geworkbench.service.lincs.data.xsd.ComputationalData;

@Controller
@RequestMapping("/lincs")
public class LincsController {

	private static final Log log = LogFactory.getLog(LincsController.class);
	private final static String EXPERIMENTAL = "Experimental";

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(method = { RequestMethod.POST, RequestMethod.GET }, headers = "Accept=application/json")
	public ResponseEntity<String> getLincsData(
			@RequestParam("queryType") String queryType,
			@RequestParam("dataType") String dataType,
			@RequestParam("selectedTissues") String selectedTissues,
			@RequestParam("selectedCellLines") String selectedCellLines,
			@RequestParam("selectedDrug1s") String selectedDrug1s,
			@RequestParam("selectedDrug2s") String selectedDrug2s,
			@RequestParam("measurmentTypes") String measurmentTypes,
			@RequestParam("assayTypes") String assayTypes,
			@RequestParam("similarityAlgorithms") String similarityAlgorithms,
			@RequestParam("rowLimit") int rowLimit) {

		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json; charset=utf-8");

		List<String> selectedTissueList = null;
		List<String> selectedCellLineList = null;
		List<String> selectedDrug1List = null;
		List<String> selectedDrug2List = null;
		List<String> measurmentTypeList = null;
		List<String> assayTypeList = null;
		List<String> similarityAlgorithmList = null;

		if (selectedTissues != null && selectedTissues.length() > 0) {
			selectedTissueList = (List<String>) new JSONDeserializer()
					.deserialize(selectedTissues);

		}

		if (selectedCellLines != null && selectedCellLines.length() > 0) {
			selectedCellLineList = (List<String>) new JSONDeserializer()
					.deserialize(selectedCellLines);
		}

		if (selectedDrug1s != null && selectedDrug1s.length() > 0) {
			selectedDrug1List = (List<String>) new JSONDeserializer()
					.deserialize(selectedDrug1s);

		}
		if (selectedDrug2s != null && selectedDrug2s.length() > 0) {
			selectedDrug2List = (List<String>) new JSONDeserializer()
					.deserialize(selectedDrug2s);

		}

		if (measurmentTypes != null && measurmentTypes.length() > 0) {
			measurmentTypeList = (List<String>) new JSONDeserializer()
					.deserialize(measurmentTypes);

		}
		if (assayTypes != null && assayTypes.length() > 0) {
			assayTypeList = (List<String>) new JSONDeserializer()
					.deserialize(assayTypes);

		}
		if (similarityAlgorithms != null && similarityAlgorithms.length() > 0) {
			similarityAlgorithmList = (List<String>) new JSONDeserializer()
					.deserialize(similarityAlgorithms);

		}

		JSONSerializer jsonSerializer = new JSONSerializer().exclude("*.class");

		ResponseEntity<String> respObj = null;

		Lincs lincs = Lincs.getInstance();

		try {

			if (queryType.equalsIgnoreCase(EXPERIMENTAL)) {
				List<ExperimentalData> dataList = lincs.getExperimentalData(
						selectedTissueList, selectedCellLineList,
						selectedDrug1List, selectedDrug2List,
						measurmentTypeList, assayTypeList, false, rowLimit);
				respObj = new ResponseEntity<String>(
						jsonSerializer.deepSerialize(dataList), headers,
						HttpStatus.OK);

			} else {
				List<ComputationalData> dataList = lincs.getComputationalData(
						selectedTissueList, selectedCellLineList,
						selectedDrug1List, selectedDrug2List,
						similarityAlgorithmList, rowLimit);
				respObj = new ResponseEntity<String>(
						jsonSerializer.deepSerialize(dataList), headers,
						HttpStatus.OK);

			}
		} catch (Exception ex) {
			log.error(ex.getMessage());
		}

		return respObj;

		// System.out.println(jsonSerializer.deepSerialize(throttleValue));

	}

	// test
	public static void main(String[] args) {

		LincsController lincsController = new LincsController();
		String dataUrl = "http://localhost:8080/ctd2-dashboard/submissions/MRA_Combine-gbm-filtered.txt";
		// mraController.convertMRAtoJSON(dataUrl, "mra", "", "");

		// lincsController.convertMRAtoJSON(dataUrl);
		// mraController.convertMRAtoJSON(dataUrl, "throttle", "", 150, null);

	}
}
