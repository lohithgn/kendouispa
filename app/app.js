//variables
window.categoriesPath = '/api/Categories';
window.productsPath = '/api/Products';
window.suppliersPath = '/api/Suppliers';

//data sources

//category data source
var categoryDataSource = new kendo.data.DataSource({
    schema: { model: {id:"CategoryID"} },
    transport: {
        read: { url: window.categoriesPath, dataType: "json" }
    }
});

//products data source
var productsDataSource = new kendo.data.DataSource({
    schema: { model: {id:"ProductID"} },
    transport: { read: { url: window.productsPath, dataType: "json" } },
    pageSize: 15
});

//supplier data source
var supplierDataSource = new kendo.data.DataSource({
    schema: { model: { id: "SupplierID" } },
    transport: { read: { url: window.suppliersPath, dataType: "json" } },
    pageSize: 5
});

//Model

//index model
var indexModel = kendo.observable({
    onSelect: function (e) {
        var menuItem = $(e.item).children(".k-link").text().toLowerCase();        
        northwindRouter.navigate("/" + menuItem);
    }
});

//categories model
var categoriesModel = kendo.observable({
    items: categoryDataSource,
    selectable:"multiple"
});

//products model
var ProductsModel = kendo.observable({
    items: productsDataSource,
    selectable: "multiple"
});

//prod detail model
var prodDetailModel = kendo.observable({
 
    setCurrent: function (itemID) {
        this.set("current", productsDataSource.get(itemID))
    },
    categoryName: function () {
        return categoryDataSource.get(this.get("current").CategoryID).CategoryName;
    },
    discontinued: function () {
        if (this.get("current").Discontinued)
            return "Yes"
        else
            return "No"
    }
 
});

//supplier model
var suppliersModel = kendo.observable({
    items: supplierDataSource,
});

//Views

//layout View
var layoutView = new kendo.Layout("layout-template");

//index view
var indexView = new kendo.View("index-template", { model: indexModel });

//categories view
var categoriesView = new kendo.View("categories-template", { model: categoriesModel });

//products view
var productsView = new kendo.View("products-template", { model: ProductsModel })

//product detail view
var productDetailView = new kendo.View("prod-detail-template", { model: prodDetailModel });

//supplier view
var suppliersView = new kendo.View("supplier-template", {model: suppliersModel})

//Router
//northwind router
var northwindRouter = new kendo.Router({
    init: function () {
        layoutView.render("#application");
    }
});

// Routing

//root route
northwindRouter.route("/", function () {
    layoutView.showIn("#pre-content", indexView);
});

//categories route
northwindRouter.route("/categories", function () {
    alert("test")
    layoutView.showIn("#pre-content", indexView);
    layoutView.showIn("#content", categoriesView);
});

//products route
northwindRouter.route("/products", function () {
    layoutView.showIn("#pre-content", indexView);
    layoutView.showIn("#content", productsView);
});

//product details route
northwindRouter.route("/proddetails/:ProductID", function (ProductID) {
    layoutView.showIn("#pre-content", indexView);
 
    productsDataSource.fetch(function (e) {
        prodDetailModel.setCurrent(ProductID);
        layoutView.showIn("#content", productDetailView);
    });
});

//suppliers route
northwindRouter.route("/suppliers", function () {
    layoutView.showIn("#pre-content", indexView);
    layoutView.showIn("#content", suppliersView);
}); 

//on load
$(function () {
    northwindRouter.start();
    northwindRouter.navigate("/categories");
});