/**
 * Created by wenchen on 10/9/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);


    function PageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456"},
            {"_id": "432", "name": "Post 2", "websiteId": "456"},
            {"_id": "543", "name": "Post 3", "websiteId": "456"}
            ];

        var api = {
            createPage : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage
        };

        return api;

        function createPage(websiteId, page) {
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            var result = [];
            for (var w in pages) {
                if (pages[w].websiteId === websiteId) {
                    result.push(pages[w])
                }
            }
            return result;
        }


        function findPageById(pageId) {
            for (var w in pages) {
                if (pages[w]._id === pageId) {
                    return pages[w];
                }
            }
            return null;

        }


        function updatePage(pageId, page) {

        }

        function deletePage(pageId) {
            for (var w in pages) {
                if (pages[w]._id === pageId){
                    pages.splice(w, 1);
                }
            }
        }
    }

})();