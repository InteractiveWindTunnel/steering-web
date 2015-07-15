"use strict";
(function () {
    var speed = 50;
    var pic, numImgs, arrLeft, i, totalWidth, n;
    $(document).ready(function () {
        pic = $(".sponsors").children("a").children("img");
        numImgs = pic.length;
        arrLeft = new Array(numImgs);
        for (i = 0; i < numImgs; i++) {
            totalWidth = 0;
            for (n = 0; n < i; n++) {
                totalWidth += $(pic[n]).width()+20;
            }

            arrLeft[i] = totalWidth;
            $(pic[i]).css("left",totalWidth);
        }
        setInterval(flexiScroll, speed);
        $("#imageloader").hide();
        $(pic).show();
    });

    function flexiScroll() {
        for (i = 0; i < numImgs; i++) {
            arrLeft[i] -= 1;
            if (arrLeft[i] === -($(pic[i]).width())) {
                totalWidth = 20;
                for (n = 0; n < numImgs; n++) {
                    if (n != i) {
                        totalWidth += $(pic[n]).width() + 20;
                    }
                }
                arrLeft[i] = totalWidth;
            }
            $(pic[i]).css("left", arrLeft[i]);
        }
    }
}());
