
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
<meta charset="utf-8">
<title>Lincs Query License</title>

<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/lincs.css" rel="stylesheet">


<script>
   
      window.onload = function() {    
       
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


   
   </script>


</head>

<body>

    <br>
	<div align="center" style="width:380px;height:235px;overflow:auto;"><p id="lincsLicense"></P></div>
    <br>
	</form>


	<table align="center">

		<tr>

			<td valign="bottom"><input type="button" value="agree"
				onclick="agreeLicense();" />&nbsp;&nbsp;&nbsp;</td>
			<td valign="bottom"><input type="button" value="cancel"
				onclick="window.close();" />&nbsp;&nbsp;</td> 

		</tr>

	</table>


	</form>

     <br>

	<script src="js/jquery.min.js"></script>
	<script src="js/lincs.js"></script>

	<script src="js/jquery.cookies.js"></script>


</body>






</html>
