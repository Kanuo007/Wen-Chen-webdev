/**
 * Created by wenchen on 11/1/16.
 */
module.exports = function(app, model) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});
    var widgets = [
        {"_id": "123", widgetType: "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", widgetType: "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", widgetType: "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {"_id": "456", widgetType: "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", widgetType: "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", widgetType: "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", widgetType: "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post('/api/page/:pid/widget', createWidget);
    app.get('/api/page/:pid/widget', findWidgetsByPageId);
    app.get('/api/widget/:wgid', findWidgetById);
    app.put('/api/widget/:wgid', updateWidget);
    app.delete('/api/widget/:wgid', deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.put('/api/page/:pid/widget', sortWidget);

    function createWidget(req, res) {
        console.log("Widget.Sevice.server, widget is " + req.body);
        var widget = req.body;
        model
            .widgetModel
            .createWidget(widget)
            .then(
                function(widget){

                    res.json(widget);
                },
                function(error){
                    console.log("aaaaa")
                    res.sendStatus(400).send(error);
                }

            )
    }

    function findWidgetsByPageId(req, res) {
        var pid = req.params.pid;
        model
            .widgetModel
            .findWidgetsByPageId(pid)
            .then(
                function(widgets){
                    if(widgets){
                        res.json(widgets);
                    } else {
                        res.json([]);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function findWidgetById(req, res) {
        var wgid = req.params.wgid;
        model
            .widgetModel
            .findWidgetById(wgid)
            .then(
                function(widget){
                    if(widget){
                        res.json(widget);
                    } else {
                        res.send('0')
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var wgid = req.params.wgid;
        model
            .widgetModel
            .updateWidget(wgid, widget)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            )
    }


    function deleteWidget(req, res) {
        var wgid = req.params.wgid;
        model
            .widgetModel
            .deleteWidget(wgid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            )
    }



    function sortWidget(req, res) {
        var pageId = req.params.pid;
        var start = req.query.start;
        var end = req.query.end;
        // model
        //     .widgetModel
        //     .sortWidget(pageId, start, end)
        //     .then(
        //         function (status) {
                    res.sendStatus(200);
            //     },
            //     function(error){
            //         res.sendStatus(400).send(error);
            //     }
            // )
    }



    function uploadImage(req, res) {
        var wgid = req.body.wgid;
        var uid = req.body.uid;
        var wid = req.body.wid;
        var pid = req.body.pid;
        var myFile = req.file;


        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in uploads folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;

        var newUrl = '/assignment/uploads/'+filename;
        var updateOne = {"name": filename, "widgetType": "IMAGE", "text": req.body.text, "url": newUrl, "width": req.body.width, "pageId" : pid};
        model
            .widgetModel
            .updateWidget(wgid, updateOne)
            .then(
                function(status){
                    console.log(newUrl);
                    var url = '/assignment/homePageBeforeLogin.view.client.html#/user/' + uid + '/website/' + wid + '/page/' + pid + '/widget/';
                    res.redirect(url);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            )

    }

};