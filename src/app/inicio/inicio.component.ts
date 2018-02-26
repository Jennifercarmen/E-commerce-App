import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
	selector: 'app-inicio',
	templateUrl: './inicio.component.html',
	styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
	my_categorias: any;
	my_subcategorias: any;
	comparacion: String;
	ngOnInit() {
	}
	constructor() {
		this.Successfunction();
		this.Searchfunction();
		this.categoria();

	}

	// Busqueda por categoria especifica
	Successfunction() {
		$("#product").empty();
		const proxy = 'https://cors-anywhere.herokuapp.com/';

		const urlcategorias = `https://api.mercadolibre.com/sites/MPE/categories`;
		const childrenCategorias = `https://api.mercadolibre.com/sites/MPE/search?category=MPE1071&limit=12`;

		const getdata = (data) => {
			let results = data.results;
			//console.log(results);
			results.forEach((value, index) => {
				const ruta = `https://api.mercadolibre.com/items/${value.id}`;

				const imgFunction = (info) => {
					let picture = info.pictures[0].url;
					//console.log(info);
					let html = `<div class="col s12 m3"> 
							<div class="card" data-id="${value.id}">
							  <div class="card-image waves-effect waves-block waves-light">
								<img class="activator" src="${picture}">
							  </div>
							<div class="card-content">
							  <span class="activator grey-text text-darken-4">${value.title}<i class="material-icons right">more_vert</i></span>
							  <p><a href="#">${'$' + value.price}</a></p>
							</div>
							<div class="card-reveal">
							  <span class="card-title grey-text text-darken-4">${value.title}<i class="material-icons right">close</i></span>
								  <p>${"Stock: " + info.available_quantity}</p>
								  <div class="center">
								  <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
									<input type="hidden" name="cmd" value="_s-xclick">
									<input type="hidden" name="hosted_button_id" value="5X7NHBPF2H9SC">
									<input type="image" src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal, la forma rápida y segura de pagar en Internet.">
									<img alt="" border="0" src="https://www.paypalobjects.com/es_XC/i/scr/pixel.gif" width="1" height="1">
								  </form>
								</div>
							</div>
						  </div>`
					$('#product').append(html);
				}
				$.ajax({
					url: ruta,
					success: imgFunction
				});


			});
		}
		$.ajax({
			url: proxy + childrenCategorias,
			success: getdata
		});
	}



	//Buscar por nombre 
	Searchfunction() {
		$("#product").empty();

		const proxy = 'https://cors-anywhere.herokuapp.com/';
		const urlSearch = `https://api.mercadolibre.com/sites/MPE/search?q=`;
		let word = $("input#autocomplete-input.word").val();

		console.log(word);

		const getdata = (data) => {

			console.log(data.results);
			let results = data.results;
			results.forEach((value, index) => {
				const ruta = `https://api.mercadolibre.com/items/${value.id}`;

				const imgFunction = (info) => {
					let picture = info.pictures[0].url;
					let html = `<div class="col s12 m3"> 
							<div class="card z-depth-5" data-id="${value.id}">
							  <div class="card-image waves-effect waves-block waves-light">
								<img class="activator" src="${picture}">
							  </div>
							<div class="card-content">
							  <span class="activator grey-text text-darken-4">${value.title}<i class="material-icons right">more_vert</i></span>
							  <p><a href="#">${'$' + value.price}</a></p>
							</div>
							<div class="card-reveal">
							  <span class="card-title grey-text text-darken-4 center-align">${value.title}<i class="material-icons right">close</i></span>
								  <p><b>Stock: </b>${info.available_quantity}</p>
								  <div class="center">
									<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
									  <input type="hidden" name="cmd" value="_s-xclick">
									  <input type="hidden" name="hosted_button_id" value="5X7NHBPF2H9SC">
									  <input type="image" src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal, la forma rápida y segura de pagar en Internet.">
									  <img alt="" border="0" src="https://www.paypalobjects.com/es_XC/i/scr/pixel.gif" width="1" height="1">
									</form>
								  </div>
	
							</div>
						  </div>`;
					$('#product').prepend(html);
				}
				$.ajax({
					url: ruta,
					success: imgFunction
				});

			});

		}

		$.ajax({
			url: proxy + urlSearch + word,
			success: getdata
		});
	}

	guardar() {
		alert("hola");
	}
	categoria() {
		const proxy = 'https://cors-anywhere.herokuapp.com/';
		const urlcategorias = `https://api.mercadolibre.com/sites/MPE/categories`;
		const getdata = (data) => {
			this.my_categorias = data;
		}
		$.ajax({
			url: proxy + urlcategorias,
			success: getdata
		});

	}
	obtSubcategorias(n) {

		const proxy = 'https://cors-anywhere.herokuapp.com/';
		const urlsubcategorias = `https://api.mercadolibre.com/categories/${n.id}`;
		const getdata = (result) => {

			this.comparacion = result.id;

			this.my_subcategorias = result.children_categories;
			let subcat = result.children_categories;

		}
		$.ajax({
			url: proxy + urlsubcategorias,
			success: getdata
		});

	}
	ver(n) {
		alert('Categoria ' + n.name);
		$("#product").empty();

		const proxy = 'https://cors-anywhere.herokuapp.com/';
		const urlSearch = `https://api.mercadolibre.com/sites/MPE/search?q=`;


		const getdata = (data) => {

			console.log(data.results);
			let results = data.results;
			results.forEach((value, index) => {
				const ruta = `https://api.mercadolibre.com/items/${value.id}`;

				const imgFunction = (info) => {
					let picture = info.pictures[0].url;
					let html = `<div class="col s12 m3"> 
								<div class="card z-depth-5" data-id="${value.id}">
									<div class="card-image waves-effect waves-block waves-light">
									<img class="activator" src="${picture}">
									</div>
								<div class="card-content">
									<span class="activator grey-text text-darken-4">${value.title}<i class="material-icons right">more_vert</i></span>
									<p><a href="#">${'$' + value.price}</a></p>
								</div>
								<div class="card-reveal">
									<span class="card-title grey-text text-darken-4 center-align">${value.title}<i class="material-icons right">close</i></span>
										<p><b>Stock: </b>${info.available_quantity}</p>
										<div class="center">
										<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
											<input type="hidden" name="cmd" value="_s-xclick">
											<input type="hidden" name="hosted_button_id" value="5X7NHBPF2H9SC">
											<input type="image" src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal, la forma rápida y segura de pagar en Internet.">
											<img alt="" border="0" src="https://www.paypalobjects.com/es_XC/i/scr/pixel.gif" width="1" height="1">
										</form>
										</div>
		
								</div>
								</div>`;
					$('#product').prepend(html);
				}
				$.ajax({
					url: ruta,
					success: imgFunction
				});

			});

		}

		$.ajax({
			url: proxy + urlSearch + n.name,
			success: getdata
		});
	}
}
