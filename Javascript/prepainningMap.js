// noinspection LanguageDetectionInspection

let index = -1;
require(["esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer"
], function (esriConfig, Map, MapView, Graphic, GraphicsLayer) {

    esriConfig.apiKey = "AAPK56e3ac027f044c4089d8ceec232fc05dYaOuzVRzm8tMRqvzOvDvIEevbqJ85yppn9PacU6cy4duurJrVK9wo_8BcWO8i8bi";

    const map = new Map({
        basemap: "osm-standard" // Basemap layer service
    });


    const view = new MapView({
        map: map,
        center: [113.56210399999998, 22.285411], // Longitude, latitude
        zoom: 8, // Zoom level
        container: "viewDiv" // Div element
    });
    //添加图层
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);


    //设置点标记样式
    const simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],  // Orange
        outline: {
            color: 'blue', // White
            width: 4
        }
    };


    document.getElementById('next').addEventListener('click', function () {

        index++;
        if (index < data.length) {
            let lonlat = loadData(data[index])
            //创建点
            const point = { //Create a point
                type: "point",
                longitude: lonlat[0],
                latitude: lonlat[1]
            };

            const pointGraphic = new Graphic({
                geometry: point,
                symbol: simpleMarkerSymbol
            });
            graphicsLayer.add(pointGraphic);
            view.goTo({
                center: lonlat,
                duration: 1000 //视角跳转时长为秒
            });
        } else {
            alert('over')
            index = data.length - 1
        }


    });
    document.getElementById('previous').addEventListener('click', function () {
        index--;
        if (index < 0) {
            index = 0
            return;
        }
        view.goTo({
            center: loadData(data[index]),
            duration: 1000 //视角跳转时长为秒
        });
    });


});


//构造函数
function Event(location, year, title, url, describe) {
    this.location = location;
    this.year = year;
    this.title = title;
    this.image = url;
    this.describe = describe;
}

//
// //创建对象并保存
// let one = new Event([114.163825, 22.276284], 1983, '香港富商胡应湘提出兴建连接香港与珠海的伶仃洋大桥', '../images/hyx.jpg', '胡应湘，香港合和实业有限公司主席，香港工程科学院院士。原籍广州花都，1935年生于中国香港，现为全国政协委员、香港事务顾问、广东省中华文化促进会名誉会长、广州市教育基金会名誉会长。\n' +
//     '\n' + '<p>他为了港珠澳大桥的修建，奔走坚持了40年，有人曾问过他这样坚持的原因，他只是回答：自己是香港市民，要为内地和香港经济的融合贡献自己的力量，作为房地产开发商，要为中国建设的发展作贡献，这也是他心怀家国的体现。</p>')
// // localStorage.setItem('event', JSON.stringify(one));
// let two = new Event([113.577936, 22.271527], 1989, '珠海市人民政府首次公布伶仃洋大桥计划', '../images/zhs.jpg', '胡应湘，香港合和实业有限公司主席，香港工程科学院院士。原籍广州花都，1935年生于中国香港，现为全国政协委员、香港事务顾问、广东省中华文化促进会名誉会长、广州市教育基金会名誉会长。\n' +
//     '\n' + '<p>他为了港珠澳大桥的修建，奔走坚持了40年，有人曾问过他这样坚持的原因，他只是回答：自己是香港市民，要为内地和香港经济的融合贡献自己的力量，作为房地产开发商，要为中国建设的发展作贡献，这也是他心怀家国的体现。</p>')
// let three = new Event([116.40263400000003, 39.901443], 1998, '中国国务院正式批准伶仃洋跨海大桥工程项目', '../images/gwy.jpg', '港珠澳大桥（Hong Kong-Zhuhai-Macao Bridge）是中国境内一座连接中国香港、广东珠海和中国澳门的桥隧工程，位于中国广东省珠江口伶仃洋区域内，因其超大的建筑规模、空前的施工难度以及顶尖的建造技术而闻名世界。港珠澳大桥全长55千米，其中主桥29.6千米、中国香港口岸至珠澳口岸41.6千米；桥面为双向六车道高速公路，设计速度100千米/小时。')
// let four = new Event([10, 10], 2003, '伶仃洋大桥项目被港珠澳大桥项目取代', '')
let data;
const info = document.getElementById('info')

function loadData(event) {
    info.querySelector('#year').innerText = event.year + '年';
    info.querySelector('#image').src = event.image;
    info.querySelector('#title').innerText = event.title;
    info.querySelector('#describe').innerHTML = event.describe;
    return event.location;
}

const xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.open('get', '../Javascript/gson.json');
xmlHttpRequest.send();
xmlHttpRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        data = JSON.parse(this.responseText)
    }
}