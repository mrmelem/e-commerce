$(() => {

    var matches = '';
    var campos = []
    var h, i, x, dados = []
    var card = ''
    var info;
    var cardInfo;

    // Clicks
    $('.btn .btn-nav').click(function () {
        let id = $(this).attr('action')
        slide(id)
        click = true
    })

    $('.header').click(function () {
        $(this).siblings('.body').slideToggle(500)
    })

    async function getBox() {
        await $.get('/components/box.html', data => {
            regexp = RegExp('{{!(.*?)}}*', 'g')
            matches = data.matchAll(regexp)
            card = data
            for (match of matches) {
                h++
                campos[match[1]] = match[0]
            }
        })

        await $.get('/seeds/catalogo.txt', data => {
            var lista = data.split('\n')
            for (i = 0; i < lista.length; i++) {
                if (lista[i] == '' || lista[i] == ' ') continue

                var fields = lista[i].split(', ')

                dados[i] = []
                for (x = 0; x < fields.length; x++) {
                    info = fields[x].split(': ')
                    dados[i][info[0]] = info[1]
                }
            }
        })

        for (let cont = 0; cont < dados.length; cont++) {
            var render = card;

            render = render.replace(campos.Produto, dados[cont]['Produto'])
            render = render.replace(campos.Valor, dados[cont]['Valor'])
            render = render.replace(campos.Imagem, dados[cont]['Imagem'])

            $('.catalogo .body .container').append(render)


        }

    }

    getBox()


    /*
    for (x = 0; x < 10; x++) {
        dados[x] = []
        for (y = 0; y < 10; y++){
            dados[x][y] = "Ok"
        }
    }

*/









})