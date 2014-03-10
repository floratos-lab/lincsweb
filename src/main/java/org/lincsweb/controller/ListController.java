package org.lincsweb.controller;

import flexjson.JSONDeserializer;
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

import java.util.ArrayList;
import java.util.List;

import org.lincsweb.util.Lincs;

@Controller
@RequestMapping("/list")
public class ListController {

	private static final Log log = LogFactory.getLog(ListController.class);

	private final static String EXPERIMENTAL = "Experimental";

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(method = { RequestMethod.POST, RequestMethod.GET }, headers = "Accept=application/json")
	public ResponseEntity<String> getSearchResultsInJson(
			@RequestParam("queryType") String queryType,
			@RequestParam("dataType") String dataType,
			@RequestParam("selectedTissues") String selectedTissues,
			@RequestParam("selectedCellLines") String selectedCellLines,
			@RequestParam("selectedDrug1s") String selectedDrug1s) {

		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json; charset=utf-8");

		List<String> selectedTissueList = null;
		List<String> selectedCellLineList = null;
		List<String> selectedDrug1List = null;

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

		Lincs lincs = Lincs.getInstance();

		List<String> theList = null;
		try {
			if (dataType.equalsIgnoreCase("cellLine")) {
				theList = addAll(lincs
						.getAllCellLineNamesForTissueTypes(selectedTissueList));
			} else if (dataType.equalsIgnoreCase("drug1")) {
				if (queryType.equalsIgnoreCase(EXPERIMENTAL))
					theList = addAll(lincs.getCompound1NamesFromExperimental(
							selectedTissueList, selectedCellLineList));
				else
					theList = addAll(lincs.getCompound1NamesFromComputational(
							selectedTissueList, selectedCellLineList));
			} else if (dataType.equalsIgnoreCase("drug2")) {
				if (queryType.equalsIgnoreCase(EXPERIMENTAL))
					theList = addAll(lincs.getCompound2NamesFromExperimental(
							selectedTissueList, selectedCellLineList,
							selectedDrug1List));
				else
					theList = addAll(lincs.getCompound2NamesFromComputational(
							selectedTissueList, selectedCellLineList,
							selectedDrug1List));
			}
		} catch (Exception ex) {
			log.error(ex.getMessage());
		}

		JSONSerializer jsonSerializer = new JSONSerializer().exclude("*.class");

		return new ResponseEntity<String>(
				jsonSerializer.deepSerialize(theList), headers, HttpStatus.OK);

	}

	private List<String> addAll(List<String> list) {
		if (list != null && list.size() > 0)
			list.add(0, "All");
		return list;
	}

	// test
	public static void main(String[] args) {

		ListController listController = new ListController();

	}

}
