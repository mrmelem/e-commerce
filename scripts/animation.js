$(document).on('click', '.box', function () {
    let image = $(this).children('.image').children('img').attr('src')
    let title = $(this).children('.description').children('.title').html()
    let price = $(this).children('.description').children('.price').html()

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
    if ($('.focus').is(':hidden') == false){
        $('.focus').css('display', 'none')
    }
})
