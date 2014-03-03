package org.lincsweb.data;

import java.util.List;

public class LincsInfo {

	List<String> tissueTypeList = null;
	List<String> drug1List = null;	 
	List<String> assayTypeList = null;
	List<String> synergyMeasuremetnTypeList = null;
	List<String> similarityAlgorithmList = null;

	public LincsInfo(List<String> tissueTypeList, List<String> drug1List,
			List<String> assayTypeList,
			List<String> synergyMeasuremetnTypeList,
			List<String> similarityAlgorithmList) {
		
		this.tissueTypeList = tissueTypeList;
		this.drug1List = drug1List;		 
		this.assayTypeList = assayTypeList;
		this.synergyMeasuremetnTypeList = synergyMeasuremetnTypeList;
		this.similarityAlgorithmList = similarityAlgorithmList;

	}

	public void setTissueTypeList(List<String> tissueTypeList) {
		this.tissueTypeList = tissueTypeList;
	}

	public void setDrug1List(List<String> drug1List) {
		this.drug1List = drug1List;
	}
	
	 
	public void setAssayTypeList(List<String> assayTypeList) {
		this.assayTypeList = assayTypeList;
	}

	public void setSynergyMeasuremetnTypeList(
			List<String> synergyMeasuremetnTypeList) {
		this.synergyMeasuremetnTypeList = synergyMeasuremetnTypeList;
	}

	public void setSimilarityAlgorithmList(List<String> similarityAlgorithmList) {
		this.similarityAlgorithmList = similarityAlgorithmList;
	}
	
	public List<String> getTissueTypeList() {
		 return this.tissueTypeList;
	}
	
	public List<String> getDrug1List() {
		 return this.drug1List;
	}
	public List<String> getAssayTypeList() {
		 return this.assayTypeList;
	}
	public List<String> getSynergyMeasuremetnTypeList() {
		 return this.synergyMeasuremetnTypeList;
	}
	public List<String> getSimilarityAlgorithmList() {
		 return this.similarityAlgorithmList;
	}
}
