var objeto = []; var cart = []; var valorTotal = 0; var camposCart, camposCartLS = [];

$(document).on('click', '.add-to-cart', function () {
    let cod = $(this).siblings('.cod').attr('value').split('x')
    let sizes = $(this).siblings('.size').attr('value').split('/')
    objeto = [
        cod[0],
        $(this).parent().siblings('.image').children('img').attr('src'),
        $(this).siblings('.title').html(),
        parseFloat(cod[1]),
        1,
        1,
        sizes,
        ''
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

$(document).on('change', '.quantity', function () {
    var value = $(this).val()
    var ref = $(this).parent().parent().siblings('i').attr('ref')
    var data = JSON.parse(localStorage.getItem('shop-cart'))
    for (cont of data) {
        if (cont[4] === ref) {
            cont[5] = value
        }
    }
    localStorage.setItem('shop-cart', JSON.stringify(data))
    render()
})

$(document).on('change', '.sizes', function () {
    var value = $(this).val()
    var ref = $(this).parent().parent().siblings('i').attr('ref')
    var data = JSON.parse(localStorage.getItem('shop-cart'))
    for (cont of data) {
        if (cont[4] === ref) {
            cont[7] = value
        }
    }
    localStorage.setItem('shop-cart', JSON.stringify(data))
    render()
})

$(document).on('click', '.btn button', function () {
    let phone = '+5591985686508'
    let orders = JSON.parse(localStorage.getItem('shop-cart'))
    let pedido = ''

    // 0 - Cod
    // 1 - Img
    // 2 - Titulo
    // 3 - Preço
    // 4 - Index
    // 5 - Quantidade
    // 6 - Tamanhos Disponíves
    // 7 - Tamanho escolhido

    for (order of orders) {
        pedido = pedido + `
${order[5]} *${order[2]}*, tamanho: ${order[7]}, valor unitário: ${formatarMoeda(order[3])}, código: ${order[0]}`
    }
    let msg = encodeURIComponent(`Jéssica D'luxe 👗

Olá, ${$('#nome').val()}, ${$('#cpf').val()}.
    
Seu pedido é:
${pedido}
    
O valor total é de: ${formatarMoeda(valorTotal)}`)
    window.location.replace(`https://api.whatsapp.com/send?phone=${phone}&text=${msg}`)
})

function render() {
    valorTotal = 0
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
            valorTotal = valorTotal + (cont[3] * cont[5])
            var options = ""
            for (let x = 1; x < 6; x++) {
                if (x == cont[5]) {
                    options = options + `<option value="${x}" selected>${x}</option>`
                } else if (x == 1) {
                    options = options + `<option value="${x}" selected>${x}</option>`
                } else {
                    options = options + `<option value="${x}">${x}</option>`
                }
            }
            var sizeArr = ""
            for (sizeItem of cont[6]) {
                if (sizeItem == cont[7]) {
                    sizeArr = sizeArr + `<option value="${sizeItem}" selected>${sizeItem}</option>`
                } else {
                    sizeArr = sizeArr + `<option value="${sizeItem}">${sizeItem}</option>`
                }
            }

            renderLS = dataLS
            renderLS = renderLS.replace(camposCartLS.titulo, cont[2])
            renderLS = renderLS.replace(camposCartLS.preco, formatarMoeda(cont[3]))
            renderLS = renderLS.replace(camposCartLS.imagem, cont[1])
            renderLS = renderLS.replace(camposCartLS.ref, cont[4])
            renderLS = renderLS.replace(camposCartLS.size, sizeArr)
            renderLS = renderLS.replace(camposCartLS.options, options)
            $('.cart .items').append(renderLS)
        }
        $('.valorTotal p').html(formatarMoeda(valorTotal))

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
    $('.alert-box').fadeOut(2000)
}