$(document).ready(function(){
		
//  DECLERATIONS OF API path
url_path ="http://127.0.0.1:5000/myapp/api/v1/";
	
var test1 = decodeURIComponent(window.location.search);
		
var arr = test1.split('&'); 

var state_name=arr[0].substring(6);
	
var flag = "PUMA";	
	
console.log(state_name);	

var input_no =arr[1].substring(6);
	
console.log(input_no);	

if (arr[2] == null)
{
	
	flag = 'ZIP';
$("#title").html('<i class="fa fa-line-chart" style="font-size:24px;color:#054B8E" id="heading_icon"></i>'+' Historical Trend and Future Projection Scores for ZIP: '+input_no+', '+state_name);		

}

else 
{
	
}	
var puma_name;

if (arr[2] != null )
{
	
	if (arr[3] != null )
	{
	
	var puma_name=arr[2].substring(6); 
	var str = arr[3].substring(1);

	
	puma_name = puma_name + "& " + str;
	
	
	puma_name = puma_name.substring(0,100);
	$("#title").html('<i class="fa fa-bar-chart" style="font-size:24px;color:#054B8E" id="heading_icon"></i>'+' Historical Trend and Future Projection Scores for '+puma_name+', '+state_name);			
	
	}
	else 
	{
	var puma_name=arr[2].substring(6); 	
	$("#title").html('<i class="fa fa-bar-chart" style="font-size:24px;color:#054B8E" id="heading_icon"></i>'+' Historical Trend and Future Projection Scores for '+puma_name+', '+state_name);	
	}
	
	
}
else
{
	
}


if (flag == 'ZIP')
  {
  
  $('#puma').html('<i class="far fa-building" style="font-size:20px;color:black;"></i> ZIP Report');
	  
}
else 
{
  $('#puma').html('<i class="far fa-building" style="font-size:20px;color:black;"></i> PUMA Report');	
	
}

 




var len1 = 11;
var dimension_name1 = $("#myselect").val();
$("#square1,#square2,#square4,#square5,#square6,#square7,#square8,#square9,#square10,#square11,#square3").show();
div_display(len1,dimension_name1,state_name,input_no,flag);

$("#home").click(function(){


    window.location.href="index.html";

});

$("#state").click(function(){


    window.location.href="state.html?data="+state_name;

});



$("#scenario").click(function(){
	
	console.log('test');	
	
  if  (flag =="PUMA")
	 {
		
	 console.log('test');	 
	 window.location.href="scenario_input.html?data="+state_name+"&"+"data1="+input_no+"&"+"data2="+puma_name;

	 }
	 else
	 {
	 window.location.href="scenario_input.html?data="+state_name+"&"+"data1="+input_no;	

	 }
});	

$(".custom-select").click(function()
{
	
var dimension_name = $("#myselect").val();
console.log(dimension_name);
if (dimension_name == 'Economy')
{

var len = 11;
$("#square1,#square2,#square4,#square5,#square6,#square7,#square8,#square9,#square10,#square11,#square3").show();
div_display(len,dimension_name,state_name,input_no,flag);

}
else if (dimension_name == 'Education')
{
var len = 9;
$("#square1,#square2,#square4,#square5,#square6,#square7,#square8,#square9,#square3").show();
$("#square10,#square11").hide();	

div_display(len,dimension_name,state_name,input_no,flag);
}
else if (dimension_name == 'Community')
{
var len = 4;
$("#square1,#square2,#square4,#square3").show();
$("#square5,#square6,#square7,#square8,#square9,#square10,#square11").hide();	
	
var arr1 =[];

for ( let i=1; i<=len;i++)
{
var p = '#square'+i;

var q = 'square'+i;

 arr1.push(p);

}
console.log(arr1);
$("#square1").css('width','325px').css('height', '300px');
$("#square2").css('width','325px').css('height', '300px');
$("#square3").css('width','325px').css('height', '300px');
$("#square4").css('width','325px').css('height', '300px');


am4core.disposeAllCharts();
const url = url_path+"historical_output/"+dimension_name;

 
 
$.get(url, function(data, status){


     data1 = JSON.parse(data);

createchart(square1,data1[0].Indicators,state_name,input_no,dimension_name,flag);
createchart(square2,data1[1].Indicators,state_name,input_no,dimension_name,flag);
createchart(square3,data1[2].Indicators,state_name,input_no,dimension_name,flag);
createchart(square4,data1[3].Indicators,state_name,input_no,dimension_name,flag);	
});
}
else if (dimension_name == 'Health')
{
var len = 5;
$("#square1,#square2,#square4,#square5,#square3").show();
$("#square6,#square7,#square8,#square9,#square10,#square11").hide();	
		
var arr1 =[];

for ( let i=1; i<=len;i++)
{
var p = '#square'+i;

var q = 'square'+i;

 arr1.push(p);

}

$("#square1").css('width','325px').css('height', '300px');
$("#square2").css('width','325px').css('height', '300px');
$("#square3").css('width','325px').css('height', '300px');
$("#square4").css('width','325px').css('height', '300px');
$("#square5").css('width','325px').css('height', '300px');


am4core.disposeAllCharts();

const url = url_path+"historical_output/"+dimension_name;

 
 
$.get(url, function(data, status){
 

     data1 = JSON.parse(data);

createchart(square1,data1[0].Indicators,state_name,input_no,dimension_name,flag);
createchart(square2,data1[1].Indicators,state_name,input_no,dimension_name,flag);
createchart(square3,data1[2].Indicators,state_name,input_no,dimension_name,flag);
createchart(square4,data1[3].Indicators,state_name,input_no,dimension_name,flag);
createchart(square5,data1[4].Indicators,state_name,input_no,dimension_name,flag);
		
});
}
else
{

}



});



});




