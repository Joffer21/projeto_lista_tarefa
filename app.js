class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor){
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados(){
		for(let i in this){
			if(this[i] == undefined || this[i] == '' || this[i] == null){
				return false
			}
		}
		return true
	}
}

class Bd {
	constructor(){
		let id = localStorage.getItem('id')

		if(id === null){
			localStorage.setItem('id', 0)
		}
	}

	getProximoId(){
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

	recuperarTodosRegistros() {

		//array de despesas
		let despesas = Array()

		let id = localStorage.getItem('id')

		//recuperar dados as despesas cadastradas em localStorage
		for(let i = 1; i <= id; i++){

			//recuperar a despesa
			let despesa = JSON.parse(localStorage.getItem(i))

			//existe a possibilidade de haver indices que foram pulados/removidos
			//neste caso vamos pular estes indices
			if(despesa === null) {
				continue
			}

			despesa.id = i
			despesas.push(despesa)
		}

		return despesas
	}

	pesquisar(despesa) {

		let despesasFiltradas = Array()

		despesasFiltradas = this.recuperarTodosRegistros()

		console.log(despesa)

		console.log(despesasFiltradas)

		//ano
		if(despesa != '') {
			console.log('filtro de ano')
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
		}
		//mes
		if(despesa != '') {
			console.log('filtro de mes')
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}
		//dia
		if(despesa != '') {
			console.log('filtro de dia')
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}
		//tipo
		if(despesa != '') {
			console.log('filtro de tipo')
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}
		//descricao
		if(despesa != '') {
			console.log('filtro de descricao')
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.desccricao)
		}
		//valor
		if(despesa != '') {
			console.log('filtro de valor')
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}

		return despesasFiltradas
	}

	remover(id) {
		localStorage.removeItem(id)
	}

}

let bd = new Bd()

function cadastrarDespesa() {

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')
	
	let despesa = new Despesa(
		ano.value, 
		mes.value, 
		dia.value, 
		tipo.value, 
		descricao.value, 
		valor.value
	)

	if(despesa.validarDados()){
		//bd.gravar(despesa)

		document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso'
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'

		//console.log('Dados v??lidos')
		$('#modalRegistraDespesa').modal('show')

		ano.value = '' 
		mes.value = '' 
		dia.value = '' 
		tipo.value = '' 
		descricao.value = '' 
		valor.value = ''

	} else{
		// dialog de Erro
		
		document.getElementById('modal_titulo').innerHTML = 'Erro na inclus??o do registro'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Erro na grava????o, verifique se todos os campos foram preenchidos corretamente'
		document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
		document.getElementById('modal_btn').className = 'btn btn-danger'

		$('#modalRegistraDespesa').modal('show')
	}
}

function carregaListaDespesas() {
	let despesas = Array()


	despesas = bd.recuperarTodosRegistros()

	//selecionando o elemento tbody da tabela
	let listaDespesas = document.getElementById('listaDespesas')
	listaDespesas.innerHTML = ''

	/*
	<tr>
		0 = <td>15/03/2018</td>
	    1 = <td>Alimenta????o</td>
	    <td>Compras do mes</td>
	    <td>50.00</td>
	</tr>*/

	despesas.forEach(function(d) {

		//console.log(d)

		//criando a linha (tr)
		let linha = listaDespesas.insertRow()

		//criar as colunas (td)
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
		switch(d.tipo){
			case '1': d.tipo = 'Alimenta????o'
			break
			case '2': d.tipo = 'Educa????o'
				break
			case '3': d.tipo = 'Lazer'
				break
			case '4': d.tipo = 'Sa??de'
				break
			case '5': d.tipo = 'Transporte'
				break
		}
		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor

		//criar o bot??o exclus??o
		let btn = document.createElement("button")
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fas fa-times"></i>'
		btn.id = `id_despesa_${d.id}`
		btn.onclick = function(){   //btn para remover a despesa
			let id = this.id.replace('id_despesa_', '')

			//alert(id)
			 
			bd.remover(id)

			window.location.reload()
		}
		linha.insertCell(4).append(btn)

		console.log(d)
	})
}

function pesquisarDespesa() {
	let ano = document.getElementById('ano').valeu
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value
	
	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

	let despesas = bd.pesquisar(despesa)

	//selecionando o elemento tbody da tabela
	let listaDespesas = document.getElementById('listaDespesas')

	/*
	<tr>
		0 = <td>15/03/2018</td>
	    1 = <td>Alimenta????o</td>
	    <td>Compras do mes</td>
	    <td>50.00</td>
	</tr>*/

	despesas.forEach(function(d) {

		//console.log(d)

		//criando a linha (tr)
		let linha = listaDespesas.insertRow()

		//criar as colunas (td)
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
		switch(d.tipo){
			case '1': d.tipo = 'Alimenta????o'
			break
			case '2': d.tipo = 'Educa????o'
				break
			case '3': d.tipo = 'Lazer'
				break
			case '4': d.tipo = 'Sa??de'
				break
			case '5': d.tipo = 'Transporte'
				break
		}
		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor
	})

}


