var matches, card = ''; var campos = []; var h, i, x, dados = []; var info;

async function getBox() {
    await $.get('components/box.html', data => {
        regexp = RegExp('{{!(.*?)}}*', 'g')
        matches = data.matchAll(regexp)
        card = data
        for (match of matches) {
            h++
            campos[match[1]] = match[0]
        }
    })

    await $.get('seeds/catalogo.txt', data => {
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
        render = render.replace(campos.Valor, formatarMoeda(dados[cont]['Valor']))
        render = render.replace(campos.Imagem, dados[cont]['Imagem'])
        render = render.replace(campos.Codigo, dados[cont]['Codigo'])
        render = render.replace(campos.Tamanho, dados[cont]['Tamanhos'])
        $('.catalogo .body .container').append(render)


    }
}

function formatarMoeda(val){
    return val.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

getBox()




