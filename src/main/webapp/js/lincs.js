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
		$('#experimentalQuery').show();
		$('#similarityAlgorithmText').hide();
		$('#similarityAlgorithmsTd').hide();
		$('#computationalQuery').hide();

	} else {

		$('#assayTypeText').hide();
		$('#assayTypesTd').hide();
		$('#synergyMeasurementText').hide();
		$('#synergyMeasurementTypesTd').hide();
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
	
	if (queryType != "Experimental" )
	{	 
		if ((drug1s.length == 0 || drug1s.toString().indexOf("All") != -1) && (drug2s.length == 0 || drug2s.toString().indexOf("All") != -1)) {
	         
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
					line += '<td style="width: 120px"  class="border"><small>'
							+ aData.score + '</small></td>';
					line += '<td style="width: 120px"  class="border"><small>'
							+ aData.scoreError + '</small></td>';
					line = '<tr style="width: 120px"  class="border"><small>'
							+ line + '</small></tr>';
					$('#experimentalQuery tbody').append(line);
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
					line += '<td style="width: 120px"  class="border"><small>'
							+ aData.score + '</small></td>';
					line += '<td style="width: 120px"  class="border"><small>'
							+ aData.pvalue + '</small></td>';				 
					line = '<tr style="width: 120px"  class="border"><small>'
							+ line + '</small></tr>';
					$('#computationalQuery tbody').append(line);
				});
			}

		},

		error : function(x) {
			alert("error: " + x);
		}
	});   

}
