$(function() {
    let times;

    $.ajax({
        beforSend: function(xhr) {
            if(xhr.overrideMimeType)
                xhr.overrideMimeType("appclication/json");
        }
    });

    function loadTimeTable() {
        $.getJSON('../data/agenda.json')
        .done(function(data) {
            times = data;
        }).fail(function() {
            $('#agenda').html('<p>Przepraszamy, nie udało wczytać się harmonogramu.</p>');
        });
    }
    loadTimeTable();

    $('#buttons').on('click', 'button', function(e) {
        e.preventDefault();
        let eventNum = this.id;
        let newContent = '';
        newContent += '<ul>';

        for(let i= 0; i < times[eventNum].length; i++) {
            let url = `../data/desc.html#${eventNum}-${times[eventNum][i].title}`;
            url = url.toLowerCase().replaceAll(' ', '-');

            newContent += `<li><a href="${url}">${times[eventNum][i].title} - <span>${times[eventNum][i].time}</span><i class="icon-right-hand"></i></a></li>`;
        }
        newContent += '</ul>';

        $('#agenda').html(newContent).hide().fadeIn(300);
        $('#desc').empty();
    });

    $('#agenda').on('click', 'a', function(e) {
        e.preventDefault();

        $('#agenda a').removeClass('active');
        $(this).addClass('active');
        let loadDesc = this.href.replace('#', ' #');

        $('#desc').load(loadDesc).hide().fadeIn('slow');
    })

});