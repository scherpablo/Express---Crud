const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		const allProducts = products;

		res.render('products', {productos: allProducts});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const productoBuscado = products.find(producto => producto.id == req.params.id);//Utilizo find porque voy a buscar un solo elemento, filter si tendria que buscar varios
		const precioFinal = productoBuscado.price - (productoBuscado.price * (productoBuscado.discount / 100));		
		
		res.render('detail', {producto: productoBuscado, precio_final : precioFinal});
		
	},

	// Create - Form to create
	create: (req, res) => {		

		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		console.log('*******', req.files[0]);
		const nuevoProducto = {
			"id": products[products.length - 1].id + 1,//dentro de prodcuts voy a la última posicón del array y a la propiedad id le sumo 1, para almacenar un nuevo producto
			"name": req.body.name,
			"price": Number(req.body.price),
			"discount": Number(req.body.discount),
			"category": req.body.category,
			"description": req.body.description,			
			"image": req.files[0].filename
		}
				
		products.push(nuevoProducto);

		fs.writeFileSync(productsFilePath,JSON.stringify(products, null , ' '));

		// res.render('products', {productos: products});
		res.redirect('/');
	},

	// Update - Form to edit
	edit: (req, res) => {
		const idProduct = req.params.id;
		const productoAEditar = products.find(producto => producto.id == idProduct);

		// console.log(idProduct);

		res.render('product-edit-form', {editar: productoAEditar});
	},
	// Update - Method to update
	update: (req, res) => {	
		const indiceProductoAEditar = products.findIndex(producto => producto.id == req.params.id);

		if (indiceProductoAEditar != -1) {
			products[indiceProductoAEditar].name = req.body.name;
			products[indiceProductoAEditar].price = Number(req.body.price);
			products[indiceProductoAEditar].discount = Number(req.body.discount);
			products[indiceProductoAEditar].category = req.body.category;
			products[indiceProductoAEditar].description = req.body.description;
		}
		console.log(products[indiceProductoAEditar]);

		fs.writeFileSync(productsFilePath,JSON.stringify(products, null , ' '));

		res.redirect('/');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let idAEliminar =  req.params.id;
		let productosFiltrados = products.filter(product => product.id != idAEliminar);
		fs.writeFileSync(productsFilePath,JSON.stringify(productosFiltrados, null , ' '));

		res.redirect('/');
	}
	
};

module.exports = controller;