function createchart(div_name, indicator,state,temp,dimension,flag)
{
	
am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);

// for display data
var div = div_name;
var state_name = state;
var substate = temp;	
var indicator1;		
	
var chart = am4core.create(div, am4charts.XYChart);

const url = url_path+"historical_output/"+state+"/"+temp+"/"+dimension+"/"+indicator+"/"+flag;	
	
$.get(url, function(data, status){	
/* Add data */
	data2 = JSON.parse(data);
chart.data = data2;
console.log(data);
/* Create axes */
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "year";
categoryAxis.fontWeight = "bold";
categoryAxis.fontFamily = "Raleway";
categoryAxis.fontSize = "15px";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 15;


/* Create value axis */
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.fontWeight = "bold";
valueAxis.fontFamily = "Raleway";
valueAxis.fontSize = "15px";
	
if (dimension =='Economy')
{
chart.colors.list = [
  am4core.color("#D83E43")];
}	
else if (dimension =='Education')
{
  chart.colors.list = [
  am4core.color("#001C3E")]; 	
}	
else if (dimension =='Community')
{
  chart.colors.list = [
  am4core.color("#027DAD")];
}	
else 
{
  chart.colors.list = [
  am4core.color("#3BE3D0")]; 	
}		

/* Create series */
var series1 = chart.series.push(new am4charts.LineSeries());
series1.dataFields.valueY = "Value";
series1.dataFields.categoryX = "year";
series1.name = "Value";
series1.strokeWidth = 1;
series1.tensionX = 0.7;
series1.focusable = true;
series1.hoverOnFocus = true;
series1.bullets.push(new am4charts.CircleBullet());  /*to show the point */


	
series1.tooltip.getFillFromObject = false;	
series1.tooltip.background.fill = am4core.color("#ffffff");
series1.tooltip.autoTextColor = false;
series1.tooltip.label.fill  = am4core.color("#000000");
series1.tooltip.fontWeight = "bold";	
series1.tooltip.fontFamily = "Open Sans";
series1.tooltip.fontSize = "16px";
series1.tooltipText = "[bold]{categoryX} Value[/]: {Value}";

function removeSeries() {
  if (chart.series.length > 1) {
    chart.series.removeIndex(0).dispose();
  }
}

/* Create a cursor */
chart.cursor = new am4charts.XYCursor();

if (indicator == 'EMPLOYMENT') {indicator1 ='Employment';}
else if (indicator == 'WAGES') {indicator1 ='Wages';}      
else if (indicator == 'INCOME INEQUALITY') {indicator1 ='Income Inequality';}
else if (indicator == 'POVERTY AMONG YOUTH') {indicator1 ='Poverty Among Youth';}
else if (indicator == 'POVERTY AMONG WORKFORCE') {indicator1 ='Poverty Among Workforce';}
else if (indicator == 'POVERTY AMONG SENIOR CITIZENS') {indicator1 ='Poverty Among Senior Citizens';}
else if (indicator == 'HOUSING EXPENSE') {indicator1 ='Housing Expense';}
else if (indicator == 'LOCAL GDP') {indicator1 ='Local GDP';}
else if (indicator == 'INCOME TO POVERTY') {indicator1 ='Income to Poverty';}
else if (indicator == 'BROADBAND INTERNET SUBSCRIPTION') {indicator1 ='Broadband Internet Subscription';}
else if (indicator == 'FISCAL EQUITY') {indicator1 ='Fiscal Equity';}
else if (indicator == 'POST SECONDARY COMPLETION') {indicator1 ='Postsecondary Completion';}
else if (indicator == 'STEM READINESS') {indicator1 ='STEM Readiness';}
else if (indicator == 'STUDENT DETACHMENT') {indicator1 ='Student Detachment';}
else if (indicator == 'HIGH SCHOOL CREDENTIAL') {indicator1 ='High School Credential';}
else if (indicator == 'TEACHER ABSENTEEISM') {indicator1 ='Teacher Absenteeism';}
else if (indicator == 'STUDENT ABSENTEEISM') {indicator1 ='Student Absenteeism';}
else if (indicator == 'POST SECONDARY ENROLLMENT') {indicator1 ='Postsecondary Enrollment';}
else if (indicator == 'HIGH SCHOOL ENROLLMENT') {indicator1 ='High School Enrollment';}
else if (indicator == 'PRESCHOOL ENROLLMENT') {indicator1 ='Preschool Enrollment';}
else if (indicator == 'HIGH SCHOOL DISCONNECTION') {indicator1 ='High School Disconnection';}
else if (indicator == 'POST SECONDARY DISCONNECTION') {indicator1 ='Postsecondary Disconnection';}
else if (indicator == 'WORKFORCE DISCONNECTION') {indicator1 ='Workforce Disconnection';}
else if (indicator == 'SCHOOL SAFETY') {indicator1 ='School Safety';}
else if (indicator == 'HEALTH INSURANCE COVERAGE') {indicator1 ='Health Insurance Coverage';}
else if (indicator == 'LOW BIRTH WEIGHT') {indicator1 ='Low Birth Weight';}
else if (indicator == 'MEDICALLY UNDERSERVED AREAS') {indicator1 ='Medically Underserved Areas';}
else if (indicator == 'ACCESS TO PRIMARY HEALTHCARE') {indicator1 ='Access To Primary Healthcare';}
else if (indicator == 'DEATHS RELATED TO DASH') {indicator1 ='Deaths Related to DASH';}
else {}
var title = chart.titles.create();
title.text =indicator1;
title.fontSize = 18;
title.fontWeight = 700;
title.fontFamily =  "Open Sans"; 
title.marginBottom = 15;

}); // end am4core.ready()   
});
}

/* for animation */

function div_display(count,name,state_name,substate,flag)
{
am4core.disposeAllCharts();
var len = count;
	
var dimension = name;
	
var state = state_name;	
	
var temp = substate;	
	
var arr1 =[];

var arr2 = [];

for ( let i=1; i<=len;i++)
{
var p = '#square'+i;

var q = 'square'+i;

 arr1.push(p);
 arr2.push(q);
}

$("#square1").css('width','325px').css('height', '300px');
$("#square2").css('width','325px').css('height', '300px');
$("#square3").css('width','325px').css('height', '300px');
$("#square4").css('width','325px').css('height', '300px');
$("#square5").css('width','325px').css('height', '300px');
console.log(arr2);
console.log(arr1);



const url = url_path+"historical_output/"+dimension;

 
 
$.get(url, function(data, status){
      //alert(status);

     data1 = JSON.parse(data);
	
for ( let i=0; i<len;i++)

{


createchart(arr2[i],data1[i].Indicators,state,temp,dimension,flag);
	

}

});


}     	
	
