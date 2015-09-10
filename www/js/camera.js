$("document").ready(function() {
    if(!localStorage.email) {
            $("#loadcontent").load("login.html");
        }
    function uploadimage(imageURI) {
            var serverURL = sv + "index.php";
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = imageURI.substr(imageURI.lastIndexOf['/']+1);
            options.mimeType = "image/jpeg";
            var ft = new FileTransfer();
            ft.upload(imageURI, serverURL, onUploadSuccess, onUploadError, options);
        }
        function onUploadSuccess() {
           navigator.notification.alert('Đăng bài thành công');
           $("#name").val("");
           $("#mota").val("");
           $('#mask').remove();
           $("#loadcontent").load('camera.html');
            
        }
        function onUploadError() {
            navigator.notification.alert('Xảy ra lỗi');
        }

        function onCamSuccess(imageURI) {
            document.getElementById("camImg").src = imageURI;
            document.getElementById("status").innerHTML = "Ảnh đã chọn";
            navigator.notification.beep(1);
            navigator.notification.vibrate(2000);
            $("#form").css("display","block");
            $("#submit").on("click",function (e) {
            e.preventDefault();
            n = $("#name").val();
            mt = $("#mota").val();
            if (n=='' || mt=='') {navigator.notification.alert('Vui lòng nhập tiêu đề và mô tả vào!')}
            else {
                $('body').append('<div id="mask"></div>');
                url = imageURI.replace(/^.*[\\\/]/, '');
                 var form_viet = {submit: 'ok', name:$("#name").val(),mota:$("#mota").val(),url:url,nup: localStorage.email};
            $.ajax({
                type: "POST",               
                url: sv + "index.php",       
                data: form_viet,            
                success: function(result) { 
                        uploadimage(imageURI);
                }
            });
            
            }
            });
        }
        function onCamError(message) {
                document.getElementById("status").innerHTML = "Camera error: " + message;
            }
        $("#newPicLink").on("click", function (e) {
                navigator.camera.getPicture(onCamSuccess, onCamError, { quality: 100, correctOrientation: true, destinationType: Camera.DestinationType.FILE_URI, targetWidth: 200, targetHeight: 200 });
                e.preventDefault();
            });
        $("#existingPicLink").on("click", function (e) {
                navigator.camera.getPicture(onCamSuccess, onCamError, { sourceType: Camera.PictureSourceType.PHOTOLIBRARY, destinationType: Camera.DestinationType.FILE_URI, quality: 50, targetWidth: 200, targetHeight: 200 });
                e.preventDefault();
            });
})
