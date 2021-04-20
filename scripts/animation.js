$(document).on('click', '.box .image', function () {
    let image = $(this).children('img').attr('src')

    var box = `
        <div class="image">
            <img src="${image}" alt="">
        </div>
    `
    $('.box-focus').html(box)
    $('.focus').css('display', 'flex')
})

$('.overlay').click(function () {
    $('.focus').css('display', 'none')
})

$(window).scroll(function () {
    if ($('.focus').is(':hidden') == false) {
        $('.focus').css('display', 'none')
    }
})

$('nav p').click(function () {
    var body = $("html, body");
    body.stop().animate({ scrollTop: 0 })
    if ($('nav .checkout').is(':hidden') == false) {
        $('nav .checkout').css('display', 'none')
        $('nav .products').css('display', 'block')
        $('.main').hide()
        $('.finish').show()
    } else {
        $('nav .checkout').css('display', 'block')
        $('nav .products').css('display', 'none')
        $('.main').show()
        $('.finish').hide()
    }
})
