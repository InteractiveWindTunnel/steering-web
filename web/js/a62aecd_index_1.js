$(function(){
	$('#powerSwtich').bind('click',function(){
	    var button = $(this);
	    var fanButton = $('#fanSwtich');
	    if ($(this).attr('value')==0){ 
	        changePowerButtonState(1,true);
	    }else{
	        changePowerButtonState(0,true);
	    }
	    return false;
	});
	$('#fanSwtich').bind('click',function(){
	  console.log('click');
	    var fanButton = $(this);
	    if(fanButton.attr('value')==1){
		changeFanButtonState(0,true);
	    }else{
		changeFanButtonState(1,true);
	    }
	});	
});

function changeFanButtonState(newState, sendMessage){
	var fanButton = $('#fanSwtich');
	if (newState==0)
	{
	  $('#fansState').empty();
	  $('#fansState').append('Wyłączone');
	    fanButton.text('Włącz wiatraki');
	    fanButton.addClass('btn-primary');
	    fanButton.removeClass('btn-danger');
	    fanButton.attr('value',0);
	    if(sendMessage){
		fansStop();
	    }
	}else{
	  $('#fansState').empty();
	  $('#fansState').append('Włączone');
	    fanButton.text('Wyłącz wiatraki');
	    fanButton.addClass('btn-danger');
	    fanButton.removeClass('btn-primary');
	    fanButton.attr('value',1);
	    if(sendMessage){
		fansStart();
	    }
	}
}

function changePowerButtonState(newState, sendMessage){
	var powerButton = $('#powerSwtich');
	if (newState==0)
	{
	    if (sendMessage){
		powerOff();
		changeFanButtonState(0, sendMessage);
	    }
	    $('#deviceState').empty();
	    $('#deviceState').append('Wyłączony');
	    powerButton.removeClass('btn-danger');
	    powerButton.addClass('btn-primary');
	    powerButton.attr('value',0);
	    powerButton.text('Włącz układ');
	    $('#fanSwtich').fadeOut();
	}else{
	    if(sendMessage){
		powerOn();
		setTimeout(changeFanButtonState(1, sendMessage),1000);
	    }
	    $('#deviceState').empty();
	    $('#deviceState').append('Włączony');
	    powerButton.removeClass('btn-primary');
	    powerButton.addClass('btn-danger');
	    powerButton.attr('value',1);
	    powerButton.text('Wyłącz układ');
	    $('#fanSwtich').fadeIn();
	}
}

//------------------- FLOT

$(function () {
    // we use an inline data source in the example, usually data would
    // be fetched from a server
    var data = [], totalPoints = 300;
    
  //------------------- TMP
    function getRandomData() {
        if (data.length > 0)
            data = data.slice(1);

        // do a random walk
        while (data.length < totalPoints) {
            var prev = data.length > 0 ? data[data.length - 1] : 50;
            var y = prev + Math.random() * 10 - 5;
            if (y < 0)
                y = 0;
            if (y > 100)
                y = 100;
            data.push(y);
        }

        // zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i)
            res.push([i, data[i]])
        return res;
    }
    // END TMP
    // setup control widget
    var updateInterval = 30;
    $("#updateInterval").val(updateInterval).change(function () {
        var v = $(this).val();
        if (v && !isNaN(+v)) {
            updateInterval = +v;
            if (updateInterval < 1)
                updateInterval = 1;
            if (updateInterval > 2000)
                updateInterval = 2000;
            $(this).val("" + updateInterval);
        }
    });

    // setup plot
    var options = {
        series: { shadowSize: 0 }, // drawing is faster without shadows
        yaxis: { min: 0, max: 100 },
        xaxis: { show: false }
    };
    var plot = $.plot($("#plot1"), [ getRandomData() ], options);
    var plot2 = $.plot($("#plot2"), [ getRandomData() ], options);
    var plot3 = $.plot($("#plot3"), [ getRandomData() ], options);

    function update() {
        plot.setData([ getRandomData() ]);
        plot2.setData([ getRandomData() ]);
        plot3.setData([ getRandomData() ]);
        // since the axes don't change, we don't need to call plot.setupGrid()
        plot.draw();
        plot2.draw();
        plot3.draw();
        
        setTimeout(update, updateInterval);
    }

    update();
});