$(() => {

    var slideImages = ['slide1.jpeg', 'slide2.jpeg', 'slide3.jpeg', 'slide4.jpeg', 'slide5.jpeg', 'slide6.jpeg', 'slide7.jpeg']

    box = (image) => {
        return `
        <div class="box">
          <div class="image">
            <img src="./assets/${image}" alt="">
          </div>
        </div>
        `
    }

    var width = 180
    var index = 0;
    var click = false;
    var left = 20

    $('#previous').hide()

    for (var i = 0; i < slideImages.length; i++) {
        render(slideImages[i])
    }


    // Clicks
    $('.btn .btn-nav').click(function () {
        let id = $(this).attr('action')
        slide(id)
        click = true
    })

    $('.header').click(function () {
        $(this).siblings('.body').slideToggle(500)
    })

    setInterval(function () {
        if (click) {
            click = false
        } else {
            slide('next')
        }
    }, 2000)


    function render(image) {
        $('.slide').append(box(image))
    }
    function slide(direction) {

        if (direction == 'previous') {
            left = left + width + 10
            index--;
        } else {
            index++;
            left = left - width - 10
        }
        if (left > (i - 5) * 190 || left < (i - 5) * -190) {
            left = 20;
            index = 0;
        }
        if (($('.slide').width() + left) < 1080) {
            left = left + 90
        }

        if (index == 0)
            left = 20;

        $('.slide').css('left', left + 'px')

        if (index != 0)
            $('#previous').show()
        else
            $('#previous').hide()

        if (index == (i - 5))
            $('#next').hide()
        else
            $('#next').show()


    }

})