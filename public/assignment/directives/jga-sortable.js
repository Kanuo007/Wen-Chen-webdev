/**
 * Created by wenchen on 11/5/16.
 */
(function(){
    angular
        .module("jgaDirectives",[])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable() {
        console.log("hello from sortable");

        // function linker(scope, element, attributes){
        //     var start = -1;
        //     var end = -1;
        //     element
        //         .sortable({
        //             start: function(event, ui){
        //                 start = $(ui.item).index();
        //             },
        //             stop: function(event, ui) {
        //                 end = $(ui.item).index();
        //                 scope.sortableController.sort(start,end);
        //             }
        //         });
        // }
        //
        // return {
        //     scope:{
        //         pid : "@"
        //     },
        //     restrict: 'C',
        //     link: linker,
        //     controller: sortableController,
        //     controllerAs: 'sortableController'
        // }
    }

    // function sortableController(WidgetService, start, end){
    //     var vm = this;
    //     vm.sort = sort;
    //     function sort(start, end){
    //         WidgetService.sortWidget(vm.pid, start, end)
    //     }
    // }



})();