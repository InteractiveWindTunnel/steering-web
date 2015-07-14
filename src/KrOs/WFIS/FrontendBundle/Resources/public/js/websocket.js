function newFilledArray(len, val)
{
    var a = [];
    while (len--) {
        a.push(val);
    }
    return a;
}

var ws = null;
var fanArrayLength;
var fan = new Array(9);
fan[0] = [];
fan[1] = [];
fan[2] = [];
fan[3] = [];
fan[4] = [];
fan[5] = [];
fan[6] = [];
fan[7] = [];
fan[8] = [];
var ain=new Array(4);
ain[0]=newFilledArray(50,0);
ain[1]=newFilledArray(50,0);
ain[2]=newFilledArray(50,0);
ain[3]=newFilledArray(50,0);
var res=new Array(4);
res[0]=new Array(50);
res[1]=new Array(50);
res[2]=new Array(50);
res[3]=new Array(50);
var plot1,plot2,plot3,plot4;
$(function () {
    var grabbing=false;
    var max_points=50;
    var plot_options={yaxis:{min:1.8  ,max:2.5,show:true},  xaxis:{show:true,min:0,max:max_points}};
    var plot_opor_options=   {yaxis:{min:-0.5,max:10,show:true},  xaxis:{show:true,min:0,max:max_points}};
    var plot_nosna=  {yaxis:{min:-1.5,max:1.5,show:true},  xaxis:{show:true,min:0,max:max_points}};
    var plot_cisnienie= {yaxis:{min:0.5,max:4.5,show:true}, xaxis:{show:true,min:0,max:max_points}};
    if ($("#plot1").length !=0) {
        plot1 = $.plot($("#plot1"),[],plot_opor_options); }
    if ($("#plot2").length !=0) {
        plot2 = $.plot($("#plot2"),[],plot_nosna); }
    if ($("#plot3").length !=0) {
        plot3 = $.plot($("#plot3"),[],plot_options); }
    if ($("#plot4").length !=0) {
        plot4 = $.plot($("#plot4"),[],plot_cisnienie); }
    ws = new WebSocket("ws://ita.wfis.uni.lodz.pl:5563/echo");
    ws.onmessage = function (evt) {

        var message = $.parseJSON(evt.data);
        if (message.states.device == true) {
            changePowerButtonState(1,false);
        } else {
            changePowerButtonState(0,false);
        }
        if (message.states.fans==true) {
            changeFanButtonState(1,false);
        } else {
            changeFanButtonState(0,false);
        }
        ain[0].push(message.ain['ain0']);
        ain[1].push(message.ain['ain1']);
        ain[2].push(message.ain['ain7']);
        ain[3].push(message.ain['ain2']);
        var currentDate=new Date();
        if (grabbing) {
            $("#data-debug").text($("#data-debug").text()+"\t"+message.ain['ain0'].toString().replace('.',',')+"\t"+message.ain['ain1'].toString().replace('.',',')+"\t"+message.ain['ain2'].toString().replace('.',',')+"\n"); }
        if (ain[0].length>=50) {
            ain[0] = ain[0].splice(1); }
        if (ain[1].length>=50) {
            ain[1] = ain[1].splice(1); }
        if (ain[2].length>=50) {
            ain[2] = ain[2].splice(1); }
        if (ain[3].length>=50) {
            ain[3] = ain[3].splice(1); }
        for (var i=0; i<max_points; i++) {
            res[0][i]=[i,ain[0][i]];
            res[1][i]=[i,(ain[1][i]*-1)+5];
            res[2][i]=[i,ain[2][i]];
            res[3][i]=[i,ain[3][i]];
        }
    //console.log(res[0]);
        if ($("#plot1").length !=0) {
            plot1.setData([res[0]]);
            plot1.draw();
        }
        if ($("#plot2").length !=0) {
            plot2.setData([res[1]]);
            plot2.draw();
        }
        if ($("#plot3").length !=0) {
            plot3.setData([res[2]]);
            plot3.draw();
        }
        if ($("#plot4").length !=0) {
            plot4.setData([res[3]]);
            plot4.draw();
        }
    
    
        if (message.wind !== null) {
            $.each(message.wind,function (key, value) {
                if (key!='length') {
                    if (fan[key].length === 20) {
                        fan[key].splice(0,1);
                    }
                    fan[key].push(value);
                    $('#fanSparkline'+key).sparkline(fan[key],{chartRangeMin:0,chartRangeMax:2100});
                }
      
            });}
    }
    ws.onopen = function (evt) {
        $('#conn_status').html('<b>Connected</b>');

    }
    ws.onerror = function (evt) {
        $('#conn_status').html('<b>Error</b>');
    }
    ws.onclose = function (evt) {
        $('#conn_status').html('<b>Closed</b>');
    }

    $("#grab-start-button").on('click',function () {
        grabbing=true;
        $(this).attr('disabled',true);
        $("#grab-stop-button").attr('disabled',false);
    });

    
    $("#grab-stop-button").on('click',function () {
        grabbing=false;
        $(this).attr('disabled',true);
        $("#grab-start-button").attr('disabled',false);
    });

    $("#select-third-experiment").on('click', function () {
        selectExperiment(3);
    });
});

function powerOn()
{
    var jsonMessage = '{"command":"power", "params":{"state":1}}';
    ws.send(jsonMessage);
    return true;
}

function powerOff()
{
    var jsonMessage = '{"command":"power", "params":{"state":0}}';
    ws.send(jsonMessage);
    return true;
}

function fansStart()
{
    var jsonMessage = '{"command":"fans_power", "params":{"state":1}}';
    ws.send(jsonMessage);
    fansSpeed(480);
    return true;

}

function fansStop()
{
    var jsonMessage = '{"command":"fans_power", "params":{"state":0}}';
    ws.send(jsonMessage);
    return true;
}

function fansSpeed(speed)
{
    var jsonMessage = '{"command":"fans_speed","params":{"pwm":'+speed+'}}';
    ws.send(jsonMessage);
    return true;
}

function servoAngle(value)
{
    var jsonMessage = '{"command":"servo","params":{"angle":'+value+'}}';
    ws.send(jsonMessage);
    return true;
}

function selectExperiment(expCode)
{
    var command = {
        command: 'selectExperiment',
        parameter: 3
    };
    ws.send(JSON.stringify(command));
    return true;
}

