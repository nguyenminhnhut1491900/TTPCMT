function ParseJson(jsondata) {
    try {
        return JSON.parse(jsondata);
    } catch (error) {
        return null;
    }
}

var socket =  io.connect('/webapp');

var sensor = [0, 0];
var device = [0, 0, 0, 0];

socket.on('sensor', function(jsondata){
	var data = ParseJson(jsondata);
	sensor = data.sensor;
	updateSensorState();
});

socket.on('devStt', function(jsondata){
	var data = ParseJson(jsondata);
	device = data.device;
	updateDeviceState();
});

function updateSensorState(){
	$('#temperature').html(sensor[0]);
	$('#humidity').html(sensor[1]);
}

function updateDeviceState(){
	$('#buttonLed1').prop('checked', device[0]);
	$('#buttonLed2').prop('checked', device[1]);
	$('#switch1').prop('checked', device[2]);
	$('#switch2').prop('checked', device[3]);
}

$(document).ready(function(){

	socket.emit('devStt');

	updateDeviceState();
	updateSensorState();	

	$('#buttonLed1').change(function(){
			if ($('#buttonLed1').is(":checked")) device[0] = 1;
			else device[0] = 0; 
			var json = {
				"device" : device
			};
            socket.emit('device',  json);
    });

    $('#buttonLed2').change(function(){
			if ($('#buttonLed2').is(":checked")) device[1] = 1;
			else device[1] = 0; 
			var json = {
				"device" : device
			};
            socket.emit('device',  json);
    });


    $('#switch1').change(function(){
			if ($('#switch1').is(":checked")) device[2] = 1;
			else device[2] = 0; 
			var json = {
				"device" : device
			};
            socket.emit('device',  json);
    });

    $('#switch2').change(function(){
			if ($('#switch2').is(":checked")) device[3] = 1;
			else device[3] = 0; 
			var json = {
				"device" : device
			};
            socket.emit('device',  json);
    });

});


