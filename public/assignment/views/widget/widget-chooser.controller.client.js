/**
 * Created by wenchen on 10/9/16.
 */
(fucntion(){
    angular
        .module("WebAppMaker")
        .controller()



    {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"
    },
    {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E"
    },
    {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}


    switch(vm.widgetType) {
        case HEADER:
            vm.widget =  {"_id": "", "widgetType": "HEADER", "pageId": "", "size": 0, "text": ""};
            break;
        case IMAGE:
            vm.widget ={
                "_id": "", "widgetType": "IMAGE", "pageId": "", "width": "",
                "url": ""
            };
            break;
        case YOUTUBE:
            vm.widget = {_id: "", name: "", websiteId: ""};
            break;

    }


})();