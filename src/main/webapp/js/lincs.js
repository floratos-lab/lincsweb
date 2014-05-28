var maxScore = 0;


function queryTypeChange() {

	checkQueryType();
	getLincsInfo();

}

function checkQueryType() {

	var queryType = $('input[name=queryType]:checked').val();

	if (queryType == "Experimental") {

		$('#assayTypeText').show();
		$('#assayTypesTd').show();
		$('#synergyMeasurementText').show();
		$('#synergyMeasurementTypesTd').show();
		$('#synergyMeasurementIcon').show();
		$('#experimentalQuery').show();
		$('#similarityAlgorithmText').hide();
		$('#similarityAlgorithmsTd').hide();		
		$('#computationalQuery').hide();

	} else {

		$('#assayTypeText').hide();
		$('#assayTypesTd').hide();
		$('#synergyMeasurementText').hide();
		$('#synergyMeasurementTypesTd').hide();
		$('#synergyMeasurementIcon').hide();
		$('#experimentalQuery').hide();
		$('#similarityAlgorithmText').show();
		$('#similarityAlgorithmsTd').show();		 
		$('#computationalQuery').show();

	}
	$('#experimentalQuery tbody').html('');
	$('#computationalQuery tbody').html('');

}

jQuery.fn.filterByText = function(textbox, selectSingleMatch) {
	return this.each(function() {
		var select = this;
		var options = [];
		$(select).find('option').each(function() {
			options.push({
				value : $(this).val(),
				text : $(this).text()
			});
		});

		$(select).data('options', options);
		$(textbox).bind(
				'change keyup',
				function() {
					var options = $(select).empty().data('options');
					var search = $.trim($(this).val());
					var regex = new RegExp(search, "gi");

					$.each(options, function(i) {
						var option = options[i];
						if (option.text.match(regex) !== null) {
							$(select).append(
									$('<option>').text(option.text).val(
											option.value));
						}
					});
					if (selectSingleMatch === true
							&& $(select).children().length === 1) {
						$(select).children().get(0).selected = true;
					}
				});
	});
};

function initData() {

	checkQueryType();
	getLincsInfo();
	 
}

function getLincsInfo() {

	var queryType = $('input[name=queryType]:checked').val();
	$('#tissueTypes').html('');
	$('#cellLines').html('');
	$('#drug1List').html('');
	$('#textbox').val('');
	$('#drug2List').html('');
	$('#assayTypes').html('');
	$('#synergyMeasurementTypes').html('');
	$('#similarityAlgorithms').html('');

	$.ajax({

		url : "home/",
		data : {
			queryType : queryType

		},
		dataType : "json",
		contentType : "json",

		success : function(data) {

			var list = data.tissueTypeList;
			_.each(list, function(aData) {

				$('#tissueTypes')
						.append(
								$("<option></option>").attr("value", aData)
										.text(aData));

			});

			list = data.drug1List;
			_.each(list, function(aData) {

				$('#drug1List')
						.append(
								$("<option></option>").attr("value", aData)
										.text(aData));

			});

			if (queryType == "Experimental") {
				list = data.assayTypeList;
				_.each(list, function(aData) {

					$('#assayTypes').append(
							$("<option></option>").attr("value", aData).text(
									aData));

				});

				list = data.synergyMeasuremetnTypeList;
				_.each(list, function(aData) {

					$('#synergyMeasurementTypes').append(
							$("<option></option>").attr("value", aData).text(
									aData));

				});
			} else {
				list = data.similarityAlgorithmList;
				_.each(list, function(aData) {
					$('#similarityAlgorithms').append(
							$("<option></option>").attr("value", aData).text(
									aData));

				});

			}

			$('#drug1List').filterByText($('#textbox'), true);

		},

		error : function(x) {
			alert("error: " + x);
		}
	});
 
}

