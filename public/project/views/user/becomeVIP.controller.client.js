/**
 * Created by wenchen on 12/14/16.
 */

(function() {
    angular
        .module("MusesApp")
        .controller("VIPController", VIPController);

    function VIPController($routeParams, $location, UserService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.score = 0; //set score to 0
        vm.refresh = refresh;
        vm.logout = logout;


        //Initializer
        function init() {
            var promise = UserService.findUserById(vm.uid);
            promise
                .success(function (user) {
                    if (user != '0') {
                        vm.user = user;
                    }else{
                        console.log("no user found");
                    }
                })
                .error(function () {

                });
            // set correct answers
            sessionStorage.setItem('a1', 'b');
            sessionStorage.setItem('a2', 'b');
            sessionStorage.setItem('a3', 'b');
            sessionStorage.setItem('a4', 'b');
            sessionStorage.setItem('a5', 'b');
            sessionStorage.setItem('a6', 'b');
            sessionStorage.setItem('a7', 'b');
            sessionStorage.setItem('a8', 'b');
            sessionStorage.setItem('a9', 'b');
            sessionStorage.setItem('a10', 'b');
        }
        init();
            $(document).ready(function () {
                //Hide all questions
                $('.quizForm').hide();

                //Show first question
                $('#q1').show();

                $('.quizForm #submit').click(function () {
                    //get data attributes
                    current = $(this).parents('form:first').data('question');
                    next = $(this).parents('form:first').data('question') + 1;
                    //hide a question
                    $('.quizForm').hide();
                    //show next one
                    $('#q' + next).fadeIn(300);
                    process('' + current + '');
                    return false;
                })
            });

            //process the answer
            function process(n) {
                var submitted = $('input[name=q' + n + ']:checked').val();
                if (submitted == sessionStorage.getItem('a' + n + '')) {
                    vm.score++;
                }
                if (n == 10) {
                    if (vm.score >= 6) {
                        vm.user.VIP = true;
                        var promise = UserService.updateUser(vm.user);
                        promise
                            .success(function(){
                            $('#result').html('<h3>Your final score is ' + vm.score + ' out of 10</h3>' +
                                '<h3> Congratulation! You are VIP now!</h3>');
                        })
                            .error(function(){
                                console.log("update fail");
                            })
                    } else {
                        $('#result').html('<h3>Your final score is ' + vm.score + ' out of 10</h3> ' +
                            '<h3>Try agian!</h3>');
                    }
                }
                return false;
            }


        function refresh(){
            location.reload();
        }

        function logout() {
            var promise = UserService.logout();
            promise
                .success(function(){
                    $location.url("#/login");
                });
        }
    }
})();
