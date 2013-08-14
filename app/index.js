//variables
window.categoriesPath = 'http://services.odata.org/Northwind/Northwind.svc/Categories';
window.productsPath = 'http://services.odata.org/Northwind/Northwind.svc/Products';
window.suppliersPath = "http://services.odata.org/Northwind/Northwind.svc/Suppliers";

//data sources
var categoryDataSource = new kendo.data.DataSource({
    schema: { model: {id:"CategoryID"} },
    transport: {
        read: { url: window.categoriesPath, dataType: "json" }
    },
    schema: {
        data: "value" 
    }
});

var productsDataSource = new kendo.data.DataSource({
    schema: { model: {id:"ProductID"} },
    transport: {
        read: { url: window.productsPath, dataType: "json" }
    },
    pageSize: 15,
    schema: {
        data: "value"
    }
});

var supplierDataSource = new kendo.data.DataSource({
    schema: { model: { id: "SupplierID" } },
    transport: { read: { url: window.suppliersPath, dataType: "json" } },
    pageSize: 5,
    schema: {
        data: "value"
    }
});

//data models
var indexModel = kendo.observable({
    onSelect: function (e) {
        var menuItem = $(e.item).children(".k-link").text().toLowerCase();        
        northwindRouter.navigate("/" + menuItem);
    }
});

var categoriesModel = kendo.observable({
    items: categoryDataSource,
    selectable:"multiple"
});

var ProductsModel = kendo.observable({
    items: productsDataSource,
    selectable: "multiple"
});

var suppliersModel = kendo.observable({
    items: supplierDataSource,
});

//views
var layoutView = new kendo.Layout("layout-template");

var index = new kendo.View("index-template", { model: indexModel });

var categoriesView = new kendo.View("categories-template", { model: categoriesModel });

var productsView = new kendo.View("products-template", { model: ProductsModel })

var suppliersView = new kendo.View("supplier-template", {model: suppliersModel})

//routes
var northwindRouter = new kendo.Router({
    init: function () {
        layoutView.render("#application");
    }
});

northwindRouter.route("/", function () {
    layoutView.showIn("#pre-content", index);
});

northwindRouter.route("/categories", function () {
    layoutView.showIn("#pre-content", index);
    layoutView.showIn("#content", categoriesView);
});

northwindRouter.route("/products", function () {
    layoutView.showIn("#pre-content", index);
    layoutView.showIn("#content", productsView);
});

northwindRouter.route("/suppliers", function () {
    layoutView.showIn("#pre-content", index);
    layoutView.showIn("#content", suppliersView);
}); 

//on load
$(function () {
    northwindRouter.start();
    northwindRouter.navigate("/categories");
});