function tissueTypesChange() {

	var tissueTypes = [];
	$('#tissueTypes :selected').each(function(i, selected) {
		tissueTypes[i] = $(selected).text();
	});

	var queryType = $('input[name=queryType]:checked').val();

	$('#cellLines').html('');
	$('#drug1List').html('');
	$('#textbox').val('');
	$('#drug2List').html('');

	$.ajax({

		url : "list/",
		data : {
			queryType : queryType,
			dataType : "cellLine",
			selectedTissues : JSON.stringify(tissueTypes),
			selectedCellLines : "",
			selectedDrug1s : ""
		},
		dataType : "json",
		contentType : "json",

		success : function(data) {

			_.each(data, function(aData) {
				$('#cellLines')
						.append(
								$("<option></option>").attr("value", aData)
										.text(aData));

			});

		},

		error : function(x) {
			alert("error: " + x);
		}
	});

	$.ajax({

		url : "list/",
		data : {
			queryType : queryType,
			dataType : "drug1",
			selectedTissues : JSON.stringify(tissueTypes),
			selectedCellLines : "",
			selectedDrug1s : ""
		},
		dataType : "json",
		contentType : "json",

		success : function(data) {

			_.each(data, function(aData) {
				$('#drug1List')
						.append(
								$("<option></option>").attr("value", aData)
										.text(aData));

			});

			$('#drug1List').filterByText($('#textbox'), true);

		},

		error : function(x) {
			alert("error: " + x);
		}
	});

}

function cellLineChange() {

	var tissueTypes = [];
	$('#tissueTypes :selected').each(function(i, selected) {
		tissueTypes[i] = $(selected).text();
	});

	var cellLines = [];
	$('#cellLines :selected').each(function(i, selected) {
		cellLines[i] = $(selected).text();
	});

	var queryType = $('input[name=queryType]:checked').val()

	$('#drug1List').html('');
	$('#textbox').val('');
	$('#drug2List').html('');

	$.ajax({

		url : "list/",
		data : {
			queryType : queryType,
			dataType : "drug1",
			selectedTissues : JSON.stringify(tissueTypes),
			selectedCellLines : JSON.stringify(cellLines),
			selectedDrug1s : ""
		},
		dataType : "json",
		contentType : "json",

		success : function(data) {

			_.each(data, function(aData) {
				$('#drug1List')
						.append(
								$("<option></option>").attr("value", aData)
										.text(aData));

			});
			$('#drug1List').filterByText($('#textbox'), true);

		},

		error : function(x) {
			alert("error: " + x);
		}
	});

}

function drug1Change() {

	var tissueTypes = [];
	$('#tissueTypes :selected').each(function(i, selected) {
		tissueTypes[i] = $(selected).text();
	});

	var cellLines = [];
	$('#cellLines :selected').each(function(i, selected) {
		cellLines[i] = $(selected).text();
	});

	var drug1s = [];
	$('#drug1List :selected').each(function(i, selected) {
		drug1s[i] = $(selected).text();
	});

	var queryType = $('input[name=queryType]:checked').val()

	$('#drug2List').html('');
	$.ajax({

		url : "list/",
		data : {
			queryType : queryType,
			dataType : "drug2",
			selectedTissues : JSON.stringify(tissueTypes),
			selectedCellLines : JSON.stringify(cellLines),
			selectedDrug1s : JSON.stringify(drug1s)
		},
		dataType : "json",
		contentType : "json",

		success : function(data) {

			_.each(data, function(aData) {
				$('#drug2List')
						.append(
								$("<option></option>").attr("value", aData)
										.text(aData));

			});

		},

		error : function(x) {
			alert("error: " + x);
		}
	});

}

