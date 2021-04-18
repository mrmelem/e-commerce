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
if (window.scrollY > 20) {
    $('nav').show()
} else {
    $('nav').hide()
}
$(window).scroll(function () {
    if ($('.focus').is(':hidden') == false) {
        $('.focus').css('display', 'none')
    }
    if (this.scrollY > 20) {
        $('nav').fadeIn(500)
    } else {
        $('nav').fadeOut(500)
    }
})

$('nav p').click(function () {
    if ($('nav .checkout').is(':hidden') == false) {
        // Catalogo -> Pagamento
        $('nav .checkout').css('display', 'none')
        $('nav .products').css('display', 'block')
        $('.main').hide()
        $('.finish').show()
    } else {
        // Pagamento -> Catalogo
        $('nav .checkout').css('display', 'block')
        $('nav .products').css('display', 'none')
        $('.main').show()
        $('.finish').hide()
    }
})
