const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	//metodo index del mainController
	index: (req, res) => {
		const productosVisitados = products.filter(producto => producto.category == 'visited');//filtro los productos visitados para luego enviar a la vista
		const productosEnOferta = products.filter(producto => producto.category == 'in-sale');

		res.render('index', {visitados : productosVisitados, ofertas : productosEnOferta});//se renderiza la vista index a travez del metodo render del parametro response (res)
		                                                                                   //index es la vista, el segundo parametro es un objeto{}donde envio los dos filtros a la vista.  
																						   
	},
	search: (req, res) => {
	// Do the magic

	},
};

module.exports = controller;