function getLincsQueryData() {
	var cookieValue = $.cookie("agreeLincsLicense");
	if (cookieValue != 1) {
		getLincsLisenceWindow();
		return false;
	}
	var queryType = $('input[name=queryType]:checked').val();

	var tissueTypes = [];
	$('#tissueTypes :selected').each(function(i, selected) {
		tissueTypes[i] = $(selected).text();
	});

	var cellLines = [];
	$('#cellLines :selected').each(function(i, selected) {
		cellLines[i] = $(selected).text();
	});

	var drug1s = [];
	$('#drug1List :selected').each(function(i, selected) {
		drug1s[i] = $(selected).text();
	});

	var drug2s = [];
	$('#drug2List :selected').each(function(i, selected) {
		drug2s[i] = $(selected).text();
	});

	var assayTypes = [];
	$('#assayTypes :selected').each(function(i, selected) {
		assayTypes[i] = $(selected).text();
	});

	var synergyMeasurementTypes = [];
	$('#synergyMeasurementTypes :selected').each(function(i, selected) {
		synergyMeasurementTypes[i] = $(selected).text();
	});

	var similarityAlgorithms = [];
	$('#similarityAlgorithms :selected').each(function(i, selected) {
		similarityAlgorithms[i] = $(selected).text();
	});

	var rowLimit = 0;
	if ($('#checkboxMaxResult').is(":checked")) {
		rowLimit = $('#textboxMaxResult').val();
	}

	if (queryType != "Experimental") {
		if ((drug1s.length == 0 || drug1s.toString().indexOf("All") != -1)
				&& (drug2s.length == 0 || drug2s.toString().indexOf("All") != -1)) {

			alert("Please select at least one drug constraint, multiple drugs can be selected.");
			return false;
		}
	}

	$.ajax({

		url : "lincs/",
		data : {
			queryType : queryType,
			dataType : "",
			selectedTissues : JSON.stringify(tissueTypes),
			selectedCellLines : JSON.stringify(cellLines),
			selectedDrug1s : JSON.stringify(drug1s),
			selectedDrug2s : JSON.stringify(drug2s),
			measurmentTypes : JSON.stringify(synergyMeasurementTypes),
			assayTypes : JSON.stringify(assayTypes),
			similarityAlgorithms : JSON.stringify(similarityAlgorithms),
			rowLimit : rowLimit
		},
		dataType : "json",
		contentType : "json",

		success : function(data) {
			maxScore = 0;
			var count = 0;
			if (queryType == "Experimental") {
				$('#experimentalQuery tbody').html('');
				_.each(data, function(aData) {
					var line = "";
					line += '<td style="width: 120px"  class="border"><small>'
							+ aData.tissueType + '</small></td>';
					line += '<td style="width: 120px"  class="border"><small>'
							+ aData.cellLineName + '</small></td>';
					line += '<td style="width: 120px"  class="border"><small>'
							+ aData.compound1 + '</small></td>';
					line += '<td style="width: 120px"  class="border"><small>'
							+ aData.compound2 + '</small></td>';
					line += '<td style="width: 120px"  class="border"><small>'
							+ aData.assayType + '</small></td>';
					line += '<td style="width: 120px"  class="border"><small>'
							+ aData.measurementType + '</small></td>';
					line += '<td id="score' + count
							+ '" style="width: 120px"  class="border"><small>'
							+ aData.score + '</small></td>';
					line += '<td style="width: 120px"  class="border"><small>'
							+ aData.scoreError + '</small></td>';
					line = '<tr style="width: 120px"  class="border"><small>'
							+ line + '</small></tr>';
					$('#experimentalQuery tbody').append(line);

					var scoreCellId = "#score" + count;
					$(scoreCellId).val(aData.score);

					var value = Math.abs(aData.score);

					if (value > maxScore)
						maxScore = value;
					count = count + 1;
				});

			} else {
				$('#computationalQuery tbody').html('');
				_.each(data, function(aData) {
					var line = "";
					line += '<td style="width: 120px"  class="border"><small>'
							+ aData.tissueType + '</small></td>';
					line += '<td style="width: 120px"  class="border"><small>'
							+ aData.cellLineName + '</small></td>';
					line += '<td style="width: 120px"  class="border"><small>'
							+ aData.compound1 + '</small></td>';
					line += '<td style="width: 120px"  class="border"><small>'
							+ aData.compound2 + '</small></td>';
					line += '<td style="width: 120px"  class="border"><small>'
							+ aData.similarityAlgorithm + '</small></td>';
					line += '<td id="score' + count
							+ '" style="width: 120px"  class="border"><small>'
							+ aData.score + '</small></td>';
					line += '<td style="width: 120px"  class="border"><small>'
							+ aData.pvalue + '</small></td>';
					line = '<tr style="width: 120px"  class="border"><small>'
							+ line + '</small></tr>';
					$('#computationalQuery tbody').append(line);
					var scoreCellId = "#score" + count;
					$(scoreCellId).val(aData.score);

					var value = Math.abs(aData.score);

					if (value > maxScore)
						maxScore = value;
					count = count + 1;
				});
			}

			checkColor();

		},

		error : function(x) {
			alert("error: " + x);
		}
	});

}

function exportToCsv() {
	var queryType = $('input[name=queryType]:checked').val();
	var csv;

	if (queryType == "Experimental") {

		csv = $('#experimentalQuery').table2CSV(
				{
					separator : '\t',

					delivery : 'value',

					header : [ 'Tissue Type', 'Cell Line', 'Drug1', 'Drug2',
							'Assay Type', 'Synergy Measurement', 'Score',
							'Score Error' ]

				});
	} else {
		csv = $('#computationalQuery').table2CSV(
				{
					separator : '\t',

					delivery : 'value',

					header : [ 'Tissue Type', 'Cell Line', 'Drug1', 'Drug2',
							'Similarity Algorithm', 'Score', 'P-value' ]

				});
	}

	window.open('data:text/plain;charset=UTF-8,' + encodeURIComponent(csv));

}

