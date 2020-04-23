// declare map in global scope
var bpsMap;

//instantiate map 
function createMap(){
	 bpsMap = L.map('map',{
		center: [42.350,-71.065],
		zoom: 14,
		minZoom:4,
		maxZoom: 21,
		zoomControl:false
	});

	//call getdata function
	getData(bpsMap);
	bpsMap.addControl( L.control.zoom({position: 'bottomright'}) )
};


//function to retrieve map data and place it on the map
function getData(map){
	//baselayer
	var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		minZoom: 0,
		maxZoom: 21,
		ext: 'png'
}).addTo(bpsMap);



//part that gets the school data
 $.ajax("data/schools.geojson",{
	dataType: "json",
	 success: function(response){
		 var schools = response.features;

		//function for popup
		function buildPopupContent(schools,feature){
			name = feature.feature.properties.SCH_NAME;
			address = feature.feature.properties.ADDRESS;
			type = feature.feature.properties.SCH_TYPE;
			content = "<strong>Name: </strong>" + name + "<br>" + "<strong>Address: </strong>" + address + "<br>" + "<strong>School type: </strong>" + type;
			feature.bindPopup(content);
		}

		//add geojson layer to map w/ unique symbology
		var schoolLayer = L.geoJSON(schools, {
			onEachFeature: buildPopupContent
		}).addTo(map);



// THREE IMPORTANT CLOSING BRACKETS AT THE END OF GETDATA() FUNCTION!
//bracket that closes out the async response. Don't erase!
}

//bracket that closes out the async call function. Don't erase!
});


//bracket that closes out the getData() function. Don't erase!
};


$(document).ready(createMap);
