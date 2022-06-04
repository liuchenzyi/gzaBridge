require(["esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/GeoJSONLayer",
    "esri/Graphic",
    "esri/layers/GraphicsLayer"
], function (esriConfig, Map, MapView, GeoJSONLayer, Graphic, GraphicsLayer) {

    esriConfig.apiKey = "AAPK56e3ac027f044c4089d8ceec232fc05dYaOuzVRzm8tMRqvzOvDvIEevbqJ85yppn9PacU6cy4duurJrVK9wo_8BcWO8i8bi";

    const map = new Map({
        basemap: "osm-standard" // Basemap layer service
    });


    const view = new MapView({
        map: map,
        center: [113.56210399999998, 22.285411], // Longitude, latitude
        zoom: 6, // Zoom level
        container: "viewDiv" // Div element
    });
    const geojsonlayer = new GeoJSONLayer({
        url: "../Javascript/dwq.json",
        copyright: "USGS Earthquakes"
    });
    map.add(geojsonlayer);  // adds the layer to the map
    //分级渲染
    function classify() {

        // 第二步，指定渲染器
        const renderer = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                outline: {
                    // makes the outlines of all features consistently light gray
                    color: "lightgray",
                    width: 0.5
                }
            },
            visualVariables: [
                {
                    type: "color", // indicates this is a color visual variable
                    field: "population", // total population in poverty
                    stops: [
                        {
                            value: 50, // features where < 10% of the pop in poverty

                            color: "#10305e，0.5", // will be assigned this color (beige)
                            label: "五十万" // label to display in the legend
                        },
                        {
                            value: 1800, // features where > 30% of the pop in poverty
                            color: "#660016", // will be assigned this color (purple)
                            label: "一千八百万" // label to display in the legend
                        }
                    ]
                }
            ]
        };
        geojsonlayer.renderer = renderer;
    }
    classify();

});



