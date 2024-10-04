$(document).ready(function() {
    var $video = $('#background-video');
    // Jag skapar en funktion för att automatiskt spela upp videon
    function autoplayVideo(selector) {
        var $video = $(selector); 
        // Jag försöker spela upp videon automatiskt med ljud
        $video.prop('volume', 1.0); // Sätter maximal ljudvolym
        $video.get(0).play().catch(function(error) {
            console.log("Autoplay av video misslyckades på grund av: ", error);
        });
    }
    // Jag anropar autoplay-funktionen för videon
    autoplayVideo('#background-video');
    // Jag hanterar play/pause när jag klickar någonstans (utom på burger-, close-ikonen eller curtain-menyn)
    $('body').on('click', function(event) {
        // Kontrollerar att klicket inte är på curtain-menyn, burger-ikonen eller close-ikonen
        if (!$(event.target).closest('#curtainMenu, #burgerMenu, #closeMenu').length) {
            if ($video.get(0).paused) {
                $video.get(0).play();
                $('body').removeClass('paused');
            } else {
                $video.get(0).pause();
                $('body').addClass('paused');
            }
        }
    });
    // Hanterar hover-tillståndet med jQuery hover-event
    $('.menu-link').hover(
        function() {
            $(this).css('color', 'white');
        },
        function() {
            $(this).css('color', 'white');
        }
    );
    // Ser till att videon fortsätter efter att curtain-menyn döljs
    $('#curtainMenu').on('transitionend', function() {
        if (!$(this).hasClass('show-menu') && $video.get(0).paused) {
            $video.get(0).play(); // Jag ser till att videon fortsätter när menyn är stängd
        }
    });
    // Jag lägger till en klass när videon pausas
    $video.on('pause', function() {
        $('body').addClass('paused');
    });
    // Hanterar klickhändelsen för burger-ikonen för att visa curtain-menyn
    $('#burgerMenu').on('click', function() {
        $('#curtainMenu').css({ display: 'flex', bottom: '-100%' }).animate({
            bottom: '0'
        }, 500); // Slidar upp curtain-menyn
        $('#burgerMenu').hide(); // Gömmer burger-ikonen
        $('#closeMenu').show().css('opacity', 1); // Visar close-ikonen
    });
    // Jag hanterar klickhändelsen för close-ikonen för att dölja curtain-menyn
    $('#closeMenu').on('click', function() {
        $('#curtainMenu').animate({
            bottom: '-100%'
        }, 500, function() {
            $(this).css('display', 'none'); // Efter att menyn har slidat ner, gömmer jag den
        }); // Slidar ner curtain-menyn
        $('#closeMenu').hide().css('opacity', 0); // Gömmer close-ikonen
        $('#burgerMenu').show(); // Visar burger-ikonen igen
    });
});