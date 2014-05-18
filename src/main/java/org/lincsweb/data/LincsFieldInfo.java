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
    
    
    
    public LincsFieldInfo()
    {
    	this.tissueType="The tissue from which the tested cell line was originally derived. More than one tissue can be chosen for a single query.";
        this.cellLine= "The cell line tested in a particular experiment. More than one cell line can be chosen for a single query (multiple selection), subject to any constraint on \"Tissue Type\".";
        this.drug1= "Entries stored as \"drug 1\" in a pair, subject to previous choices of tissue type or cell line, if any. More than one drug can be chosen for a single query (multiple selection)";
        this.drug2="Entries stored as \"drug 2\" in a pair, given current constraints on tissue type, cell line, and drug 1. More than one drug can be chosen for a single query (multiple selection).";
        this.assayType="Viability, proliferation, apoptosis, cell morphology, oxidization state, etc.";
        this.synergyMeasure="Excess over Bliss, Excess over highest single agent, Combination Index, etc.";
        this.similarityAlgorithm="Excess over Bliss, Excess over highest single agent, Combination Index, etc.";
        this.score="score";
        this.scoreError ="Score Error";
        this.pvalue="P-Value";
    }
    
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
