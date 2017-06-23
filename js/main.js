var releaseDate = new Date('07/01/2017 01:00 AM');
var stories = [1, 2, 3, 4, 5, 6, 7, 8];

var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var timer;

$(function() {
    var isRelease = (location.search == '?release');

    if (isRelease) {
        $('body').addClass('release-mode');

        $('.countdown').remove();
    } else {
        $('body').addClass('timer-mode');
    }

    var hideExtraButtons = function () {
        if (!navigator.userAgent.toLowerCase().match(/(ipod|iphone|ipad)/)) {
            $('.ios-download').hide();
        }

        if (!navigator.userAgent.toLowerCase().match(/(android)/)) {
            $('.android-download').hide();
        }
    };

    var loadStory = function (number) {
        $.get('./text/' + number + '-story.txt', function(data) {
            data = data.replace(/\n/g, "<br>");

            $('.bg-wrapper, .container').css('background-image', 'url(./img/bg/' + number + '-bg.jpg)');
            $('#story').html(data);
        }, 'text');
    };

    var getRandomFromArray = function () {
        return stories[Math.floor(Math.random() * stories.length)];
    };

    var saveEmail = function (email, callback) {
        // $.post('api/', {
        //     action: 'save_email',
        //     email: email
        // }, 'json').done(function() {
            setTimeout(function(data) {
                callback();
            }, 500);
        // });
    };

    var bindElements = function() {
        $(document).on('click', '.submit', function(e) {
            e.preventDefault();

            var email = $('#email').val();
            var elem = $(this);

            if (elem.hasClass('active') || !email || !$('#email').is(':valid')) {
                elem.siblings('input').addClass('shake');
                elem.addClass('shake');

                setTimeout(function () {
                    elem.siblings('input').removeClass('shake');
                    elem.removeClass('shake');
                }, 800);

                return false;
            }

            elem.addClass('active').text('Загрузка');

            saveEmail(email, function () {
                elem.parent('.email').hide();
                elem.parent('.email').siblings('.email-finish').fadeIn();
            });
        });

        $(document).on('click', '.submit-mobile', function(e) {
            e.preventDefault();

            var email = $('#email').val();
            var elem = $(this);

            if (elem.hasClass('active') || !email || !$('#email').is(':valid')) {
                elem.siblings('input').addClass('shake');

                setTimeout(function () {
                    elem.siblings('input').removeClass('shake');
                }, 800);

                return false;
            }

            var text = elem.find('span');
            text.addClass('active').text('Загрузка');
            elem.siblings('input').prop('disabled', true);

            saveEmail(email, function () {
                setTimeout(function () {
                    elem.hide();
                    elem.parent('.email').siblings('.email-finish').fadeIn();
                }, 2000);
            });
        });
    };

    var showRemaining = function () {
        var now = new Date();
        var distance = releaseDate - now;
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('countdown').innerHTML = 'EXPIRED!';

            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        var countdownString = days + ':' + hours + ':' + minutes + ':' + seconds;

        $('.countdown').text(countdownString);
    };

    var startCountDown = function() {
        timer = setInterval(showRemaining, 1000);
    };

    var storyNum = getRandomFromArray();

    bindElements();
    hideExtraButtons();
    loadStory(storyNum);
    startCountDown();
});