var objeto = []
var valorTotal = 0;
var cart = []

var camposCart, camposCartLS = []
$(document).on('click', '.add-to-cart', function () {
    let cod = $(this).siblings('.cod').attr('value').split('x')
    objeto = [
        cod[0],
        $(this).parent().siblings('.image').children('img').attr('src'),
        $(this).siblings('.title').html(),
        parseFloat(cod[1])
    ]

    let save = new Promise((resolve, reject) => {
        if (localStorage.getItem('shop-cart') !== null) {
            cart = JSON.parse(localStorage.getItem('shop-cart'))
            localStorage.removeItem('shop-cart')
        }
        if (localStorage.getItem('indexShopCart') === null) {
            localStorage.setItem('indexShopCart', 1)
        }
        objeto[4] = localStorage.getItem('indexShopCart')
        localStorage.setItem('indexShopCart', parseInt(objeto[4]) + 1)
        cart.push(objeto)
        localStorage.setItem('shop-cart', JSON.stringify(cart))

        if (JSON.parse(localStorage.getItem('shop-cart')).length == cart.length)
            resolve('sucesso')
        else
            reject('Erro')

    })
    save
        .then((message) => {
            alerta(true, 'O produto foi adicionado ao carrinho!')
        })
        .catch((err) => {
            alerta(false, 'Aconteceu um erro ao tentar adicionar o produto')
        })

    render()
})

$(document).ready(function () {
    if (localStorage.getItem('shop-cart') != null) {
        render()

    }
})

$(document).on('click', '.fa-times', async function () {
    var ref = ($(this).attr('ref'))
    var data = JSON.parse(localStorage.getItem('shop-cart'))
    var h = 0;
    for (cont of data) {
        if (cont[4] === ref) {
            await data.splice(h, 1)
        }
        h++
    }
    localStorage.setItem('shop-cart', JSON.stringify(data))
    render()
})


function render() {
    $.get('components/cart-item.html', dataLS => {
        $('.cart .items').html('')
        var dadosLS = JSON.parse(localStorage.getItem('shop-cart'))
        let regexpLS = RegExp('{{!(.*?)}}*', 'g')
        let matchesLS = dataLS.matchAll(regexpLS)
        for (matchLS of matchesLS) {
            h++
            camposCartLS[matchLS[1]] = matchLS[0]
        }


        for (cont of dadosLS) {
            renderLS = dataLS
            renderLS = renderLS.replace(camposCartLS.titulo, cont[2])
            renderLS = renderLS.replace(camposCartLS.preco, formatarMoeda(cont[3]))
            renderLS = renderLS.replace(camposCartLS.imagem, cont[1])
            renderLS = renderLS.replace(camposCartLS.ref, cont[4])
            $('.cart .items').append(renderLS)
        }

    })
}
function alerta(status, msg) {
    $('.alert-box').html('')
    if (status) {
        $('.alert-box').append(`<div class="alert sucess"><p>${msg}</p></div>`)
    } else {
        $('.alert-box').append(`<div class="alert erro"><p>${msg}</p></div>`)
    }
    $('.alert-box').show()
    setTimeout(function () { $('.alert-box').fadeOut(2000) }, 2000)
}