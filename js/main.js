 $(document).ready(function() {

     var daysInMonth = moment().daysInMonth();
     var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
     var todayEvent;

     var data = {
         "preferences": {
             "backgroundColor": 15001060,
             "fontColor": 1448480,
             "mainBallColor": 7283498,
             "ballsColor": 7283498,
             "arrowColor": 14041644,
             "highlightedColor": 7283498,
             "fontName": "Myriad Pro",
             "fontUrl": "client/MyriadPro-Regular.otf"
         },
         "items": [{
             "title": "Family day",
             "description": "Today we congratulate Clara Jonsdottir with her birthday.",
             "fullDescription": "Today we have all kinds of festivities during our family day at the offices in Breda. Bring your family and lets us enjoy this day. Please join us at the BBQ in the parc behind building Q3 at 12.00 hours. For the kids we have airbuildings to play in and there will also be lots of other activities for kids of all ages! Today we celebrate our 10th anniversary.",
             "date": "2017-03-01",
             "srcPath": "photo"
         }, {
             "title": "Family day",
             "description": "Today we congratulate Clara Jonsdottir with her birthday.",
             "date": "2017-03-02",
             "srcPath": "photo"
         }, {
             "title": "Family day",
             "description": "Today we congratulate Clara Jonsdottir with her birthday.",
             "fullDescription": "Today we have all kinds of festivities during our family day at the offices in Breda. Bring your family and lets us enjoy this day. Please join us at the BBQ in the parc behind building Q3 at 12.00 hours. For the kids we have airbuildings to play in and there will also be lots of other activities for kids of all ages! Today we celebrate our 10th anniversary.",
             "date": "2017-03-03",
             "srcPath": "client/116.png"
         }, {
             "title": "Family day",
             "description": "Today we congratulate Clara Jonsdottir with her birthday.",
             "date": "2017-03-04",
             "fullDescription": "Today we have all kinds of festivities during our family day at the offices in Breda. Bring your family and lets us enjoy this day. Please join us at the BBQ in the parc behind building Q3 at 12.00 hours. For the kids we have airbuildings to play in and there will also be lots of other activities for kids of all ages! Today we celebrate our 10th anniversary.",
             "srcPath": "client/187.png"
         }, {
             "title": "Family day",
             "description": "Today we congratulate Clara Jonsdottir with her birthday.",
             "date": "2017-03-05",
             "srcPath": "photo"
         }, {
             "title": "Family day",
             "description": "Today we congratulate Clara Jonsdottir with her birthday.",
             "date": "2017-03-06",
             "srcPath": "photo"
         }, {
             "title": "Family day",
             "description": "Today we congratulate Clara Jonsdottir with her birthday.",
             "date": "2017-03-07",
             "srcPath": "photo"
         }, {
             "title": "Family day",
             "description": "Today we congratulate Clara Jonsdottir with her birthday.",
             "date": "2017-03-08",
             "srcPath": "photo"
         }]
     }


     function pxToEm(value, parent) {
         return value / parent + 'em';
     }

     function decToHex(dec) {
         res = dec.toString(16);
         while (res.length < 6)
             res = '0' + res;
         return '#' + res;
     }

     function convertHex(hex, opacity) {
         hex = hex.replace('#', '');
         r = parseInt(hex.substring(0, 2), 16);
         g = parseInt(hex.substring(2, 4), 16);
         b = parseInt(hex.substring(4, 6), 16);

         result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
         return result;
     }

     function defineMonday(todayDate) {
         return todayDate.day(1).date();
     }

     function correctWeekDay(day) {
         if (day == 0) day = 7;
         return day;
     }

     function addAnimationIn($element, animationName, delay, animationDuration) {
         if (animationDuration === undefined) {
             animationDuration = 1;
         }
         setTimeout(function() {
             $element.css({
                 'visibility': 'visible',
                 'animation-name': animationName,
                 'animation-duration': animationDuration + 's'
             })
         }, delay)
     }

     function addAnimationOut($element, animationName, delay, animationDuration) {
         if (animationDuration === undefined) {
             animationDuration = 1;
         }
         setTimeout(function() {
             $element.css({
                 'animation-name': animationName,
                 'animation-duration': animationDuration + 's'
             })
         }, delay);
         setTimeout(function() {
             $element.css({
                 "visibility": "hidden"
             });
         }, delay + animationDuration * 1000)
     }

     function setDimensions() {
         $('.total-container').css('font-size', ($('.total-container').height() / 2 + $('.total-container').width()) / 4 + 'px');
         //slide 1
         $('.month .circle').css('width', $('.month  .circle').css('height'));
         $('.month .circle').css('font-size', parseInt($('.month .circle').css('width')) * 0.75);
         $('.month .frame').css('width', $('.month').css('width'));
         $('.month .frame').css('height', $('.month').css('height'));
         //slide 2
         $('.week .circle').css('width', $('.week .circle').css('height'));
         $('.week .circle').css('font-size', parseInt($('.week .circle').css('width')) * 0.8);
         $('.week .frame').css('width', $('.week').css('width'));
         $('.week .frame').css('height', $('.week').css('height'));
     }


     function organizeMonthDays(displayedDays, monthDays, parent, bubble, startAngle, startDate) {
         var dist = 360 / monthDays,
             angle = startAngle,
             left, top, shift;
         startDate = startDate + displayedDays - 1;
         shift = pxToEm(parseInt(parent.css('width')) / 2 - parseInt(bubble.css('width')) / 2,
             parseInt(parent.css('font-size')));
         for (var i = displayedDays; i >= 1; i--) {
             var elem = $('<div class="bubble bubble-' + i + '"><p></p></div>');
             parent.append(elem);
             angle += dist;
             if (!(angle == 0)) {
                 top = Math.cos(Math.PI / (180 / angle));
                 left = Math.sin(Math.PI / (180 / angle));
             }
             parent.children(".bubble-" + i)
                 .css({
                     'top': top + 'em',
                     'left': left + 'em',
                     'transform': 'translate(' + shift + ',' + shift + ')'
                 }).attr("day", startDate)
                 .children("p").text(startDate);
             left = 0;
             top = 1;
             startDate--;
         }
     }

     function organizeEvents() {
         var current = {};
         for (var i = 1; i <= 7; i++) {
             current = data.items.filter(function(obj) {
                 return obj.date == moment().day(i).format("YYYY-MM-DD");
             });
             if (current.length != 0) {
                 $('.day-' + i + ' .text h3').text(current[0].title);
                 $('.day-' + i + ' .text p').text(current[0].description);
                 $('.day-' + i + ' .date').text(moment().day(i).date());
             }
         }
         todayEvent = data.items.filter(function(obj) {
             return obj.date == moment().format("YYYY-MM-DD");
         });
         todayEvent = todayEvent[0]||data.items[0];
     };











     function animateDays(parent, monthDays, delay) {
         setTimeout(function() {
             for (var i = 1; i <= monthDays; i++) {
                 var elem = parent.children(".bubble-" + i);
                 addAnimationIn(elem, 'fadeIn', 100 * i, 0.5);
             }
         }, delay);
     }

     function animateMonthArrow(elem, date, monthDays, delay) {
         var angle = (360 / monthDays) * (date - 1);
         setTimeout(function() {
             elem.animate({
                 'transform': 'rotate(' + angle + 'deg)'
             }, angle * 10);
         }, delay)
     }

     function animateWeekArrow(elem, day, delay) {
         if (day == 0) day = 7;
         day += 7;
         var angle = 12 * day;

         setTimeout(function() {
             elem.animate({
                 'transform': 'rotate(' + angle + 'deg)'
             }, angle * 10);
         }, delay)
     }












     function setContent() {
         $('.month .circle p').text(months[moment().month()]);
         organizeMonthDays(daysInMonth, daysInMonth, $('.month .circle'), $('.month .bubble'), 180, 1);
         organizeMonthDays(7, 30, $('.week .circle'), $('.week .bubble'), 0, defineMonday(moment()));
         organizeEvents(moment());
         $('.day-slide .wrap .photo').css({
             "background-image": "url(" + todayEvent.srcPath + ")"
         });
         $('.day-slide .wrap .text h3').text(todayEvent.title);
         $('.day-slide .wrap .date').text(moment().date());
         $('.day-slide .wrap .month-name').text(months[moment().month()]);
         if (todayEvent.fullDescription != undefined) {
             var descs = todayEvent.fullDescription.split(". ");
             for (var i = 0; i < descs.length; i++) {
                 $('.day-slide .wrap .text').append('<p>' + descs[i] + '.</p>')
             }

         }
     }


     function setAppearance() {
         $("head").prepend("<style type='text/css'>\n@font-face {\nfont-family: '" + data.preferences.fontName + "'; \nsrc: url('" + data.preferences.fontUrl + "');\n}\n</style>");
         $(".total-container").css({ "font-family": data.preferences.fontName })
         $('body').css({
             "background-color": decToHex(data.preferences.backgroundColor),
             "color": decToHex(data.preferences.fontColor)
         });
         $('.month .arrow').css({
             'fill': decToHex(data.preferences.arrowColor)
         });
         $('.month .arrow-circle').css({
             'stroke': decToHex(data.preferences.arrowColor)
         });

         $('.week .arrow').css({
             'fill': decToHex(data.preferences.arrowColor)
         });
         $('.week .arrow-circle').css({
             'stroke': decToHex(data.preferences.arrowColor)
         });
         $('.month .bubble').css({
             "border-color": decToHex(data.preferences.ballsColor)
         });
         $('.month .circle').css({
             "border-color": decToHex(data.preferences.mainBallColor)
         });
         $('.week-slide .week .circle').css({
             "background-color": decToHex(data.preferences.highlightedColor)
         });
         $('.week-slide .week .circle').css({
             "background-color": decToHex(data.preferences.highlightedColor)
         });
         $('.week .circle .bubble').css({
             "background-color": convertHex(decToHex(data.preferences.highlightedColor), 0.3)
         });
         $('.week .circle .bubble[day=' + moment().date() + ']').css({
             "background-color": decToHex(data.preferences.highlightedColor)
         });
         $('.week-slide .week-days-desc .day').css({
             "background-color": convertHex(decToHex(data.preferences.highlightedColor), 0.3)
         });
         $('.week-slide .week-days-desc .day-' + correctWeekDay(moment().day())).css({
             "background-color": decToHex(data.preferences.highlightedColor)
         });
         $('.day-slide .wrap').css({
             "background-color": decToHex(data.preferences.highlightedColor)
         });
     }


     function animate() {
         //slide1
         addAnimationIn($('.month'), 'fadeIn', 500);
         animateDays($('.month .circle'), daysInMonth, 1000);
         animateMonthArrow($('.month .frame'), moment().date(), daysInMonth, 2000);
         addAnimationOut($('.month'), 'fadeOut', 8000);
         addAnimationOut($('.month .circle .bubble'), 'fadeOut', 8000);

         //slide2
         addAnimationIn($('.week-slide .week'), 'zoomIn', 8000);
         addAnimationIn($('.week-slide .week-days-desc .day'), 'zoomIn', 8000);
         animateDays($('.week .circle'), 7, 8000);
         animateWeekArrow($('.week .frame'), moment().day(), 8500);
         addAnimationOut($('.week-slide .week'), 'fadeOut', 15000);
         addAnimationOut($('.week-slide .week-days-desc'), 'fadeOut', 15000);
         addAnimationOut($('.week-slide .week-days-desc .day'), 'fadeOut', 15000);
         addAnimationOut($('.week .circle .bubble'), 'fadeOut', 15000);
         addAnimationOut($('.week .circle .bubble'), 'fadeOut', 15000);

         //slide3

         addAnimationIn($('.day-slide .wrap'), 'zoomIn', 15000);
         addAnimationIn($('.day-slide .wrap .text h3'), 'fadeIn', 15500);
         addAnimationIn($('.day-slide .wrap .text p'), 'fadeIn', 15500);

     }








     setDimensions();
     setContent();
     setAppearance();
     animate();
     $(window).resize(function() {
         setDimensions();
     });


 });
