package org.lincsweb.data;
 
public class LincsFieldInfo {
	
	String tissueType;
	String cellLine;
	String drug1;
	String drug2;
	String assayType;
	String synergyMeasure;
    String similarityAlgorithm;  
    String score;
    String scoreError;
    String pvalue;
    
    
    
    public LincsFieldInfo()    {}
    
    public void setTissueType(String tissueType) {
		this.tissueType = tissueType;
	}

    public void setCellLine(String cellLine) {
		this.cellLine = cellLine;
	}
	public void setDrug1(String drug1) {
		this.drug1 = drug1;
	}
	
	public void setDrug2(String drug2) {
		this.drug2 = drug2;
	}
	public void setAssayType(String assayType) {
		this.assayType = assayType;
	}

	public void setSynergyMeasure(
			String synergyMeasure) {
		this.synergyMeasure = synergyMeasure;
	}

	public void setSimilarityAlgorithm(String similarityAlgorithm) {
		this.similarityAlgorithm = similarityAlgorithm;
	}
	
	
	public void setScore(String score) {
		this.score = score;
	}
	
	public void setScoreError(String scoreError) {
		this.scoreError = scoreError;
	}
	
	
	public void setPvalue(String pvalue) {
		this.pvalue = pvalue;
	}
	
	
	public String getTissueType() {
		 return this.tissueType;
	}
	
	public String getCellLine() {
		 return this.cellLine;
	}
	
	public String getDrug1() {
		 return this.drug1;
	}
	
	public String getDrug2() {
		 return this.drug2;
	}
	
	public String getAssayType() {
		 return this.assayType;
	}
	public String getSynergyMeasure() {
		 return this.synergyMeasure;
	}
	public String getSimilarityAlgorithm() {
		 return this.similarityAlgorithm;
	}
	
	public String getScore() {
		 return this.score;
	}
	public String getScoreError() {
		 return this.scoreError;
	}
	
	public String getPvalue() {
		 return this.pvalue;
	}
	
	
	
}
