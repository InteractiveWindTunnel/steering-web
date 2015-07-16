$(function () {
    $('#powerSwtich').bind('click', function () {
        console.log('WAŻNE RZECZY 2 RAZY!');
        var button = $(this);
        var fanButton = $('#fanSwtich');
        if ($(this).attr('value') == 0) {
            changePowerButtonState(1, true);
        } else {
            changePowerButtonState(0, true);
        }
        return false;
    });
    $('#fanSwtich').bind('click',function () {
        console.log('click');
        var fanButton = $(this);
        if (fanButton.attr('value')==1) {
            changeFanButtonState(0,true);
        } else {
            changeFanButtonState(1,true);
        }
    });
    
    
    
});

function changeFanButtonState(newState, sendMessage)
{
    var fanButton = $('#fanSwtich');
    if (newState==0) {
    $('#fansState').empty();
        $('#fansState').append('Wyłączone');
        fanButton.text('Włącz wiatraki');
        fanButton.addClass('btn-primary');
        fanButton.removeClass('btn-danger');
        fanButton.attr('value',0);
        if (sendMessage) {
            fansStop();
        }
    } else {
        $('#fansState').empty();
        $('#fansState').append('Włączone');
        fanButton.text('Wyłącz wiatraki');
        fanButton.addClass('btn-danger');
        fanButton.removeClass('btn-primary');
        fanButton.attr('value',1);
        if (sendMessage) {
            fansStart();
        }
    }
}

function changePowerButtonState(newState, sendMessage)
{
    var powerButton = $('#powerSwtich');
    if (newState==0) {
        if (sendMessage) {
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
    } else {
        if (sendMessage) {
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