function getLicenseData() {

	$.ajax({
		url : "license/",
		dataType : "json",
		contentType : "json",

		success : function(data) {

			$('#lincsLicense').html(data);
		},

		error : function(x) {
			alert("error: " + x);
		}
	});

}

function agreeLicense() {

	$.cookie("agreeLincsLicense", 1, {
		expires : 20 * 365
	});
	window.close();
}

function checkColor() {
	var queryType = $('input[name=queryType]:checked').val();
	var rowCount;
	if (queryType == "Experimental")
		rowCount = $('#experimentalQuery >tbody >tr').length;
	else
		rowCount = $('#computationalQuery >tbody >tr').length;
	if ($('#checkboxColorgradient').is(":checked")) {
		for ( var i = 0; i < rowCount; i++) {
			var scoreCellId = "#score" + i;
			var score = $(scoreCellId).val();
			var color = getColor(score);
			$(scoreCellId).css({
				"background-color" : color
			});

		}
	} else {
		for ( var i = 0; i < rowCount; i++) {
			var scoreCellId = "#score" + i;
			if (i % 2 == 1)
			{$(scoreCellId).css({
				//"background-color" : '#f4f4f4'  #F3F4E8
				"background-color" : '#F3F4E8'
			});}
			else
			{$(scoreCellId).css({
				//"background-color" : '#f4f4f4'  #F3F4E8
				"background-color" : '#fff'
			});}

		}
	}

}

function getColor(score) {

	var colorindex = Math.floor(score * 255 / maxScore);
	if (colorindex > 0)
		return "rgb(" + colorindex + ", 0, 0)";
	else {
		colorindex = Math.abs(colorindex);
		return "rgb(0, " + colorindex + ", 0)";
	}

}


function getLincsLisenceWindow() {
	 
		var w = 380;
		var h = 330;
		var left = Number((screen.width / 2) - (w / 2));
		var tops = Number((screen.height / 2) - (h / 2));
		var childWindow = window.open('lincs_license.html', 'mywindow',
				'scrollbars=yes,  resizable=yes, width=' + w + ', height=' + h + ', top=' + tops
						+ ', left=' + left);
		
 
}

function getTermWindow() {
	 
	var w = 400;
	var h = 328;
	var left = Number((screen.width / 2) - (w / 2));
	var tops = Number((screen.height / 2) - (h / 2));
	var childWindow = window.open('term.html', 'mywindow',
			'scrollbars=yes, resizable=yes, width=' + w + ', height=' + h + ', top=' + tops
					+ ', left=' + left);
	return false;

}



$( document ).ready(function() {
	$.ajax({
		url : "field/",
		dataType : "json",
		contentType : "json",

		success : function(data) {
			 
			$('#tissueTypeIcon').attr('title', data.tissueType);
			$('#cellLineIcon').attr('title', data.cellLine);
			$('#drug1Icon').attr('title', data.drug1);
			$('#drug2Icon').attr('title', data.drug2);
			$('#assayTypeIcon').attr('title', data.assayType);
			$('#synergyMeasurementIcon').attr('title', data.synergyMeasure);
			$('#similarityAlgorithmIcon').attr('title', data.similarityAlgorithm);
			
			$('#erTissueType').attr('title', data.tissueType);
			$('#erCellLine').attr('title', data.cellLine);
			$('#erDrug1').attr('title', data.drug1);
			$('#erDrug2').attr('title', data.drug2);
			$('#erAssayType').attr('title', data.assayType);
			$('#erSynergyMeasurement').attr('title', data.synergyMeasure);
			$('#erScore').attr('title', data.score);
			$('#erScoreError').attr('title', data.scoreError);
			
			$('#crTissueType').attr('title', data.tissueType);
			$('#crCellLine').attr('title', data.cellLine);
			$('#crDrug1').attr('title', data.drug1);
			$('#crDrug2').attr('title', data.drug2);		 
			$('#crSimilarityAlgorithm').attr('title', data.similarityAlgorithm);
			$('#crScore').attr('title', data.score);
			$('#crPvalue').attr('title', data.pvalue);
		},

		error : function(x) {
			alert("error: " + x);
		}
	});




});


